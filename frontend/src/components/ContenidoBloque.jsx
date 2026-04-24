import { useRef, useEffect } from 'react';
import './ContenidoBloque.css';

export default function ContenidoBloque({ block, onUpdate, onEnter, onTab, onBackspace, innerRef,onToggle  }) {
  const currentAlign = block.metadata?.align || 'left';
  const alignmentClass = `align-${currentAlign}`;
  useEffect(() => {
    if (innerRef.current && innerRef.current.innerHTML !== block.content) {
      innerRef.current.innerHTML = block.content || '';
    }
  }, [block.id]);

  const handleInput = () => {
    if (innerRef.current) {
      onUpdate(block.id, innerRef.current.innerHTML);
    }
  };
  const isEmpty = () => {
    const html = innerRef.current?.innerHTML || '';
    return html === '' || html === '<br>';
  };
  const isChecked = block.metadata?.checked || false;
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Evita un salto de línea por defecto
      onEnter?.();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      onTab?.();
    }
    if (e.key === 'Backspace' && isEmpty()) {
      e.preventDefault();
      onBackspace?.();
    }
  };
  return (
    <div className={`block-row type-${block.type}`}>


      {block.type === 'bullet' && (
        <span className="block-prefix">•</span>
      )}
      {block.type === 'numbered' && (
        <span className="block-prefix numbered"></span>
      )}
      {block.type === 'todo' && (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
          className="block-checkbox"
        />
      )}
      <div
        ref={innerRef}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={`block-base ${alignmentClass}  ${block.type === 'heading' ? 'block-heading' : ''} ${block.type === 'quote' ? 'block-quote' : ''} ${block.type === 'todo' && isChecked ? 'block-todo-checked' : ''}`}
      />
    </div>
  );
}
