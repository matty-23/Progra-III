import { Editor } from './components/editor.jsx';
import { Toolbar } from './components/Toolbar.jsx';
import { useDocument } from './hooks/useDocument';
import { useRef, useState } from 'react';

const DocumentPage = ({ defaultDocumentId }) => {
  const [selectedBlock, setSelectBlock] = useState(null);
  const lastSelectedRef = useRef(null);

  const { doc, updateContent, addChild, addBlockBelow, changeType, removeBlock, indentBlock, updateMeta, focusId } =
    useDocument(defaultDocumentId);

  const handleSelectBlock = (block) => {
    lastSelectedRef.current = block;
    setSelectBlock(block);
  };

  const handleChangeType = (blockId, newType) => {
    changeType(blockId, newType);
    setSelectBlock(prev => prev ? { ...prev, type: newType } : null);
  };

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
          onSelectBlock={handleSelectBlock}   
          selectedBlock={selectedBlock}
          focusId={focusId}
        />
      </div>

      <Toolbar
        selectedBlock={selectedBlock ?? lastSelectedRef.current}
        onChangeType={handleChangeType}
        onUpdateMeta={updateMeta}
      />
    </>
  );
};

export default DocumentPage;