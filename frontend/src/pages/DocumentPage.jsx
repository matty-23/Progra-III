import { Editor } from '../components/Editor.jsx';
import Toolbar from '../components/Toolbar.jsx';
import { useDocument } from '../hooks/useDocument.js';
import { useRef, useState, useCallback } from 'react';
import { useAutoSave } from '../hooks/useAutoSave.js';
import { cacheService } from '../services/cacheService.js';
import { syncService } from '../services/SyncService.js';
import '../styles/DocumentPage.css'; // Asegúrate de importar el CSS

const DocumentPage = ({documentId}) => {
  const [selectedBlock, setSelectBlock] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Estado para el botón
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
  
  // Guardado en background (AutoSave)
  const guardarDatos = useCallback(async (documentoActualizado) => {
      await cacheService.save(documentoActualizado);
      await syncService.markDirty(documentoActualizado.id); 
  }, []);

  const estadoGuardado = useAutoSave(doc, guardarDatos, 2000);

  // Guardado Manual Persistente
  const handleManualSave = async () => {
    if (!doc) return;
    setIsSaving(true);
    try {
      // 1. Guardamos el estado actual en local
      await cacheService.save(doc);
      // 2. Forzamos la sincronización inmediata al servidor (saltándose el cron de 30s)
      await syncService.forceSync(doc.id);
    } catch (error) {
      console.error("Error al guardar manualmente:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
      {/* Nuevo Header Flotante para el botón Guardar */}
      <div className="header-document">
        <span className="save-status">
          {isSaving 
            ? "Guardando en servidor..." 
            : estadoGuardado === 'guardando' 
              ? "Autoguardando..." 
              : estadoGuardado === 'escribiendo' 
                ? "Escribiendo..." 
                : "Guardado"}
        </span>
        <button
          className="btn-save-document"
          onClick={handleManualSave}
          disabled={isSaving}
        >
          {isSaving ? "Sincronizando..." : "Guardar"}
        </button>
      </div>

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