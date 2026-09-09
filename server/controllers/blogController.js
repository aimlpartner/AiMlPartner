import {
  getAutomationConfig,
  saveAutomationConfig,
  getAutomationLogs,
  executeBlogRun,
  loadGeneratedPostsFromDisk,
  saveGeneratedPostToDisk,
  deleteGeneratedPostFromDisk,
  updateGeneratedPostOnDisk
} from '../services/blogScheduler.js';
import { CURATED_BLOG_IMAGES, selectCuratedCoverImage } from '../services/blogGenerator.js';
import { generateLandscapeBlogCoverImage } from '../services/imageGenerator.js';

/**
 * GET /api/blog/posts
 * Returns generated blog posts stored on server.
 */
export async function getGeneratedPostsHandler(_req, res) {
  try {
    const posts = loadGeneratedPostsFromDisk();
    return res.status(200).json(posts);
  } catch (err) {
    console.error('[BlogController] Error getting posts:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog posts' });
  }
}

/**
 * POST /api/blog/posts
 * Saves or updates a blog post on server disk.
 */
export async function saveBlogPostHandler(req, res) {
  try {
    const post = req.body;
    if (!post || !post.title) {
      return res.status(400).json({ error: 'Invalid blog post payload' });
    }
    saveGeneratedPostToDisk(post);
    return res.status(200).json({ success: true, post });
  } catch (err) {
    console.error('[BlogController] Error saving post:', err);
    return res.status(500).json({ error: 'Failed to save blog post' });
  }
}

/**
 * DELETE /api/blog/posts/:id
 * Deletes a blog post from server disk.
 */
export async function deleteBlogPostHandler(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Missing post ID' });
    }
    const success = deleteGeneratedPostFromDisk(id);
    return res.status(200).json({ success });
  } catch (err) {
    console.error('[BlogController] Error deleting post:', err);
    return res.status(500).json({ error: 'Failed to delete blog post' });
  }
}

/**
 * GET /api/blog/config
 * Retrieves the current automation and schedule configuration.
 */
export async function getBlogConfigHandler(_req, res) {
  try {
    const config = getAutomationConfig();
    return res.status(200).json(config);
  } catch (err) {
    console.error('[BlogController] Error getting config:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog configuration' });
  }
}

/**
 * POST /api/blog/config
 * Updates the automation and schedule configuration.
 */
export async function updateBlogConfigHandler(req, res) {
  try {
    const updates = req.body;
    if (!updates || typeof updates !== 'object') {
      return res.status(400).json({ error: 'Invalid configuration payload' });
    }

    const updated = saveAutomationConfig(updates);
    return res.status(200).json({
      success: true,
      config: updated
    });
  } catch (err) {
    console.error('[BlogController] Error updating config:', err);
    return res.status(500).json({ error: 'Failed to update blog configuration' });
  }
}

/**
 * GET /api/blog/logs
 * Returns history of automated and manual generation runs.
 */
export async function getBlogLogsHandler(_req, res) {
  try {
    const logs = getAutomationLogs();
    return res.status(200).json(logs);
  } catch (err) {
    console.error('[BlogController] Error getting logs:', err);
    return res.status(500).json({ error: 'Failed to retrieve blog automation logs' });
  }
}

/**
 * POST /api/blog/generate
 * Trigger generation immediately with optional override parameters.
 */
export async function generateBlogHandler(req, res) {
  try {
    const {
      niche,
      industry,
      tone,
      keywords,
      preferredTitle,
      status
    } = req.body || {};

    const result = await executeBlogRun({
      triggerType: 'manual',
      overrideParams: {
        niche,
        industry,
        tone,
        keywords,
        preferredTitle,
        status
      }
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error('[BlogController] Generate error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate blog post'
    });
  }
}

/**
 * POST /api/blog/generate-image
 * On-demand generation of a 16:9 widescreen landscape AI cover image.
 */
export async function generateBlogImageHandler(req, res) {
  try {
    const { title, niche, industry, slug, category } = req.body || {};
    const imageUrl = await generateLandscapeBlogCoverImage({
      title: title || 'Enterprise AI Systems Architecture',
      niche: niche || 'Private LLM Deployment',
      industry: industry || 'Enterprise SaaS',
      slug: slug || 'ai-landscape',
      category: category || 'Engineering',
      fallbackImage: selectCuratedCoverImage(category, industry)
    });

    return res.status(200).json({
      success: true,
      imageUrl
    });
  } catch (err) {
    console.error('[BlogController] Generate image error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to generate landscape cover image'
    });
  }
}

/**
 * GET /api/blog/curated-images
 * Returns the list of curated Saturn and AI tech visuals.
 */
export async function getCuratedImagesHandler(_req, res) {
  return res.status(200).json(CURATED_BLOG_IMAGES);
}
