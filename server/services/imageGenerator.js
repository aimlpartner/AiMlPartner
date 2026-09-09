import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getGoogleGenAI } from '../lib/gemini.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..');
const blogImagesDir = path.join(rootDir, 'public', 'blog-images');

// Ensure public/blog-images directory exists
if (!fs.existsSync(blogImagesDir)) {
  try {
    fs.mkdirSync(blogImagesDir, { recursive: true });
  } catch (err) {
    console.error('[ImageGenerator] Failed to create blog-images directory:', err);
  }
}

/**
 * Generates an authoritative, 16:9 widescreen landscape AI cover image
 * tailored to the blog title, niche, and industry.
 * 
 * Falls back gracefully to curated landscape assets if image generation
 * is unavailable or encounters rate limits.
 * 
 * @param {Object} params
 * @param {string} [params.title] Article title
 * @param {string} [params.niche] Target niche / architecture topic
 * @param {string} [params.industry] Target industry (FinTech, SaaS, Healthcare)
 * @param {string} [params.slug] URL-safe slug for image naming
 * @param {string} [params.category] Engineering | Strategy | Case Study | Automation
 * @param {string} [params.fallbackImage] Optional fallback image path
 * @returns {Promise<string>} Public URL of the generated or curated landscape image
 */
export async function generateLandscapeBlogCoverImage(params = {}) {
  const {
    title = 'Enterprise AI Systems Architecture',
    niche = 'Private LLM Deployment',
    industry = 'Enterprise SaaS',
    slug = 'ai-architecture',
    category = 'Engineering',
    fallbackImage = '/blog_saturn_bg.jpg'
  } = params;

  const ai = getGoogleGenAI();
  if (!ai) {
    console.warn('[ImageGenerator] Gemini AI client not available. Using curated landscape image.');
    return fallbackImage;
  }

  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 45) || 'blog-cover';
  const fileName = `${cleanSlug}-${Date.now()}.png`;
  const filePath = path.join(blogImagesDir, fileName);

  const prompt = `Cinematic, luxury enterprise AI architectural landscape banner in 16:9 wide aspect ratio. 
Focus topic: "${title}". 
Domain: ${niche} applied to ${industry}.
Visual aesthetics: Futuristic deep tech, glowing photonic neural nodes, obsidian glass data centers, metallic titanium conduits, and luminous Saturn planetary rings in cosmic darkness. Sleek, minimalist, 8k resolution, photorealistic, sharp focus, wide-angle cinematic shot.
Strict requirement: Absolutely no text, no typography, no letters, no logos, and no watermark.`;

  try {
    console.log(`[ImageGenerator] Generating 16:9 landscape AI cover image for "${title}"...`);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: prompt,
      config: {
        responseModalities: ['IMAGE'],
        imageConfig: {
          aspectRatio: '16:9'
        }
      }
    });

    const candidate = response.candidates?.[0];
    const imagePart = candidate?.content?.parts?.find(p => p.inlineData?.data);

    if (imagePart && imagePart.inlineData?.data) {
      const buffer = Buffer.from(imagePart.inlineData.data, 'base64');
      fs.writeFileSync(filePath, buffer);
      console.log(`[ImageGenerator] Successfully saved 16:9 landscape image to ${filePath} (${buffer.length} bytes)`);
      return `/blog-images/${fileName}`;
    }

    console.warn('[ImageGenerator] No image data returned in Gemini response. Falling back to curated image.');
    return fallbackImage;
  } catch (error) {
    console.warn('[ImageGenerator] AI image generation notice (falling back to curated landscape image):', error.message || error);
    return fallbackImage;
  }
}
