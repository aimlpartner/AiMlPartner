import { getGoogleGenAI, parseGeminiJson } from '../lib/gemini.js';

/**
 * POST /api/parse-job-description
 *
 * Uses Gemini to parse raw job descriptions into structured fields:
 * title, type, location, isRemote, duration, stipend, and skills.
 */
export async function parseJobDescriptionHandler(req, res) {
  const { description } = req.body;
  if (!description || typeof description !== 'string' || !description.trim()) {
    return res.status(400).json({ error: 'Job description text is required' });
  }

  const ai = getGoogleGenAI();
  if (!ai) {
    return res.status(500).json({ error: 'Gemini client not initialized' });
  }

  try {
    const prompt = `You are an expert HR and recruitment parser.
Analyze this job description text and extract structured job posting parameters:

---
JOB DESCRIPTION:
"""
${description}
"""
---

Return a strictly valid JSON object matching this exact schema:
{
  "title": "Clean, concise Job Title (e.g. Full Stack Developer Intern, Senior AI Engineer, PR & Social Media Intern, etc.)",
  "type": "Must be one of: Full-time, Internship, Contract, Contract-to-Hire, Part-time",
  "location": "Location string. If remote or unspecified, return 'Remote'. If city is mentioned, return city name",
  "isRemote": true or false,
  "duration": "Duration if mentioned (e.g. '3 Months', '6 Months'). If full-time permanent, return 'Full-time'",
  "stipend": "Stipend or salary ONLY if explicitly mentioned in the text (e.g. '₹3000', '$40/hr'). If NO compensation is explicitly mentioned, you MUST return empty string ''",
  "skills": "Comma-separated list of technical tools and skills found in the text (e.g. 'React, Node.js, MongoDB, JavaScript, Git')"
}

IMPORTANT CONSTRAINTS:
- Do NOT include markdown fences, backticks, or preamble. Return ONLY the raw JSON object.
- If stipend/pay is not explicitly written in the text, stipend MUST BE empty string "" (never guess or invent compensation).`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const parsed = parseGeminiJson(response.text);
    return res.status(200).json(parsed);
  } catch (error) {
    console.error('[Job Parser] Error:', error);
    return res.status(500).json({ error: error.message || 'Failed to parse job description' });
  }
}
