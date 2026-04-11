
const KEY = 'doc';

export const documentService = {
  load() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  save(doc) {
    try {
      localStorage.setItem(KEY, JSON.stringify(doc));
    } catch (e) {
      console.error('No se pudo guardar:', e);
    }
  },
};