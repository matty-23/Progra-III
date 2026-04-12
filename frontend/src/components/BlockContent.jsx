import { useEffect } from 'react';

const HEADING_STYLE = {
  fontFamily: "'Lora', Georgia, serif",
  fontSize: '1.35rem',
  fontWeight: '600',
  color: '#1a1a18',
  letterSpacing: '-0.015em',
  lineHeight: '1.4',
  paddingTop: '12px',
};

const BULLET_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.975rem',
  color: '#2d2c2a',
  lineHeight: '1.7',
};
const QUOTE_STYLE = {
  fontFamily: "'Lora', Georgia, serif",
  fontSize: '1.05rem',
  fontStyle: 'italic',
  color: '#6b6860',
  borderLeft: '3px solid #e8e4dc',
  paddingLeft: '16px',
  marginLeft: '4px',
};

const BASE_STYLE = {
  fontFamily: "'DM Sans', sans-serif",
  fontSize: '0.975rem',
  color: '#2d2c2a',
  lineHeight: '1.7',
  outline: 'none',
  flex: 1,
  minHeight: '28px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  caretColor: '#6b6860',
};

 const BlockContent = ({ block, inputRef, onKeyDown, onFocus, onBlur }) => {
  // Sincroniza el contenido cuando cambia externamente
   useEffect(() => {
    const el = inputRef.current;
    if (el) {
      el.innerHTML = block.content ?? '';
    }
  }, [block.id, block.type]);

  const handleBlur = () => {
    const el = inputRef.current;
    if (el) onBlur?.(block.id, el.innerHTML);
  };

  const style = {
    ...BASE_STYLE,
    ...(block.type === 'heading' ? HEADING_STYLE : {}),
    ...(block.type === 'quote' ? QUOTE_STYLE : {}),
    textAlign: block.metadata?.align ?? 'left',
  };

  // bullet y numbered
  if (block.type === 'bullet' || block.type === 'numbered') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', flex: 1, width: '100%' }}>
        <span style={{
          flexShrink: 0,
          color: '#aaa89e',
          fontSize: '0.975rem',
          lineHeight: '1.7',
          userSelect: 'none',
          minWidth: '16px',
          textAlign: 'right',
        }}>
          {block.type === 'bullet' ? '•' : `${block.metadata?.index ?? 1}.`}
        </span>
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={handleBlur}
          style={{
            ...BASE_STYLE,
            flex: 1,
            minWidth: 0,
          }}
        />
      </div>
    );
  }

  // todo — mismo fix
  if (block.type === 'todo') {
    return (
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, width: '100%' }}>
        <input
          type="checkbox"
          checked={block.metadata?.checked ?? false}
          onChange={() => onToggle?.()}
          className="block-checkbox"
          style={{ marginTop: '5px', flexShrink: 0 }}
        />
        <div
          ref={inputRef}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={handleBlur}
          style={{
            ...BASE_STYLE,
            flex: 1,
            minWidth: 0,
            textDecoration: block.metadata?.checked ? 'line-through' : 'none',
            color: block.metadata?.checked ? '#b5b3ab' : '#2d2c2a',
          }}
        />
      </div>
    );
  }



  return (
    <div
      ref={inputRef}
      contentEditable
      suppressContentEditableWarning
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={handleBlur}
      style={style}
    
    />
  );
};
export default BlockContent;