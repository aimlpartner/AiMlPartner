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
 * Parses Gemini's raw text output into a JSON object.
 * Handles markdown code fences and embedded JSON extraction.
 */
export function parseGeminiJson(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json\s*/i, '').replace(/```$/, '').trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        return JSON.parse(jsonMatch[0]);
      } catch (subError) {
        console.error('[Gemini JSON Parse] Regex fallback failed:', subError);
      }
    }
    throw new Error('Could not parse JSON from Gemini response');
  }
}
