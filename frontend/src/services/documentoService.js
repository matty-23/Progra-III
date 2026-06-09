import { cacheService } from './cacheService';

const dirtyDocs = new Set();
const syncingDocs = new Set();

const SYNC_INTERVAL = 30000;

async function syncDocument(docId) {
  if (syncingDocs.has(docId)) {
    return;
  }

  syncingDocs.add(docId);

  try {
    const doc = await cacheService.loadById(docId);

    if (!doc) {
      dirtyDocs.delete(docId);
      return;
    }

    await fetch(`/api/documents/${docId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doc),
    });

    dirtyDocs.delete(docId);

    console.log('Documento sincronizado:', docId);

  } catch (err) {
    console.error('Error sincronizando:', docId, err);
  } finally {
    syncingDocs.delete(docId);
  }
}

setInterval(async () => {
  for (const docId of dirtyDocs) {
    await syncDocument(docId);
  }
}, SYNC_INTERVAL);

export const DocumentoService = {
  markDirty(docId) {
    dirtyDocs.add(docId);
  },

  async forceSync(docId) {
    await syncDocument(docId);
  },

  getDirtyDocs() {
    return [...dirtyDocs];
  }
};