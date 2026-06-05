import localforage from 'localforage';

const KEY = 'documents';

export const cacheService = {
  async getStore() {
    try {
      const store = await localforage.getItem(KEY);
      if (!store) {
        const initialStore = { documents: [] };
        await localforage.setItem(KEY, initialStore);
        return initialStore;
      }
      return store;
    } catch (e) {
      console.error("Error leyendo localforage, reseteando...", e);
      const initialStore = { documents: [] };
      await localforage.setItem(KEY, initialStore);
      return initialStore;
    }
  },
  
  async loadById(id) {
    const store = await this.getStore();
    const doc = store?.documents?.find(d => d.id === id);
    
    if (!doc) {
        return null;
    }
    
    // Normalización profunda
    const normalize = (blocks) =>
      blocks.map(b => ({
        ...b,
        id: b.id,
        type: b.type ?? 'paragraph',
        content: b.content ?? '',
        metadata: b.metadata ?? {},
        children: b.children ? normalize(b.children) : [],
      }));

    return { ...doc, blocks: normalize(doc.blocks) };
  },

  async save(doc) {
    try {
      const store = await this.getStore();
      const idx = store.documents.findIndex(d => d.id === doc.id);
      
      const docToSave = JSON.parse(JSON.stringify(doc));

      if (idx >= 0) {
        store.documents[idx] = docToSave;
      } else {
        store.documents.push(docToSave);
      }
      
      await localforage.setItem(KEY, store);
    } catch (e) {
      console.error("Error al guardar en IndexedDB:", e);
    }
  },
};