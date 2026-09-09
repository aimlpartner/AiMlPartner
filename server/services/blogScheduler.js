import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { collection, addDoc, doc, setDoc, getDoc, getDocs, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { getServerFirestore } from '../lib/serverFirebase.js';
import { generateBlogPost } from './blogGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '..', 'data');
const configFilePath = path.join(dataDir, 'blogAutomationConfig.json');
const logsFilePath = path.join(dataDir, 'blogAutomationLogs.json');
const postsFilePath = path.join(dataDir, 'generatedPosts.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export function loadGeneratedPostsFromDisk() {
  try {
    if (fs.existsSync(postsFilePath)) {
      const raw = fs.readFileSync(postsFilePath, 'utf8');
      const list = JSON.parse(raw);
      return Array.isArray(list) 
        ? list.filter(p => p.id !== 'gen_test_01' && p.slug !== 'private-llms-zero-data-leakage-financial-services-vpc')
        : [];
    }
  } catch (err) {
    console.error('[BlogScheduler] Failed to load posts from disk:', err);
  }
  return [];
}

export function saveGeneratedPostToDisk(post) {
  try {
    const list = loadGeneratedPostsFromDisk();
    const existingIdx = list.findIndex(p => p.slug === post.slug || (post.id && p.id === post.id));
    if (existingIdx >= 0) {
      list[existingIdx] = { ...list[existingIdx], ...post, updatedAt: new Date().toISOString() };
    } else {
      list.unshift(post);
    }
    fs.writeFileSync(postsFilePath, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('[BlogScheduler] Failed to save post to disk:', err);
  }
}

export function deleteGeneratedPostFromDisk(idOrSlug) {
  try {
    const list = loadGeneratedPostsFromDisk();
    const filtered = list.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug);
    fs.writeFileSync(postsFilePath, JSON.stringify(filtered, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('[BlogScheduler] Failed to delete post from disk:', err);
    return false;
  }
}

export function updateGeneratedPostOnDisk(idOrSlug, updates = {}) {
  try {
    const list = loadGeneratedPostsFromDisk();
    const idx = list.findIndex(p => p.id === idOrSlug || p.slug === idOrSlug);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...updates, updatedAt: new Date().toISOString() };
      fs.writeFileSync(postsFilePath, JSON.stringify(list, null, 2), 'utf8');
      return list[idx];
    }
  } catch (err) {
    console.error('[BlogScheduler] Failed to update post on disk:', err);
  }
  return null;
}

export const DEFAULT_AUTOMATION_CONFIG = {
  enabled: false,
  intervalHours: 24,
  statusOnGenerate: 'published',
  selectedNiches: [
    'Private LLM Deployment & Enterprise VPC Infrastructure',
    'Autonomous Agentic Workflows & Multi-Agent Swarms',
    'Zero-Data-Leakage AI Governance & Compliance',
    'Automating Invoicing, Logistics & ERP Data Pipelines',
    'Customer Experience AI Agents with Sub-Second Latency'
  ],
  customNiches: [],
  selectedIndustries: [
    'Enterprise SaaS',
    'Financial Services & FinTech',
    'Healthcare & Life Sciences',
    'Logistics & Supply Chain',
    'Legal & Corporate Compliance'
  ],
  customIndustries: [],
  tone: 'authoritative-technical',
  primaryKeywords: [
    'Private LLMs',
    'Data Sovereignty AI',
    'Autonomous AI Agents',
    'Enterprise Workflow Automation',
    'VPC AI Deployment',
    'AI Readiness Audit'
  ],
  callToAction: {
    type: 'call',
    title: 'Deploy Private Enterprise AI with AIMLPartner in 14 Days',
    description: 'Skip the 6-month consulting bloat. Build and deploy private AI in 14-day execution sprints.',
    buttonText: 'Book Architecture Discovery Call',
    buttonUrl: '/#book-call'
  },
  lastRunAt: null,
  nextRunAt: null,
  totalGenerated: 0
};

// In-memory cache
let activeConfig = loadConfigFromDisk();
let isRunInProgress = false;
let schedulerTimer = null;

function loadConfigFromDisk() {
  try {
    if (fs.existsSync(configFilePath)) {
      const raw = fs.readFileSync(configFilePath, 'utf8');
      return { ...DEFAULT_AUTOMATION_CONFIG, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('[BlogScheduler] Failed to load config from disk:', err);
  }
  return { ...DEFAULT_AUTOMATION_CONFIG };
}

function saveConfigToDisk(config) {
  try {
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2), 'utf8');
  } catch (err) {
    console.error('[BlogScheduler] Failed to write config to disk:', err);
  }
}

function loadLogsFromDisk() {
  try {
    if (fs.existsSync(logsFilePath)) {
      const raw = fs.readFileSync(logsFilePath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[BlogScheduler] Failed to load logs from disk:', err);
  }
  return [];
}

function appendLogToDisk(logEntry) {
  try {
    const logs = loadLogsFromDisk();
    logs.unshift(logEntry);
    // Keep last 100 logs
    const trimmed = logs.slice(0, 100);
    fs.writeFileSync(logsFilePath, JSON.stringify(trimmed, null, 2), 'utf8');
  } catch (err) {
    console.error('[BlogScheduler] Failed to write log to disk:', err);
  }
}

export function getAutomationConfig() {
  return activeConfig;
}

export function saveAutomationConfig(updates = {}) {
  activeConfig = {
    ...activeConfig,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  // If enabled was just toggled on and no nextRunAt is set, schedule the first run
  if (activeConfig.enabled && !activeConfig.nextRunAt) {
    const nextDate = new Date(Date.now() + (activeConfig.intervalHours || 24) * 3600 * 1000);
    activeConfig.nextRunAt = nextDate.toISOString();
  }

  saveConfigToDisk(activeConfig);

  // Sync to Firestore asynchronously with timeout
  const db = getServerFirestore();
  if (db) {
    const syncPromise = setDoc(doc(db, 'blog_automation_config', 'default'), activeConfig, { merge: true });
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000));
    Promise.race([syncPromise, timeoutPromise]).catch(() => {});
  }

  return activeConfig;
}

export function getAutomationLogs() {
  return loadLogsFromDisk();
}

/**
 * Executes a single blog generation cycle (either triggered manually or by scheduler).
 */
export async function executeBlogRun(options = {}) {
  const {
    triggerType = 'scheduled',
    overrideParams = {}
  } = options;

  if (isRunInProgress) {
    throw new Error('A blog generation task is already in progress. Please wait for it to complete.');
  }

  isRunInProgress = true;
  const startTime = Date.now();
  console.log(`[BlogScheduler] Starting blog run (Trigger: ${triggerType})...`);

  // Choose niche and industry (rotate through selected lists or use overrides)
  const allNiches = [
    ...(activeConfig.selectedNiches || []),
    ...(activeConfig.customNiches || [])
  ];
  const allIndustries = [
    ...(activeConfig.selectedIndustries || []),
    ...(activeConfig.customIndustries || [])
  ];

  const niche = overrideParams.niche ||
    (allNiches.length > 0 ? allNiches[activeConfig.totalGenerated % allNiches.length] : 'Private LLM Deployment');
  const industry = overrideParams.industry ||
    (allIndustries.length > 0 ? allIndustries[activeConfig.totalGenerated % allIndustries.length] : 'Enterprise SaaS');
  const tone = overrideParams.tone || activeConfig.tone || 'authoritative-technical';
  const keywords = overrideParams.keywords || activeConfig.primaryKeywords || [];
  const statusOnGenerate = overrideParams.status || activeConfig.statusOnGenerate || 'published';

  const logRecord = {
    id: `log_${Date.now()}`,
    timestamp: new Date().toISOString(),
    status: 'in-progress',
    triggerType,
    niche,
    industry,
    systemGenerated: true
  };

  try {
    const postPayload = await generateBlogPost({
      niche,
      industry,
      tone,
      keywords,
      cta: activeConfig.callToAction,
      preferredTitle: overrideParams.preferredTitle || ''
    });

    postPayload.status = statusOnGenerate;
    postPayload.publishedAt = new Date().toISOString();

    let createdDocId = `blog_${Date.now()}`;

    // Write to Firestore if connected (with 6s timeout protection)
    const db = getServerFirestore();
    if (db) {
      try {
        const firestorePromise = addDoc(collection(db, 'blog_posts'), {
          ...postPayload,
          createdAt: serverTimestamp(),
          publishedAt: serverTimestamp()
        });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Firestore write timeout/pending auth')), 6000)
        );
        const docRef = await Promise.race([firestorePromise, timeoutPromise]);
        createdDocId = docRef.id;
        console.log(`[BlogScheduler] Post saved to Firestore with ID: ${createdDocId}`);
      } catch (fsErr) {
        console.warn(`[BlogScheduler] Firestore write notice (post saved locally):`, fsErr.message);
      }
    }

    // Always persist to local disk cache
    saveGeneratedPostToDisk({
      id: createdDocId,
      ...postPayload
    });

    const durationMs = Date.now() - startTime;

    // Update config counters and schedule next run
    const nextDate = new Date(Date.now() + (activeConfig.intervalHours || 24) * 3600 * 1000);
    activeConfig.lastRunAt = new Date().toISOString();
    activeConfig.nextRunAt = nextDate.toISOString();
    activeConfig.totalGenerated = (activeConfig.totalGenerated || 0) + 1;
    saveConfigToDisk(activeConfig);

    // Record success log
    logRecord.status = 'success';
    logRecord.postId = createdDocId;
    logRecord.postTitle = postPayload.title;
    logRecord.postSlug = postPayload.slug;
    logRecord.durationMs = durationMs;
    logRecord.details = `Generated ${postPayload.title} (${postPayload.readTime}) for ${industry}.`;
    appendLogToDisk(logRecord);

    console.log(`[BlogScheduler] Post "${postPayload.title}" generated successfully in ${durationMs}ms.`);

    return {
      success: true,
      post: {
        id: createdDocId,
        ...postPayload
      },
      log: logRecord
    };
  } catch (error) {
    console.error('[BlogScheduler] Blog generation failed:', error);
    logRecord.status = 'error';
    logRecord.durationMs = Date.now() - startTime;
    logRecord.error = error.message || 'Unknown error during generation';
    appendLogToDisk(logRecord);

    throw error;
  } finally {
    isRunInProgress = false;
  }
}

/**
 * Checks the scheduler timer and runs scheduled generation if due.
 */
function checkSchedule() {
  if (!activeConfig.enabled) {
    return;
  }

  if (isRunInProgress) {
    return;
  }

  const now = Date.now();

  // If nextRunAt is missing or overdue, run!
  if (!activeConfig.nextRunAt) {
    const nextDate = new Date(now + (activeConfig.intervalHours || 24) * 3600 * 1000);
    activeConfig.nextRunAt = nextDate.toISOString();
    saveConfigToDisk(activeConfig);
    return;
  }

  const nextRunTime = new Date(activeConfig.nextRunAt).getTime();
  if (now >= nextRunTime) {
    console.log('[BlogScheduler] Scheduled time reached! Triggering automated blog run...');
    executeBlogRun({ triggerType: 'scheduled' }).catch(err => {
      console.error('[BlogScheduler] Scheduled run encountered error:', err.message);
    });
  }
}

/**
 * Starts the background timer.
 */
export function startBlogScheduler() {
  if (schedulerTimer) {
    clearInterval(schedulerTimer);
  }

  console.log('[BlogScheduler] Autonomous blog scheduler initialized.');
  // Check every 60 seconds
  schedulerTimer = setInterval(checkSchedule, 60 * 1000);

  // Initial check
  setTimeout(checkSchedule, 5000);
}
