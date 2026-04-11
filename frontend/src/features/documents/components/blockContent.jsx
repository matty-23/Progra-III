import React from 'react';

export const BlockContent = ({ block, inputRef, onChange, onKeyDown, onToggle }) => {
  switch (block.type) {

    case 'heading':
      return (
        <input
          ref={inputRef}
          value={block.content}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Título..."
          style={{
            border: 'none', outline: 'none', background: 'transparent',
            width: '100%', fontSize: '1.4rem', fontWeight: '600',
            fontFamily: 'inherit', color: 'inherit',
          }}
        />
      );

    case 'checklist':
      return (
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
          <input
            type="checkbox"
            checked={!!block.metadata?.checked}
            onChange={onToggle}
            style={{ flexShrink: 0, cursor: 'pointer' }}
          />
          <input
            ref={inputRef}
            value={block.content}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Tarea..."
            style={{
              border: 'none', outline: 'none', background: 'transparent',
              width: '100%', fontFamily: 'inherit', color: 'inherit', fontSize: '15px',
              textDecoration: block.metadata?.checked ? 'line-through' : 'none',
              opacity: block.metadata?.checked ? 0.5 : 1,
            }}
          />
        </span>
      );

    case 'paragraph':
    default:
      return (
        <textarea
          ref={inputRef}
          value={block.content}
          onChange={onChange}
          onKeyDown={onKeyDown}
          className="block-input"
          rows={1}
          placeholder="Escribe algo..."
        />
      );
  }
};