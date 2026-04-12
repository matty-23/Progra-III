import { Block } from './Block';
import { Toolbar } from './Toolbar';

export const Editor = ({ doc, onUpdate, onSelectBlock,selectedBlock, onAddChild, onAddBlockBelow, onRemoveBlock, onIndentBlock, onUpdateMeta, focusId }) => {
  return (
    <div className="editor-wrapper">
      <div className="editor-container">
        <input
          type="text"
          value={doc.title}
          onChange={(e) => onUpdateMeta?.('title', e.target.value)}
          className="editor-title"
          placeholder="Sin título"
        />
        <div className="editor-meta">
          {new Date(doc.createdAt).toLocaleDateString('es-AR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}
        </div>

        <div className="editor-divider" />

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
              onUpdateMeta={onUpdateMeta}
              isSelected={selectedBlock?.id === block.id}
              onSelect={onSelectBlock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};