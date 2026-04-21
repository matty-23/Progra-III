const KEY = 'documents';

export const documentService = {
  getStore() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) {
        // Si no hay nada, inicializamos con la estructura básica
        const initialStore = { documents: [] };
        localStorage.setItem(KEY, JSON.stringify(initialStore));
        return initialStore;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.error("Error leyendo localStorage, reseteando...", e);
      const initialStore = { documents: [] };
      localStorage.setItem(KEY, JSON.stringify(initialStore));
      return initialStore;
    }
  },
  
  loadById(id) {
    const store = this.getStore();
    const doc = store?.documents?.find(d => d.id === id);
    
    if (!doc) {
        return null;
    }
    

    // Normalización profunda para evitar referencias rotas
    const normalize = (blocks) =>
      blocks.map(b => ({
        ...b, // Copiar todas las propiedades
        id: b.id,
        type: b.type ?? 'paragraph',
        content: b.content ?? '',
        metadata: b.metadata ?? {},
        children: b.children ? normalize(b.children) : [],
      }));

    return { ...doc, blocks: normalize(doc.blocks) };
  },

  save(doc) {
    try {
      const store = this.getStore();
      const idx = store.documents.findIndex(d => d.id === doc.id);
      
      // Clonamos el doc para evitar problemas de referencias circulares o mutaciones
      const docToSave = JSON.parse(JSON.stringify(doc));

      if (idx >= 0) {
        store.documents[idx] = docToSave;
      } else {
        store.documents.push(docToSave);
      }
      
      localStorage.setItem(KEY, JSON.stringify(store));
      
      // VERIFICACIÓN INMEDIATA (Solo para debug, quitar en producción)
      const verify = JSON.parse(localStorage.getItem(KEY));
      const savedDoc = verify.documents.find(d => d.id === doc.id);

    } catch (e) {
    }
  },
};