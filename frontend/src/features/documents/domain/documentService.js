const KEY = 'documents';

export const documentService = {
  loadAll() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  loadById(id) {
    const data = this.loadAll();
    const doc = data?.documents?.find(d => d.id === id) ?? null;
    if (!doc) return null;

    // Asegura que cada bloque tenga children
    const normalize = (blocks) =>
      blocks.map(b => ({
        ...b,
        children: normalize(b.children ?? []),
      }));

    return { ...doc, blocks: normalize(doc.blocks) };
  },

  save(doc) {
    try {
      const data = this.loadAll() ?? { documents: [] };
      const idx = data.documents.findIndex(d => d.id === doc.id);
      if (idx >= 0) data.documents[idx] = doc;   // actualiza
      else data.documents.push(doc);              // inserta nuevo
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      console.error('No se pudo guardar:', e);
    }
  },
};