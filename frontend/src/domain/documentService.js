import data from "../localStorage/arbolBloques.json";
const KEY = 'documents';

export const documentService = {
  getStore() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
      localStorage.setItem(KEY, JSON.stringify(data));
      return data;
    } catch {
      return data;
    }
  },
  
loadAll() {
    return this.getStore();
  },
  loadById(id) {
    const store = this.getStore();
    const doc = store?.documents?.find(d => d.id === id) ?? null;
    if (!doc) return null;

    const normalize = (blocks) =>
      blocks.map(b => ({
        id: b.id,
        type: b.type ?? 'paragraph',
        content: b.content ?? '',
        align: b.align ?? 'left',
        metadata: b.metadata ?? {},
        children: normalize(b.children ?? []),
      }));

    return { ...doc, blocks: normalize(doc.blocks) };
  },

  save(doc) {
    try {
      console.log('💾 Guardando doc:5', doc.id);
      const store = this.getStore();
      const idx = store.documents.findIndex(d => d.id === doc.id);
      if (idx >= 0) store.documents[idx] = doc;   // actualiza
      else store.documents.push(doc);              // inserta nuevo
      localStorage.setItem(KEY, JSON.stringify(store));
    } catch (e) {
      console.error('No se pudo guardar:', e);
    }
  },
};