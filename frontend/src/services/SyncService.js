// services/syncService.js
import { cacheService }        from './cacheService';
import { documentoApiService } from './documentoApiService';

const syncingDocs = new Set(); // solo en memoria — previene re-entrada
let   cycleRunning = false;

async function syncDoc(docId) {
  if (syncingDocs.has(docId)) return;
  syncingDocs.add(docId);

  try {
    const doc = await cacheService.loadById(docId);
    if (!doc) {
      await cacheService.removeDirtyId(docId);
      return;
    }

    await documentoApiService.update(doc);
    await cacheService.removeDirtyId(docId);

  } catch (err) {
    // 4xx = error permanente, no reintentes
    if (err.status >= 400 && err.status < 500) {
      console.error('Error permanente en sync, descartando:', docId, err);
      await cacheService.removeDirtyId(docId);
      return;
    }
    // 5xx o sin red → se reintenta en el próximo ciclo
    console.warn('Sync fallida, se reintentará:', docId, err);

  } finally {
    syncingDocs.delete(docId);
  }
}

async function runCycle() {
  if (cycleRunning) return;
  cycleRunning = true;

  try {
    const dirtyIds = await cacheService.getDirtyIds();
    for (const id of dirtyIds) {
      await syncDoc(id);
    }
  } finally {
    cycleRunning = false;
    setTimeout(runCycle, 30_000); // próximo ciclo SOLO cuando termina este
  }
}

export const syncService = {
  // Llama a esto en main.jsx una sola vez al arrancar la app
  async init() {
    // recupera dirty docs que sobrevivieron al cierre anterior
    await runCycle();
  },

  async markDirty(docId) {
    await cacheService.addDirtyId(docId);
  },

  async forceSync(docId) {
    await syncDoc(docId);
  },
};