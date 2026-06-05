export const SECTION = (id, name, icon, ruta) => ({
  id,
  name,
  icon,
  ruta,
});

const SECTIONS = [
  SECTION('mi-area',            'Mi Area',              ' ', 'mi-area'),
  SECTION('compartidos-conmigo','Compartidos Conmigo',   ' ', 'compartidos-conmigo'),
  SECTION('recientes',          'Recientes',             ' ', 'recientes'),
  SECTION('destacados',         'Destacados',            ' ', 'destacados'),
];

export default SECTIONS;