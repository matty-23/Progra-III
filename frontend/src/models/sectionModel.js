export const SECTION = (id, name, icon,ruta) => ({
  id,
  name,
  icon,
  ruta
});

const SECTIONS = [
  SECTION(crypto.randomUUID(), 'Mi Area', '📄', 'mi-area'),
  SECTION(crypto.randomUUID(), 'Compartidos Conmigo', '🖼️', '/compartidos-conmigo'),
  SECTION(crypto.randomUUID(), 'Recientes', '🕒', '/recientes'),
  SECTION(crypto.randomUUID(), 'Destacados', '⭐', '/destacados'),
];
export default SECTIONS;