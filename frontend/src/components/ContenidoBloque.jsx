import { useRef, useEffect } from 'react';
import './ContenidoBloque.css';

export default function ContenidoBloque({ block, onUpdate }) {
  const editorRef = useRef(null);


  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== block.content) {
      editorRef.current.innerHTML = block.content || '';
    }
  }, [block.id]); 

  const handleInput = () => {
    if (editorRef.current) {
      onUpdate(block.id, editorRef.current.innerHTML);
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
      <div
        ref={editorRef}
        contentEditable={true} 
        suppressContentEditableWarning={true} 
        onInput={handleInput} 
        className={`block-base ${block.align || 'left'}  ${block.type === 'heading' ? 'block-heading' : ''} ${block.type === 'quote' ? 'block-quote' : ''}`}
      />
    </div>
  );
}
