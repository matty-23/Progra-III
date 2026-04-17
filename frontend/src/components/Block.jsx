import React, { useRef, useEffect } from 'react';
import './Block.css';
import BlockContent from './BlockContent.jsx';

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

  useEffect(() => {
    const el = inputRef.current;
    if (el?.tagName === 'TEXTAREA') {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, [block.content]);

  // Focus control
  useEffect(() => {
    if (focusId === block.id) {
      inputRef.current?.focus();
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

        <BlockContent
          block={block}
          inputRef={inputRef}
          onToggle={handleToggle}
          onEnter={handleEnter}
          onBlur={handleUpdate}
          onUpdate={handleUpdate}  
          onTab={handleTab}
          onBackspaceOnEmpty={handleBackspaceOnEmpty}

          onFocus={() => onSelect(block)}
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
              isSelected={focusId === child.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};