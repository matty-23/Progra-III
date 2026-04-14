import { abrirSection } from "../components/Cambiar";
export const SECTION = (id, name, icon, ruta_pagina) => ({
  id,
  name,
  icon,
  action
});

const SECTIONS = [
  SECTION(crypto.randomUUID(), 'Mi Area', '📄', () => abrirSection('Mi Area')),
  SECTION(crypto.randomUUID(), 'Compartidos Conmigo', '🖼️', () => abrirSection('Compartidos Conmigo')),
  SECTION(crypto.randomUUID(), 'Recientes', '🕒', () => abrirSection('Recientes')),
  SECTION(crypto.randomUUID(), 'Destacados', '⭐', () => abrirSection('Destacados')),
];
export default SECTIONS;