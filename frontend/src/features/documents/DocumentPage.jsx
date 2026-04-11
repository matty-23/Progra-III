import { Editor } from './components/editor.jsx';
import { useDocument } from './hooks/useDocument';

const DocumentPage = () => {
  const { doc, updateContent, addChild, addBlockBelow, removeBlock, indentBlock,updateMeta, focusId } = useDocument();

  return (
    <div className="document-page-container">
      <Editor
        doc={doc}
        onUpdate={updateContent}
        onAddChild={addChild}
        onAddBlockBelow={addBlockBelow}
        onRemoveBlock={removeBlock}
        onIndentBlock={indentBlock}
        onUpdateMeta={updateMeta} 
        focusId={focusId}
      />
    </div>
  );
};

export default DocumentPage;