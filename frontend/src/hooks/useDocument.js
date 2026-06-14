import { useState, useEffect } from 'react';
import { createBlock, BLOCK_TYPES } from '../models/blockModel';
import { cacheService } from '../services/cacheService';
import arbolBloques from '../../public/localStorage/arbolBloques.json';
import {
    updateBlock,
    insertAfter,
    insertAsChild,
    removeBlockWithFocus,
    flattenTree,
    indentBlock as indentBlockFn,
} from '../utils/Utiles';

const DOC_INICIAL = {
    title: 'Mi Documento',
    createdAt: Date.now(),
    blocks: [createBlock(BLOCK_TYPES.PARAGRAPH, '¡Bienvenida al editor!')],
};

export const useDocument = (documentId) => {
    const [doc, setDoc] = useState(null);
    const [focusId, setFocusId] = useState(null);


    useEffect(() => {
        const cargar = async () => {
            const guardado = await cacheService.loadById(documentId);
            if (guardado) { setDoc(guardado); return; }

            try {
                const res = await fetch('/localStorage/arbolBloques.json');
                const data = await res.json();
                const encontrado = data.documents.find(d => d.id === documentId);
                setDoc(encontrado ?? { ...DOC_INICIAL, id: documentId });
            } catch {
                setDoc({ ...DOC_INICIAL, id: documentId });
            }
        };
        cargar();
    }, [documentId]);

    // GUARDADO — esto es lo nuevo
    const guardarDoc = useCallback(async (docActual) => {
        await cacheService.save(docActual);
        await syncService.markDirty(docActual.id);
    }, []);

    const estadoGuardado = useAutoSave(doc, guardarDoc, 3000);


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
        setDoc(prev => ({ ...prev, blocks: insertAsChild(prev.blocks, parentId, newBlock) }));
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


    return {
        doc, estadoGuardado,          
        updateContent, updateMeta,
        addChild, addBlockBelow,
        changeType, removeBlock,
        indentBlock, focusId,
    };

};