import { useState, useEffect } from 'react';
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

export const useDocument = (documentId) => {        // 👈 recibe el id
    const [doc, setDoc] = useState(
        () => documentService.loadById(documentId) ?? DOC_INICIAL
    );
    const [focusId, setFocusId] = useState(null);

    useEffect(() => {
        documentService.save(doc);
    }, [doc]);

    const updateContent = (id, newContent) => {
        setDoc(prev => ({
            ...prev,
            blocks: updateBlock(prev.blocks, id, { content: newContent }),
        }));
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

    return { doc, updateContent, updateMeta, addChild, addBlockBelow, changeType, removeBlock, indentBlock, focusId };
};