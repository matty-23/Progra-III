import { useState } from 'react';
import './Toolbar.css';
const applyAlign = (align, selectedBlock, onUpdateMeta) => {
  const el = document.activeElement;
  if (el) el.style.textAlign = align;
  if (selectedBlock) onUpdateMeta(selectedBlock.id, { align });
};
// Arriba del componente, junto a applyFormat y applyAlign:
const applyList = (type, selectedBlock, onChangeType) => {
  if (!selectedBlock) return;
  // si ya es ese tipo, vuelve a párrafo (toggle)
  const newType = selectedBlock.type === type ? 'paragraph' : type;
  onChangeType(selectedBlock.id, newType);
};
const Toolbar = ({ selectedBlock, onChangeType, onUpdateMeta }) => {

  return (
    <div
      className="toolbar"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="toolbar-group">
        <select
          className="tb-select"
          value={selectedBlock?.type ?? 'paragraph'}
          onChange={(e) => selectedBlock && onChangeType(selectedBlock.id, e.target.value)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <option value="paragraph">Párrafo</option>
          <option value="heading">Título</option>
          <option value="todo">To-do</option>
          <option value="quote">Cita</option>
        </select>
      </div>

      <div className="tb-sep" />

      {/* Formato texto */}
      <div className="toolbar-group">
        <button
          onMouseDown={(e) => {
            e.preventDefault();         // no pierde el foco ni la selección
            applyFormat('bold');
          }}
          className="tb-btn-text bold"
          title="Negrita"
        >B</button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('italic');
          }}
          className="tb-btn-text italic"
          title="Cursiva"
        >I</button>

        <button
          onMouseDown={(e) => {
            e.preventDefault();
            applyFormat('underline');
          }}
          className="tb-btn-text underline"
          title="Subrayado"
        >S</button>
      </div>

      <div className="tb-sep" />


      <div className="toolbar-group">
        <button
          className="tb-btn"
          title="Izquierda"
          onMouseDown={(e) => { e.preventDefault(); applyAlign('left', selectedBlock, onUpdateMeta); }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3h12v1.5H2V3zm0 3h8v1.5H2V6zm0 3h12v1.5H2V9zm0 3h6v1.5H2V12z" />
          </svg>
        </button>
        <button
          className="tb-btn"
          title="Centro"
          onMouseDown={(e) => { e.preventDefault(); applyAlign('center', selectedBlock, onUpdateMeta); }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3h12v1.5H2V3zm2 3h8v1.5H4V6zm-2 3h12v1.5H2V9zm3 3h6v1.5H5V12z" />
          </svg>
        </button>
        <button
          className="tb-btn"
          title="Derecha"
          onMouseDown={(e) => { e.preventDefault(); applyAlign('right', selectedBlock, onUpdateMeta); }}             >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 3h12v1.5H2V3zm6 3h6v1.5H8V6zm-6 3h12v1.5H2V9zm4 3h8v1.5H6V12z" />
          </svg>
        </button>
      </div>

      <div className="tb-sep" />

      {/* Listas e indentación */}
      <div className="toolbar-group">
        <button
          className={`tb-btn ${selectedBlock?.type === 'bullet' ? 'active' : ''}`}
          title="Lista con viñetas"
          onMouseDown={(e) => { e.preventDefault(); applyList('bullet', selectedBlock, onChangeType); }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="3" cy="4.5" r="1.2" /><rect x="6" y="3.8" width="8" height="1.4" rx="0.7" />
            <circle cx="3" cy="8.5" r="1.2" /><rect x="6" y="7.8" width="8" height="1.4" rx="0.7" />
            <circle cx="3" cy="12.5" r="1.2" /><rect x="6" y="11.8" width="6" height="1.4" rx="0.7" />
          </svg>
        </button>

        <button
          className={`tb-btn ${selectedBlock?.type === 'numbered' ? 'active' : ''}`}
          title="Lista numerada"
          onMouseDown={(e) => { e.preventDefault(); applyList('numbered', selectedBlock, onChangeType); }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
            <text x="1.5" y="6" fontSize="5.5" fontFamily="sans-serif" fontWeight="500">1.</text>
            <rect x="6" y="3.8" width="8" height="1.4" rx="0.7" />
            <text x="1.5" y="10" fontSize="5.5" fontFamily="sans-serif" fontWeight="500">2.</text>
            <rect x="6" y="7.8" width="8" height="1.4" rx="0.7" />
            <text x="1.5" y="14" fontSize="5.5" fontFamily="sans-serif" fontWeight="500">3.</text>
            <rect x="6" y="11.8" width="6" height="1.4" rx="0.7" />
          </svg>
        </button>
        <button className="tb-btn" title="Indentar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="2" y1="4" x2="14" y2="4" /><polyline points="6,8 10,10 6,12" /><line x1="10" y1="10" x2="2" y2="10" /></svg>
        </button>
      </div>

      <div className="tb-sep" />

      {/* Acciones */}
      <div className="toolbar-group">
        <button className="tb-btn" title="Duplicar bloque">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="5" width="8" height="8" rx="2" /><path d="M3 11V3h8" /></svg>
        </button>
        <button className="tb-btn danger" title="Eliminar bloque">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3,4 13,4" /><path d="M5,4 V3 Q5,2 6,2 h4 Q11,2 11,3 V4" /><line x1="6" y1="7" x2="6" y2="12" /><line x1="8" y1="7" x2="8" y2="12" /><line x1="10" y1="7" x2="10" y2="12" /><path d="M4,4 l0.7,9 Q4.8,14 6,14 h4 Q11.2,14 11.3,13 L12,4" /></svg>
        </button>
      </div>

    </div>
  );

};
export default Toolbar;