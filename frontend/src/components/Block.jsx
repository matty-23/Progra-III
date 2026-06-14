import React, { useRef, useEffect } from 'react';
import './Block.css';
import ContenidoBloque from './ContenidoBloque.jsx';

export const Block = ({
  block,
  onUpdate,
  onUpdateMeta,
  onAddChild,
  onAddBlockBelow,
  onRemoveBlock,
  onSelect,
  isSelected,
  onIndentBlock,
  focusId,
}) => {
  const inputRef = useRef(null);

  const handleUpdate = (id, html) => {
    onUpdate(id, html);
  };
  const isProgrammaticFocus = useRef(false);
  const handleToggle = () => {
    onUpdateMeta(block.id, {
      checked: !block.metadata?.checked,
    });
  };

  const handleEnter = () => {
    onAddBlockBelow(block.id);
  };

  const handleTab = () => {
    onIndentBlock(block.id);
  };

  const handleBackspaceOnEmpty = () => {
    onRemoveBlock(block.id);
  };


  // Focus control
 useEffect(() => {
  if (focusId === block.id) {
    const el = inputRef.current;
    el?.focus();

    // Solo mover el cursor al final si es la primera vez que se hace foco (foco programático)
    if (el && !isProgrammaticFocus.current) {
      isProgrammaticFocus.current = true;
      const range = document.createRange();
      const selection = window.getSelection();

      range.selectNodeContents(el);
      range.collapse(false);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  } else {
    // Resetear cuando pierde el foco
    isProgrammaticFocus.current = false;
  }
}, [focusId, block.id]);

  useEffect(() => {
    if (focusId === block.id) {
      const el = inputRef.current;

      isProgrammaticFocus.current = true;

      el?.focus();
      if (el) {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(el);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }, [focusId, block.id]);

  // 🧩 --------- RENDER ---------

  return (
    <div className="block-container">
      <div
        className={`block ${isSelected ? 'block-selected' : ''}`}
        onClick={() => onSelect(block)}
      >
        <span className="handle">⠿</span>
        <ContenidoBloque
          block={block}
          onUpdate={handleUpdate}
          onEnter={handleEnter}
          onTab={handleTab}
          onBackspace={handleBackspaceOnEmpty}
          innerRef={inputRef}
          onToggle={handleToggle}
        />

        <button
          className="add-btn"
          onClick={(e) => {
            e.stopPropagation();
            onAddChild(block.id);
          }}
        >
          +
        </button>
      </div>

      {block.children?.length > 0 && (
        <div className="block-children">
          {block.children.map((child) => (
            <Block
              key={child.id}
              block={child}
              onUpdate={onUpdate}
              onUpdateMeta={onUpdateMeta}
              onAddChild={onAddChild}
              onAddBlockBelow={onAddBlockBelow}
              onRemoveBlock={onRemoveBlock}
              onIndentBlock={onIndentBlock}
              onSelect={onSelect}
              focusId={focusId}
              onEnter={handleEnter}
              onTab={handleTab}
              onBackspace={handleBackspaceOnEmpty}

            />
          ))}
        </div>
      )}
    </div>
  );
};
