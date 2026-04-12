export const SECTION = (id, name, icon, ruta_pagina) => ({
  id,
  name,
  icon,
  ruta_pagina
});

const SECTIONS = [
  SECTION(crypto.randomUUID(), 'Mi Area', '📄', '/nameUser/UserId'),
  SECTION(crypto.randomUUID(), 'Compartidos Conmigo', '🖼️', '/nameUser/compartidos' ),
  SECTION(crypto.randomUUID(), 'Recientes', '🕒', '/nameUser/recientes'),
  SECTION(crypto.randomUUID(), 'Destacados', '⭐', '/nameUser/destacados'),
];
export default SECTIONS;