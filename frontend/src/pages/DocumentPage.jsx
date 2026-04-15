import { Editor } from '../components/Editor.jsx';
import Toolbar from '../components/Toolbar.jsx';
import { useDocument } from '../hooks/useDocument.js';
import { useRef, useState } from 'react';
import documentsData from "../../public/localStorage/arbolBloques.json";

const DocumentPage = ({documentId}) => {
  // Inicialización de localStorage (solo una vez)
  if (!localStorage.getItem("documents")) {
    localStorage.setItem("documents", JSON.stringify(documentsData));
  }
  
  console.log('DocumentPage renderizado con documentId:', documentId);
  const [selectedBlock, setSelectBlock] = useState(null);
  const lastSelectedRef = useRef(null);

  const {
    doc,
    updateContent,
    addChild,
    addBlockBelow,
    changeType,
    removeBlock,
    indentBlock,
    updateMeta,
    focusId
  } = useDocument(documentId);

  const handleSelectBlock = (block) => {
    lastSelectedRef.current = block;
    setSelectBlock(block);
  };

  const handleChangeType = (blockId, newType) => {
    changeType(blockId, newType);
    setSelectBlock(prev => prev ? { ...prev, type: newType } : null);
  };

  if (!doc) return <div>Cargando documento...</div>;
 console.log('DocumentPage renderizado con documentId:', documentId);
  return (
    <>
      <div
        className="document-page-container"
        style={{ backgroundColor: "#f5f5f7", minHeight: "100vh" }}
      >
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