import { GoogleGenAI } from '@google/genai';
import { GEMINI_API_KEY } from '../config/env.js';

/**
 * Lazily creates a GoogleGenAI client using the configured API key.
 * Returns null if the key is missing (caller should handle gracefully).
 */
export function getGoogleGenAI() {
  if (!GEMINI_API_KEY) {
    console.error('[Gemini] GEMINI_API_KEY environment variable is missing.');
    return null;
  }
  return new GoogleGenAI({ apiKey: GEMINI_API_KEY });
}

/**
 * Sanitizes JSON strings by escaping raw unescaped newlines/tabs inside double-quoted string literals.
 */
function sanitizeJsonStrings(jsonStr) {
  let inString = false;
  let escaped = false;
  let result = '';

  for (let i = 0; i < jsonStr.length; i++) {
    const ch = jsonStr[i];
    if (ch === '"' && !escaped) {
      inString = !inString;
      result += ch;
    } else if (inString) {
      if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        // Drop carriage returns
      } else if (ch === '\t') {
        result += '\\t';
      } else {
        result += ch;
      }
    } else {
      result += ch;
    }
    escaped = (!escaped && ch === '\\');
  }
  return result;
}

/**
 * Attempts to repair truncated JSON strings that were cut off before closing.
 */
function repairTruncatedJson(truncatedStr) {
  let s = truncatedStr.trim();
  s = s.replace(/,\s*$/, '');

  let openBraces = 0;
  let openBrackets = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '"' && !escaped) {
      inString = !inString;
    } else if (!inString) {
      if (ch === '{') openBraces++;
      else if (ch === '}') openBraces--;
      else if (ch === '[') openBrackets++;
      else if (ch === ']') openBrackets--;
    }
    escaped = (!escaped && ch === '\\');
  }

  if (inString) s += '"';
  while (openBrackets > 0) {
    s += ']';
    openBrackets--;
  }
  while (openBraces > 0) {
    s += '}';
    openBraces--;
  }
  return s;
}

/**
 * Regex fallback extractor that retrieves individual blog fields when full JSON parsing is not possible.
 */
function extractBlogFieldsRegex(raw) {
  const result = {
    title: '',
    slug: '',
    excerpt: '',
    category: 'Engineering',
    industry: 'Enterprise SaaS',
    readTime: '6 min read',
    content: '',
    tags: ['Private AI', 'Enterprise'],
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: ['Enterprise AI', 'Private LLMs']
    }
  };

  const titleMatch = raw.match(/"title"\s*:\s*"([^"]+)"/i);
  if (titleMatch) result.title = titleMatch[1];

  const slugMatch = raw.match(/"slug"\s*:\s*"([^"]+)"/i);
  if (slugMatch) result.slug = slugMatch[1];

  const excerptMatch = raw.match(/"excerpt"\s*:\s*"([^"]+)"/i);
  if (excerptMatch) result.excerpt = excerptMatch[1];

  const categoryMatch = raw.match(/"category"\s*:\s*"([^"]+)"/i);
  if (categoryMatch) result.category = categoryMatch[1];

  const industryMatch = raw.match(/"industry"\s*:\s*"([^"]+)"/i);
  if (industryMatch) result.industry = industryMatch[1];

  const readTimeMatch = raw.match(/"readTime"\s*:\s*"([^"]+)"/i);
  if (readTimeMatch) result.readTime = readTimeMatch[1];

  // Extract content between "content": " and the next field or end
  const contentIdx = raw.indexOf('"content":');
  if (contentIdx !== -1) {
    const afterContent = raw.substring(contentIdx + 10).trim();
    if (afterContent.startsWith('"')) {
      const rest = afterContent.substring(1);
      const nextFieldMatch = rest.match(/"\s*,\s*"(?:seo|tags|readTime|category)"/i);
      if (nextFieldMatch) {
        result.content = rest.substring(0, nextFieldMatch.index).replace(/\\"/g, '"').replace(/\\n/g, '\n');
      } else {
        const lastQuote = rest.lastIndexOf('"');
        if (lastQuote !== -1) {
          result.content = rest.substring(0, lastQuote).replace(/\\"/g, '"').replace(/\\n/g, '\n');
        } else {
          result.content = rest.replace(/\\"/g, '"').replace(/\\n/g, '\n');
        }
      }
    }
  }

  // Extract tags array if possible
  const tagsMatch = raw.match(/"tags"\s*:\s*\[([\s\S]*?)\]/i);
  if (tagsMatch) {
    const parsedTags = tagsMatch[1]
      .split(',')
      .map(t => t.replace(/["\s]/g, ''))
      .filter(Boolean);
    if (parsedTags.length > 0) result.tags = parsedTags;
  }

  return result;
}

/**
 * Parses Gemini's raw text output into a JSON object with multi-layered error recovery.
 * Handles markdown code fences, unescaped newlines/tabs, trailing commas, truncated JSON,
 * and field-by-field regex extraction.
 */
export function parseGeminiJson(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Empty or invalid response received from Gemini');
  }

  let cleaned = rawText.trim();

  // 1. Direct JSON parse
  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  // 2. Strip code fences
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim();
  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  // 3. Extract outermost { ... }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const jsonSubstring = cleaned.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(jsonSubstring);
    } catch (_) {}

    // 4. Remove trailing commas: ,} or ,]
    const withoutTrailingCommas = jsonSubstring.replace(/,\s*([}\]])/g, '$1');
    try {
      return JSON.parse(withoutTrailingCommas);
    } catch (_) {}

    // 5. Fix unescaped control characters inside quotes
    try {
      const sanitized = sanitizeJsonStrings(withoutTrailingCommas);
      return JSON.parse(sanitized);
    } catch (_) {}
  }

  // 6. Truncated JSON repair (if output hit token limit before closing brace)
  if (firstBrace !== -1) {
    try {
      const repaired = repairTruncatedJson(cleaned.substring(firstBrace));
      if (repaired) return JSON.parse(repaired);
    } catch (_) {}

    try {
      const sanitized = sanitizeJsonStrings(cleaned.substring(firstBrace));
      const repaired = repairTruncatedJson(sanitized);
      if (repaired) return JSON.parse(repaired);
    } catch (_) {}
  }

  // 7. Regex field extractor fallback (never lose article content!)
  const fallback = extractBlogFieldsRegex(cleaned);
  if (fallback && (fallback.title || fallback.content)) {
    console.warn('[Gemini JSON Parse] Successfully recovered blog structure using regex fallback parser.');
    return fallback;
  }

  console.error('[Gemini JSON Parse] Failed to parse raw text (first 300 chars):', cleaned.substring(0, 300));
  throw new Error('Could not parse JSON from Gemini response');
}
