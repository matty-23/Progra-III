// services/cacheService.js
import localforage from 'localforage';

const DIRTY_KEY = 'dirtyDocs';

const docKey  = (id) => `doc:${id}`;

export const cacheService = {

  async loadById(id) {
    const raw = await localforage.getItem(docKey(id));
    if (!raw) return null;
    return normalize(raw);
  },

  async save(doc) {
    const docToSave = JSON.parse(JSON.stringify(doc)); // deep clone
    await localforage.setItem(docKey(doc.id), docToSave);
    // NO llama a syncService aquí — eso lo hace quien llama a save()
  },

  // dirtyDocs también persiste en IndexedDB
  async getDirtyIds() {
    return (await localforage.getItem(DIRTY_KEY)) ?? [];
  },

  async addDirtyId(id) {
    const current = await this.getDirtyIds();
    if (!current.includes(id)) {
      await localforage.setItem(DIRTY_KEY, [...current, id]);
    }
  },

  async removeDirtyId(id) {
    const current = await this.getDirtyIds();
    await localforage.setItem(DIRTY_KEY, current.filter(d => d !== id));
  },
};

// normalización interna — no la expone
function normalize(doc) {
  const normalizeBlocks = (blocks = []) =>
    blocks.map(b => ({
      ...b,
      type:     b.type     ?? 'paragraph',
      content:  b.content  ?? '',
      metadata: b.metadata ?? {},
      children: normalizeBlocks(b.children),
    }));
  return { ...doc, blocks: normalizeBlocks(doc.blocks) };
}