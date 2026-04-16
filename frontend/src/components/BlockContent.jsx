import { useEffect, useRef } from 'react'; // 1. Importa useRef
import './BlockContent.css';

const BlockContent = ({
  block,
  inputRef,
  onEnter,
  onTab,
  onBackspaceOnEmpty,
  onFocus,
  onBlur,
  onToggle,
  onUpdate,
  isProgrammaticFocus
}) => {

  useEffect(() => {
    const el = inputRef.current;
    if (el) {
      if (el.innerHTML !== block.content) {
        el.innerHTML = block.content ?? '';
      }
    }
  }, [block.id, block.type, block.content]);

  useEffect(() => {
    const el = inputRef.current;
    if (el && block.content !== undefined) {
      if (el.innerHTML !== block.content) {
        el.innerHTML = block.content;
      }
    }
  }, [block.id, block.type]);
  const isEmpty = () => {
    const el = inputRef.current;
    if (!el) return true;
    const html = el.innerHTML;
    return (
      html === '' ||
      html === '<br>' ||
      html.replace(/<[^>]+>/g, '').trim() === ''
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter?.();
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      onTab?.();
    }
    if (e.key === 'Backspace' && isEmpty()) {
      e.preventDefault();
      onBackspaceOnEmpty?.();
    }
  };

  const handleInput = () => {
    const el = inputRef.current;
    if (el) {
      onUpdate?.(block.id, el.innerHTML);
    }
  };
  const handleBlur = () => {
    const el = inputRef.current;
    if (el) {
      // Al perder foco, aseguramos que el último cambio esté en el estado
      onUpdate?.(block.id, el.innerHTML);
      onBlur?.(block.id, el.innerHTML);
    }
  };

  const getClassName = () => {
    let base = 'block-base';
    if (block.type === 'heading') base += ' block-heading';
    if (block.type === 'quote') base += ' block-quote';
    return base;
  };

  const handleFocus = () => {
    const el = inputRef.current;
    if (isProgrammaticFocus?.current && el) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(el);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (isProgrammaticFocus) {
      isProgrammaticFocus.current = false;
    }
    onFocus?.();
  };

  // --- RENDERIZADO ---

  if (block.type === 'bullet' || block.type === 'numbered') {
    return (
      <div className="block-row">
        <span className="block-marker">
          {block.type === 'bullet' ? '•' : `${block.metadata?.index ?? 1}.`}
        </span>
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="block-base"
        />
      </div>
    );
  }

  if (block.type === 'todo') {
    return (
      <div className="block-row">
        <input
          type="checkbox"
          checked={block.metadata?.checked ?? false}
          onChange={() => onToggle?.()}
          className="block-checkbox"
        />
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`block-base ${block.metadata?.checked ? 'block-checked' : ''}`}
        />
      </div>
    );
  }

  return (
    <div
      ref={inputRef}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={handleKeyDown}
      onInput={handleInput} // <--- Faltaba agregar onInput aquí también
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={getClassName()}
      style={{ textAlign: block.metadata?.align ?? 'left' }}
    />
  );
};

export default BlockContent;