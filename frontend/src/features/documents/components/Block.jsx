import React, { useRef, useEffect } from 'react';
import './Block.css';

export const Block = ({ block, onUpdate, onAddChild, onAddBlockBelow, onRemoveBlock, onIndentBlock, focusId }) => {
    const inputRef = useRef(null);

    const handleChange = (e) => {
        onUpdate(block.id, e.target.value);
        autoResize();
    };

  const handleKeyDown = (e) => {
  // TAB → hacer hijo
  if (e.key === 'Tab') {
    e.preventDefault();
    onIndentBlock(block.id);
  }

  // ENTER → nuevo bloque
  if (e.key === 'Enter') {
    e.preventDefault();
    onAddBlockBelow(block.id);
  }

  // BACKSPACE → borrar
  if (e.key === 'Backspace' && block.content === '') {
    e.preventDefault();
    onRemoveBlock(block.id);
  }
};

    // 👉 Hace que el input crezca automáticamente
    const autoResize = () => {
        const el = inputRef.current;
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    };

    useEffect(() => {
        autoResize();
    }, []);

    useEffect(() => {
        if (focusId === block.id) {
            const el = inputRef.current;
            el?.focus();
        }
    }, [focusId]);

    return (
        <div className="block-container">
            <div className="block">
                <span className="handle">⠿</span>

                <textarea
                    key={block.id} 
                    ref={inputRef}
                    value={block.content}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className="block-input"
                    rows={1}
                />

                <button
                    onClick={() => onAddChild(block.id)}
                    className="add-btn"
                >
                    +
                </button>
            </div>

            {block.children && block.children.length > 0 && (
                <div className="block-children">
                    {block.children.map((child) => (
                        <Block
                            key={child.id}
                            block={child}
                            onUpdate={onUpdate}
                            onAddChild={onAddChild}
                            onRemoveBlock={onRemoveBlock} 
                            onAddBlockBelow={onAddBlockBelow}
                            onIndentBlock={onIndentBlock}
                            focusId={focusId}
                        
                        />
                    ))}
                </div>
            )}
        </div>
    );
};