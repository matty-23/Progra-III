import { useState, useEffect } from 'react';
import { createBlock, BLOCK_TYPES } from '../models/blockModel';
import { documentService } from '../domain/documentService';
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
    blocks: [createBlock(BLOCK_TYPES.PARAGRAPH, '¡Bienvenida al editor!')],
};

export const useDocument = (documentId) => {
    const [doc, setDoc] = useState(null);
    const [focusId, setFocusId] = useState(null);
    useEffect(() => {
        const guardado = documentService.loadById(documentId);
        if (guardado) {
            setDoc(guardado);
            return;
        }
        fetch('/localStorage/arbolBloques.json')
            .then(res => res.json())
            .then(data => {
                const documentoOriginal = data.documents.find(d => d.id === documentId);
                if (documentoOriginal) {
                    setDoc(documentoOriginal);
                } else {
                    setDoc({ ...DOC_INICIAL, id: documentId });
                }
            })
            .catch(error => {
                console.error("Error cargando el JSON de prueba:", error);
                setDoc({ ...DOC_INICIAL, id: documentId });
            });

    }, [documentId]);

    const updateContent = (id, newContent) => {
        setDoc(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                blocks: updateBlock(prev.blocks, id, { content: newContent })
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
        doc, updateContent, updateMeta, addChild, addBlockBelow, changeType, removeBlock, indentBlock, focusId
    };
};