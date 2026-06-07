import { Editor } from '../components/Editor.jsx';
import Toolbar from '../components/Toolbar.jsx';
import { useDocument } from '../hooks/useDocument.js';
import { useRef, useState, useCallback } from 'react';
import { useAutoSave } from '../hooks/useAutoSave.js';
import { cacheService } from '../services/cacheService.js';


const DocumentPage = ({documentId}) => {
  
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
  
const guardarDatos = useCallback(async (documentoActualizado) => {
    console.log("Iniciando guardado...");
    await cacheService.save(documentoActualizado);
    console.log("¡Documento guardado con éxito!");
  }, []);

  const estadoGuardado = useAutoSave(doc, guardarDatos, 2000);

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
      <div className="main">
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
        onIndentBlock={indentBlock}
        onRemoveBlock={removeBlock}
      />
    </>
  );
};

export default DocumentPage;
