export interface ParsedJobFields {
  title?: string;
  type?: string;
  location?: string;
  isRemote?: boolean;
  duration?: string;
  stipend?: string;
  skills?: string;
}

/**
 * Fast client-side extractor that analyzes job description text instantly.
 * Extracts title, employment type, location, remote status, duration, skills,
 * and explicit compensation (leaving stipend empty if not mentioned).
 */
export function parseJobDescriptionLocally(text: string): ParsedJobFields {
  if (!text || !text.trim()) return {};

  const clean = text.trim();
  const lines = clean.split('\n').map((l) => l.trim()).filter(Boolean);
  const result: ParsedJobFields = {};

  // 1. EXTRACT TITLE
  // Look for explicit title prefixes
  const titlePrefixRegex = /^(?:job\s*title|position|role|title|hiring\s*(?:for)?|we\s*are\s*looking\s*for\s*(?:a|an)?)\s*[:\-–]\s*(.+)$/i;
  for (const line of lines.slice(0, 6)) {
    const match = line.match(titlePrefixRegex);
    if (match && match[1]) {
      result.title = match[1].replace(/[!.*#_]/g, '').trim();
      break;
    }
  }

  // If no prefix, check if first line looks like a title
  if (!result.title && lines.length > 0) {
    const firstLine = lines[0].replace(/^[#*\-–\s]+/, '').replace(/[#*!]+$/, '').trim();
    if (
      firstLine.length >= 3 &&
      firstLine.length <= 60 &&
      !firstLine.endsWith('.') &&
      !/^(about|overview|responsibilities|requirements|description|we are|summary|company)/i.test(firstLine)
    ) {
      result.title = firstLine;
    }
  }

  // Fallback regex search in the text
  if (!result.title) {
    const titleRegex = /\b((?:Senior|Lead|Junior|Associate|Staff|Principal)?\s*(?:Full\s*Stack|Frontend|Backend|Software|AI|ML|Machine\s*Learning|Data|DevOps|Cloud|Product|UI\/UX|Sales|Marketing|PR\s*&\s*Social\s*Media|PR|Social\s*Media|Content|Operations|QA|Vibe)?\s*(?:Developer|Engineer|Architect|Designer|Manager|Intern|Specialist|Lead|Coder|Executive|Analyst))\b/i;
    const match = clean.match(titleRegex);
    if (match && match[1]) {
      result.title = match[1].trim();
    }
  }

  // 2. EXTRACT EMPLOYMENT TYPE
  if (/\b(intern|internship|trainee|summer intern)\b/i.test(clean)) {
    result.type = 'Internship';
  } else if (/\b(contract-to-hire|c2h)\b/i.test(clean)) {
    result.type = 'Contract-to-Hire';
  } else if (/\b(contract|contractor|freelance|consultant)\b/i.test(clean)) {
    result.type = 'Contract';
  } else if (/\b(part-time|part time)\b/i.test(clean)) {
    result.type = 'Part-time';
  } else if (/\b(full-time|full time|permanent)\b/i.test(clean)) {
    result.type = 'Full-time';
  } else {
    result.type = 'Full-time';
  }

  // 3. EXTRACT LOCATION & REMOTE
  const isRemote = /\b(remote|work from home|wfh|anywhere|virtual)\b/i.test(clean);
  result.isRemote = isRemote;

  const knownCities = [
    'Bedminster', 'New York', 'NYC', 'San Francisco', 'SF', 'Seattle', 'Austin', 
    'Boston', 'Chicago', 'Los Angeles', 'London', 'Toronto', 'Bengaluru', 'Bangalore', 
    'Mumbai', 'Delhi', 'Hyderabad', 'Pune', 'Noida', 'Gurgaon', 'Gurugram'
  ];

  let foundCity: string | null = null;
  for (const city of knownCities) {
    const cityRegex = new RegExp(`\\b${city}\\b`, 'i');
    if (cityRegex.test(clean)) {
      foundCity = city;
      break;
    }
  }

  if (isRemote && foundCity) {
    result.location = `${foundCity} (Remote & On-site)`;
  } else if (isRemote) {
    result.location = 'Remote';
  } else if (foundCity) {
    result.location = foundCity;
  } else {
    result.location = 'Remote';
    result.isRemote = true;
  }

  // 4. EXTRACT DURATION
  const durationMatch = clean.match(/\b(\d+)\s*(months?|weeks?|years?)\b/i);
  if (durationMatch) {
    result.duration = `${durationMatch[1]} ${durationMatch[2].charAt(0).toUpperCase() + durationMatch[2].slice(1).toLowerCase()}`;
  } else if (/summer\s*\d{4}/i.test(clean)) {
    const m = clean.match(/summer\s*\d{4}/i);
    if (m) result.duration = m[0];
  } else if (result.type === 'Internship') {
    result.duration = '3 Months';
  } else {
    result.duration = 'Full-time';
  }

  // 5. EXTRACT STIPEND / COMPENSATION
  // STRICT USER RULE: Only if explicitly mentioned! Leave strictly empty otherwise!
  const stipendRegex = /(?:stipend|salary|compensation|pay|remuneration)\s*[:\-–]?\s*([₹$€£]\s*[\d,]+(?:\s*(?:k|lakhs?|lac|per month|\/mo|\/month|\/hr|\/hour|\/yr|\/year|\/annum|p\.a\.?))?)/i;
  const stipendMatch = clean.match(stipendRegex);

  if (stipendMatch && stipendMatch[1]) {
    result.stipend = stipendMatch[1].trim();
  } else {
    const currencyMatch = clean.match(/\b([₹$€£]\s*[\d,]+(?:\s*(?:k|per month|\/mo|\/month|\/hr|\/hour|\/yr|\/year))?)\b/i);
    if (currencyMatch && currencyMatch[1]) {
      result.stipend = currencyMatch[1].trim();
    } else {
      result.stipend = ''; // STRICTLY EMPTY!
    }
  }

  // 6. EXTRACT SKILLS / TECHNOLOGIES
  const techKeywords = [
    'React', 'Next.js', 'Vue', 'Angular', 'Svelte', 'Node.js', 'Express', 'TypeScript', 'JavaScript',
    'Python', 'FastAPI', 'Django', 'Flask', 'Java', 'Spring Boot', 'C++', 'C#', '.NET', 'Go', 'Golang',
    'Rust', 'PHP', 'Laravel', 'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Firebase',
    'GraphQL', 'REST APIs', 'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Git', 'GitHub',
    'TailwindCSS', 'Tailwind', 'Figma', 'HTML', 'CSS', 'Linux', 'TensorFlow', 'PyTorch',
    'OpenAI', 'LLM APIs', 'LangChain', 'Vercel', 'Netlify'
  ];

  const foundSkills: string[] = [];
  for (const tech of techKeywords) {
    const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(?:^|[^a-zA-Z0-9])${escaped}(?:$|[^a-zA-Z0-9])`, 'i');
    if (regex.test(clean)) {
      foundSkills.push(tech);
    }
  }

  if (foundSkills.length > 0) {
    result.skills = foundSkills.join(', ');
  }

  return result;
}

/**
 * Executes smart auto-fill: runs fast local analysis instantly, and asynchronously
 * queries Gemini /api/parse-job-description if available to refine.
 */
export async function smartAutoFillJobDescription(description: string): Promise<ParsedJobFields> {
  const localResult = parseJobDescriptionLocally(description);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const res = await fetch('/api/parse-job-description', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const aiData = await res.json();
      return {
        title: aiData.title || localResult.title,
        type: aiData.type || localResult.type,
        location: aiData.location || localResult.location,
        isRemote: typeof aiData.isRemote === 'boolean' ? aiData.isRemote : localResult.isRemote,
        duration: aiData.duration || localResult.duration,
        stipend: aiData.stipend !== undefined ? aiData.stipend : localResult.stipend,
        skills: aiData.skills || localResult.skills,
      };
    }
  } catch (err) {
    // Graceful fallback to instant local extraction
    console.debug('[smartAutoFill] Backend AI endpoint unavailable, using local parser:', err);
  }

  return localResult;
}
