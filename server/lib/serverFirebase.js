import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..');

let dbInstance = null;

export function getServerFirestore() {
  if (dbInstance) return dbInstance;

  try {
    const configPath = path.join(rootDir, 'firebase-applet-config.json');
    if (!fs.existsSync(configPath)) {
      console.warn('[ServerFirebase] Warning: firebase-applet-config.json not found at', configPath);
      return null;
    }

    const raw = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(raw);

    const app = getApps().length === 0 ? initializeApp(config, 'server-app') : getApp('server-app');
    dbInstance = getFirestore(app, config.firestoreDatabaseId);
    return dbInstance;
  } catch (error) {
    console.error('[ServerFirebase] Error initializing server Firestore:', error);
    return null;
  }
}
