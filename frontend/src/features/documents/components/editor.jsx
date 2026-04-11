import { Block } from './Block';

export const Editor = ({ doc, onUpdate, onAddChild, onAddBlockBelow, onRemoveBlock, onIndentBlock, focusId }) => {
  return (
    <div className="editor-container" style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px' 
    }}>
      {/* Título del Documento */}
      <input
        type="text"
        value={doc.title}
        onChange={(e) => {/* Aquí podrías implementar updateTitle */}}
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          border: 'none',
          outline: 'none',
          width: '100%',
          marginBottom: '2rem',
          color: '#333'
        }}
        placeholder="Título del documento"
      />

      {/* Renderizado de los bloques raíz */}
      <div className="blocks-list">
        {doc.blocks.map((block) => (
          <Block
            key={block.id}
            block={block}
            onUpdate={onUpdate}
            onAddChild={onAddChild}
            onAddBlockBelow={onAddBlockBelow}
            onRemoveBlock={onRemoveBlock}
            focusId={focusId}
            onIndentBlock={onIndentBlock}
          />
        ))}
      </div>

      {/* Botón para añadir bloque al final (opcional) */}
      <button 
        onClick={() => onAddChild(null)} // null significa "a la raíz"
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          cursor: 'pointer',
          borderRadius: '4px',
          border: '1px dashed #ccc',
          background: 'none'
        }}
      >
        + Añadir bloque principal
      </button>
    </div>
  );
};