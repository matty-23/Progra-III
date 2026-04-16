// documentService.js
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
    console.log(`[Service] 🔍 Buscando doc ID: ${id}`);
    const store = this.getStore();
    const doc = store?.documents?.find(d => d.id === id);
    
    if (!doc) {
        console.warn(`[Service] ⚠️ Documento ${id} NO encontrado.`);
        return null;
    }
    
    console.log(`[Service] ✅ Documento ${id} encontrado. Título: ${doc.title}`);

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
      console.log(`[Service] 🗄️ Guardando doc ID: ${doc.id}`);
      const store = this.getStore();
      const idx = store.documents.findIndex(d => d.id === doc.id);
      
      // Clonamos el doc para evitar problemas de referencias circulares o mutaciones
      const docToSave = JSON.parse(JSON.stringify(doc));

      if (idx >= 0) {
        store.documents[idx] = docToSave;
        console.log(`[Service] 🔄 Actualizado en índice ${idx}`);
      } else {
        store.documents.push(docToSave);
        console.log(`[Service] ➕ Añadido nuevo documento`);
      }
      
      localStorage.setItem(KEY, JSON.stringify(store));
      console.log('[Service] 💿 Escritura finalizada.');
      
      // VERIFICACIÓN INMEDIATA (Solo para debug, quitar en producción)
      const verify = JSON.parse(localStorage.getItem(KEY));
      const savedDoc = verify.documents.find(d => d.id === doc.id);
      console.log(`[Service] 👀 Verificación: El bloque 0 tiene contenido: "${savedDoc?.blocks[0]?.content.substring(0,10)}..."`);

    } catch (e) {
      console.error('[Service] ❌ Error CRÍTICO al guardar:', e);
    }
  },
};