export const SECTION = (id, name, icon) => ({
  id,
  name,
  icon,
});

export const SECTIONS = [
  SECTION(crypto.randomUUID(), 'Documentos', '📄'),
  SECTION(crypto.randomUUID(), 'Imágenes', '🖼️'),
];