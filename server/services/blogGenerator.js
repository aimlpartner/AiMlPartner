import { getGoogleGenAI, parseGeminiJson } from '../lib/gemini.js';
import { generateLandscapeBlogCoverImage } from './imageGenerator.js';

// Curated internal visual assets with Saturn & Enterprise AI theme
export const CURATED_BLOG_IMAGES = [
  {
    url: '/blog_saturn_bg.jpg',
    label: 'Saturn Ring Horizon (Atmospheric Space)',
    category: 'Engineering',
    industries: ['Enterprise SaaS', 'Cloud & DevOps']
  },
  {
    url: '/blueprint_sovereignty.jpg',
    label: 'Data Sovereignty & Private VPC Blueprint',
    category: 'Engineering',
    industries: ['FinTech', 'Legal & Compliance', 'Enterprise SaaS']
  },
  {
    url: '/engine_blueprint.jpg',
    label: 'Neural Engine Schematic Blueprint',
    category: 'Engineering',
    industries: ['Manufacturing & IoT', 'Autonomous Systems']
  },
  {
    url: '/operations_hero.jpg',
    label: 'Operations & Workflow Automation Array',
    category: 'Automation',
    industries: ['Logistics & Supply Chain', 'Cross-Industry']
  },
  {
    url: '/sales_ai_hero.jpg',
    label: 'Autonomous Sales AI & Revenue Engine',
    category: 'Strategy',
    industries: ['E-Commerce & Retail', 'Enterprise SaaS']
  },
  {
    url: '/customer_agents_hero.jpg',
    label: 'Agentic Customer Intelligence Matrix',
    category: 'Case Study',
    industries: ['Healthcare & Life Sciences', 'Financial Services']
  },
  {
    url: '/custom_engineering_hero.jpg',
    label: 'High-Performance Custom AI Engineering',
    category: 'Engineering',
    industries: ['DeepTech', 'Cross-Industry']
  },
  {
    url: '/saturn_case_titan.jpg',
    label: 'Titan Orbit (Strategic Monolith)',
    category: 'Strategy',
    industries: ['Enterprise SaaS', 'Financial Services']
  },
  {
    url: '/saturn_case_enceladus.jpg',
    label: 'Enceladus Cryo-Vents (Precision Intelligence)',
    category: 'Case Study',
    industries: ['Healthcare & Life Sciences', 'Logistics & Supply Chain']
  },
  {
    url: '/saturn_case_ring_array.jpg',
    label: 'Ring Particle Array (Massive Scale Analytics)',
    category: 'Engineering',
    industries: ['Big Data & FinTech', 'Manufacturing & IoT']
  },
  {
    url: '/saturn_analyzer_hero.jpg',
    label: 'Deep Enterprise Diagnostic & AI Readiness',
    category: 'Strategy',
    industries: ['Cross-Industry', 'Enterprise SaaS']
  },
  {
    url: '/saturn_automate_hero.jpg',
    label: 'Zero-Latency Workflow Orchestration',
    category: 'Automation',
    industries: ['Logistics & Supply Chain', 'Real Estate & PropTech']
  }
];

/**
 * Intelligently picks a relevant cover image based on category and industry.
 */
export function selectCuratedCoverImage(category = '', industry = '') {
  const normCat = category.toLowerCase();
  const normInd = industry.toLowerCase();

  // Try matching both industry and category
  const exactMatch = CURATED_BLOG_IMAGES.find(img =>
    img.industries.some(i => normInd.includes(i.toLowerCase()) || i.toLowerCase().includes(normInd)) &&
    (normCat.includes(img.category.toLowerCase()) || img.category.toLowerCase().includes(normCat))
  );
  if (exactMatch) return exactMatch.url;

  // Try matching industry
  const indMatch = CURATED_BLOG_IMAGES.find(img =>
    img.industries.some(i => normInd.includes(i.toLowerCase()) || i.toLowerCase().includes(normInd))
  );
  if (indMatch) return indMatch.url;

  // Try matching category
  const catMatch = CURATED_BLOG_IMAGES.find(img =>
    normCat.includes(img.category.toLowerCase()) || img.category.toLowerCase().includes(normCat)
  );
  if (catMatch) return catMatch.url;

  // Fallback to primary Saturn background
  return '/blog_saturn_bg.jpg';
}

/**
 * Generates an authoritative, highly optimized enterprise blog post.
 * 
 * @param {Object} options
 * @param {string} [options.niche] Target niche or topic
 * @param {string} [options.industry] Target industry (e.g. FinTech, Healthcare, Logistics)
 * @param {string} [options.tone] Tone of voice
 * @param {string[]} [options.keywords] Seed SEO keywords
 * @param {string} [options.targetAudience] Target audience description
 * @param {Object} [options.cta] Call-to-action directive
 * @param {string} [options.preferredTitle] Specific title override if user supplied one
 */
export async function generateBlogPost(options = {}) {
  const ai = getGoogleGenAI();
  if (!ai) {
    throw new Error('Gemini client not initialized. Please verify GEMINI_API_KEY is configured.');
  }

  const {
    niche = 'Private LLM Deployment & Enterprise AI Infrastructure',
    industry = 'Enterprise SaaS & Operations',
    tone = 'authoritative-technical',
    keywords = ['Private LLMs', 'Data Sovereignty', 'Enterprise AI Architecture', 'AI Workflow Automation'],
    targetAudience = 'Enterprise CTOs, VPs of Engineering, and Innovation Leaders',
    cta = {
      type: 'call',
      title: 'Deploy Private AI with AIMLPartner in 14 Days',
      description: 'Book a confidential 15-minute architecture discovery session with our founding engineering team.',
      buttonText: 'Schedule Architecture Call',
      buttonUrl: '/#book-call'
    },
    preferredTitle = ''
  } = options;

  const toneGuidelines = {
    'authoritative-technical': 'Deep technical depth, system architecture blueprints, code examples, infrastructure topology, zero fluff.',
    'strategic-executive': 'High-level business ROI, total cost of ownership (TCO), risk mitigation, strategic 14-day execution advantage.',
    'practical-guide': 'Step-by-step implementation guide, code snippets, configuration files, tactical troubleshooting.',
    'thought-leadership': 'Visionary critique of traditional consulting and fragmented SaaS, championing private data sovereignty and autonomous agent pods.'
  };

  const selectedToneGuide = toneGuidelines[tone] || toneGuidelines['authoritative-technical'];

  const prompt = `You are the Principal AI Architect and Chief Technical Writer at AIMLPartner (aimlpartner.com).
AIMLPartner is a elite US-based enterprise AI engineering firm (located in Bedminster, NJ) that deploys private LLMs on clients' own VPCs, creates autonomous multi-agent systems, and eliminates manual corporate drag in 14-day sprint pods. We replace slow 6-month consulting engagements with high-velocity engineering.

Your mission is to write an authoritative, exhaustive, masterclass blog post engineered to rank #1 on Google for high-intent B2B search terms and convert enterprise decision-makers into clients.

---
STRATEGIC PARAMETERS:
- Target Niche: ${niche}
- Target Industry: ${industry}
- Target Audience: ${targetAudience}
- Tone of Voice: ${tone} (${selectedToneGuide})
- Focus Keywords: ${keywords.join(', ')}
${preferredTitle ? `- Preferred Focus Topic/Title: "${preferredTitle}"` : ''}
- Company Brand: AIMLPartner (Private VPC AI, 14-Day Delivery Pods, Zero SaaS Lock-in, Full Data Sovereignty)
---

CONTENT QUALITY REQUIREMENTS:
1. Length: Comprehensive and in-depth (minimum 1,400 words, rich with actionable detail).
2. Structure:
   - Compelling H1 Title (high click-through rate, SEO-rich, executive appeal).
   - Executive Overview: Hook the reader, address the hidden costs/frustrations of generic SaaS & unmanaged AI, and outline the thesis.
   - The Architectural Problem: Why existing solutions or manual workflows break down at scale in ${industry}.
   - The Blueprint / Framework: Detailed system architecture breakdown (with ASCII diagrams or structured component blueprints).
   - Concrete Technical / Implementation Walkthrough: Include realistic configuration snippets, Python/Node orchestration patterns, or data pipelines where relevant.
   - Measurable ROI & Benchmarks: Quantify time reclaimed, latency improvements, risk reduction, or dollar savings.
   - Strategic Takeaways (Callout Box format with markdown blockquotes).
   - Seamless Conclusion & Call to Action transitioning into AIMLPartner's capability to deliver this in a 14-day private sprint.
3. SEO Optimization:
   - Incorporate the focus keywords naturally across H2 headings, opening paragraphs, and conclusion.
   - Meta title (under 60 characters) and meta description (145-155 characters) optimized for Google CTR.
   - Clean, URL-safe kebab-case slug.

Return a strictly valid JSON object conforming to this EXACT schema:
{
  "title": "Clear, compelling, SEO-rich blog title",
  "slug": "url-safe-kebab-case-slug-without-slashes",
  "excerpt": "Punchy 2-3 sentence executive summary that grabs attention in search snippets (max 220 chars)",
  "category": "One of: Engineering | Strategy | Case Study | Automation",
  "industry": "${industry}",
  "readTime": "Estimated read time (e.g. '7 min read')",
  "content": "Full Markdown article text here. Use ## for main sections, ### for subsections, \`\`\` for code blocks, > for key takeaways, and bullet lists for readability.",
  "seo": {
    "metaTitle": "SEO Page Title (50-60 characters) | AIMLPartner",
    "metaDescription": "Concise meta description with primary keywords (140-160 characters)",
    "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"]
  },
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}

IMPORTANT:
- Return strictly valid JSON conforming to the schema.
- Escape all double-quotes inside markdown strings as \" and do NOT use raw unescaped newlines inside JSON string literals.
- Ensure all braces and brackets are properly closed.`;

  const startTime = Date.now();
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      maxOutputTokens: 8192,
      responseSchema: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          slug: { type: 'STRING' },
          excerpt: { type: 'STRING' },
          category: { type: 'STRING' },
          industry: { type: 'STRING' },
          readTime: { type: 'STRING' },
          content: { type: 'STRING' },
          seo: {
            type: 'OBJECT',
            properties: {
              metaTitle: { type: 'STRING' },
              metaDescription: { type: 'STRING' },
              keywords: { type: 'ARRAY', items: { type: 'STRING' } }
            },
            required: ['metaTitle', 'metaDescription', 'keywords']
          },
          tags: { type: 'ARRAY', items: { type: 'STRING' } }
        },
        required: ['title', 'slug', 'excerpt', 'category', 'industry', 'readTime', 'content', 'seo', 'tags']
      },
      temperature: 0.7
    }
  });

  const parsed = parseGeminiJson(response.text);

  // Fallback sanity checks on generated fields
  const title = parsed.title || 'Architecting Enterprise AI Systems for Scalable Operations';
  const slug = (parsed.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')).toLowerCase();
  const category = parsed.category || 'Engineering';

  // Generate a dedicated 16:9 widescreen landscape AI cover image (with fallback to curated landscape images)
  let assignedCoverImage;
  try {
    assignedCoverImage = await generateLandscapeBlogCoverImage({
      title,
      niche,
      industry: parsed.industry || industry,
      slug,
      category,
      fallbackImage: selectCuratedCoverImage(category, parsed.industry || industry)
    });
  } catch (imgErr) {
    console.warn('[BlogGenerator] Landscape image generator notice:', imgErr.message || imgErr);
    assignedCoverImage = selectCuratedCoverImage(category, parsed.industry || industry);
  }

  const postPayload = {
    title,
    slug,
    excerpt: parsed.excerpt || `An in-depth architectural guide on ${niche} for modern ${industry} teams.`,
    category,
    industry: parsed.industry || industry,
    readTime: parsed.readTime || '6 min read',
    content: parsed.content || 'Content generation encountered an issue.',
    coverImage: assignedCoverImage,
    author: {
      name: 'AIMLPartner Research Lab',
      role: 'Enterprise AI & Distributed Systems',
      avatar: '/team_deepak.jpg'
    },
    tags: Array.isArray(parsed.tags) && parsed.tags.length > 0 ? parsed.tags : [category, industry, 'AI'],
    seo: {
      metaTitle: parsed.seo?.metaTitle || `${title} | AIMLPartner`,
      metaDescription: parsed.seo?.metaDescription || parsed.excerpt || `Read our latest engineering notes on ${title}.`,
      keywords: Array.isArray(parsed.seo?.keywords) ? parsed.seo.keywords : keywords
    },
    cta: {
      type: cta.type,
      title: cta.title,
      description: cta.description,
      buttonText: cta.buttonText,
      buttonUrl: cta.buttonUrl
    },
    featured: false,
    views: Math.floor(Math.random() * 40) + 12,
    systemGenerated: true,
    generationMetadata: {
      model: 'gemini-2.5-flash',
      durationMs: Date.now() - startTime,
      niche,
      industry,
      tone
    }
  };

  return postPayload;
}
