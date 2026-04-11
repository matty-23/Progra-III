import { Editor } from './components/editor.jsx';
import { Toolbar } from './components/Toolbar.jsx';
import { useDocument } from './hooks/useDocument';

const DocumentPage = ({ defaultDocumentId }) => {
  const { doc, updateContent, addChild, addBlockBelow, removeBlock, indentBlock, updateMeta, focusId } =
    useDocument(defaultDocumentId);

  if (!doc) return <div>Cargando documento...</div>;

  return (
    <>
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

      <Toolbar />   {}
    </>
  );
};

export default DocumentPage;