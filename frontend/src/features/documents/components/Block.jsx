import React, { useRef, useEffect } from 'react';
import { BlockContent } from './blockContent.jsx';
import './Block.css';

export const Block = ({
  block, onUpdate, onUpdateMeta,
  onAddChild, onAddBlockBelow, onRemoveBlock, onSelect ,isSelected, onIndentBlock, focusId,
}) => {
  const inputRef = useRef(null);

  const handleBlur = (id, html) => {
    onUpdate(id, html);
  };

  const handleToggle = () => {
    onUpdateMeta(block.id, { checked: !block.metadata?.checked });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') { e.preventDefault(); onIndentBlock(block.id); }
    if (e.key === 'Enter') { e.preventDefault(); onAddBlockBelow(block.id); }
    if (e.key === 'Backspace' && block.content === '') {
      e.preventDefault(); onRemoveBlock(block.id);
    }
  };

  useEffect(() => {
    const el = inputRef.current;
    if (el?.tagName === 'TEXTAREA') {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  }, []);

  useEffect(() => {
    if (focusId === block.id) inputRef.current?.focus();
  }, [focusId]);

  return (
    <div className="block-container">
      <div className={`block ${isSelected ? 'block-selected' : ''}`}
        onClick={() => onSelect(block)}
      >

        <span className="handle">⠿</span>
        <BlockContent
          block={block}
          inputRef={inputRef}
          onBlur={handleBlur} 
          onKeyDown={handleKeyDown}
          onToggle={handleToggle}
          onFocus={() => onSelect(block)}
        />
        <button onClick={(e) => { e.stopPropagation(); onAddChild(block.id) }} className="add-btn">+</button>
      </div>

      {block.children?.length > 0 && (
        <div className="block-children">
          {block.children.map(child => (
            <Block key={child.id} block={child}
              onUpdate={onUpdate} onUpdateMeta={onUpdateMeta}
              onAddChild={onAddChild} onAddBlockBelow={onAddBlockBelow}
              onRemoveBlock={onRemoveBlock} onIndentBlock={onIndentBlock}
              focusId={focusId}     onSelect={onSelect}       // 👈 faltaba
    isSelected={isSelected}  
            />
          ))}
        </div>
      )}
    </div>
  );
};