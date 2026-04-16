import { useState, useEffect, useRef} from 'react';
import { createBlock, BLOCK_TYPES } from '../models/blockModel';
import { documentService } from '../domain/documentService';
import {
    updateBlock,
    insertAfter,
    insertAsChild,
    removeBlock as removeBlockFn,
    removeBlockWithFocus,
    flattenTree,
    indentBlock as indentBlockFn,
} from '../utils/Utiles';

const DOC_INICIAL = {
    id: 'doc-new',
    title: 'Mi Documento',
    blocks: [createBlock(BLOCK_TYPES.PARAGRAPH, '¡Bienvenida al editor!')],
};

export const useDocument = (documentId) => {
    const [doc, setDoc] = useState(null);
    const isFirstRender = useRef(true);
    const [focusId, setFocusId] = useState(null);
    const saveTimerRef = useRef(null);

    useEffect(() => {
        console.log(`[useDocument] 🚀 Iniciando carga para ID: ${documentId}`);

        const loaded = documentService.loadById(documentId) ?? DOC_INICIAL;
        isFirstRender.current = true;
        setDoc(loaded);
    }, [documentId]);
    
    useEffect(() => {
        if (!doc) return;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            console.log('[useDocument] 🟢 Primer renderizado. No guardamos aún.');
            return;
        }
        
        console.log('[useDocument] 💾 useEffect disparado. Guardando en servicio...');
        documentService.save(doc);
    }, [doc]);

    useEffect(() => {
        if (!doc) return;
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Limpiar timer anterior si el usuario sigue escribiendo rápido
        if (saveTimerRef.current) {
            clearTimeout(saveTimerRef.current);
        }

        console.log('[useDocument] ⏳ Esperando para guardar...');

        // Guardar después de 1 segundo de inactividad
        saveTimerRef.current = setTimeout(() => {
            console.log('[useDocument] 💾 Guardando en servicio (Debounce)');
            documentService.save(doc);
        }, 1000);

        // Cleanup: si el componente se desmonta, guardamos inmediatamente
        return () => {
            if (saveTimerRef.current) {
                clearTimeout(saveTimerRef.current);
                documentService.save(doc); // Guardado final de seguridad
            }
        };
    }, [doc]); 

    const updateContent = (id, newContent) => {
        console.log('[useDocument] 📥 Recibida actualización para', id);
        
        setDoc(prev => {
            if (!prev) return prev;
            const newBlocks = updateBlock(prev.blocks, id, { content: newContent });
            console.log('[useDocument] 🔄 Estado actualizado. Nuevo contenido:', newContent.substring(0, 20));
            return {
                ...prev,
                blocks: newBlocks,
            };
        });
    };




    const updateMeta = (id, patch) => {
        if (id === 'title') {
            setDoc(prev => ({ ...prev, title: patch.title }));
            return;
        }

        setDoc(prev => {
            const block = flattenTree(prev.blocks).find(b => b.id === id);
            if (!block) return prev;
            return {
                ...prev,
                blocks: updateBlock(prev.blocks, id, {
                    metadata: { ... (block.metadata ?? {}), ...patch },
                }),
            };
        });
    };

    const addChild = (parentId) => {
        const newBlock = createBlock();
        setDoc(prev => ({ ...prev, blocks: insertAsChild(prev.blocks, parentId, newBlock,) }));
    };

    const addBlockBelow = (id) => {
        const newBlock = createBlock();
        setDoc(prev => ({ ...prev, blocks: insertAfter(prev.blocks, id, newBlock) }));
        setFocusId(newBlock.id);
    };

    const removeBlock = (id) => {
        if (doc.blocks[0]?.id === id) return;

        const { blocks: updatedBlocks, focusId: newFocusId } = removeBlockWithFocus(doc.blocks, id);
        setDoc(prev => ({ ...prev, blocks: updatedBlocks }));
        if (newFocusId) setFocusId(newFocusId);
    };

    const indentBlock = (id) => {
        setDoc(prev => ({
            ...prev,
            blocks: indentBlockFn(prev.blocks, id),
        }));
        setFocusId(id);
    };
    const changeType = (id, newType) => {
        setDoc(prev => ({
            ...prev,
            blocks: updateBlock(prev.blocks, id, { type: newType }),
        }));
    };
    if (!doc) return { doc: null };
    return { doc, updateContent, updateMeta, addChild, addBlockBelow, changeType, removeBlock, indentBlock, focusId };
};