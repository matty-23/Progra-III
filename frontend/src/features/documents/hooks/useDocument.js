import { useState, useEffect } from 'react';
import { createBlock, BLOCK_TYPES } from '../models/blockModel';
import { documentService } from '../domain/documentService';

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


    // — helpers recursivos —
    const mapBlocks = (blocks, fn) => blocks.map(block => ({
        ...fn(block),
        children: mapBlocks(block.children ?? [], fn),  // 👈 ?? []
    }));

    // Ya funciona igual, content ahora guarda HTML como "<strong>hola</strong>"
    const updateContent = (id, newContent) => {
        setDoc(prev => ({
            ...prev,
            blocks: mapBlocks(prev.blocks, block =>
                block.id === id ? { ...block, content: newContent } : block
            ),
        }));
    };

    // Nuevo: actualiza metadata (checked, color, etc.)
    const updateMeta = (id, patch) => {
        setDoc(prev => ({
            ...prev,
            blocks: mapBlocks(prev.blocks, block =>
                block.id === id
                    ? { ...block, metadata: { ...block.metadata, ...patch } }
                    : block
            ),
        }));
    };

    const addChild = (parentId) => {
        const newBlock = createBlock();
        const addRecursive = (blocks) => blocks.map(block => {
            if (block.id === parentId) return { ...block, children: [...block.children, newBlock] };
            return { ...block, children: addRecursive(block.children) };
        });
        setDoc(prev => ({ ...prev, blocks: addRecursive(prev.blocks) }));
    };

    const addBlockBelow = (id) => {
        const newBlock = createBlock();
        const insertRecursive = (blocks) =>
            blocks.flatMap(block => {
                if (block.id === id) return [block, newBlock];
                return [{ ...block, children: insertRecursive(block.children) }];
            });
        setDoc(prev => ({ ...prev, blocks: insertRecursive(prev.blocks) }));
        setFocusId(newBlock.id);
    };

    const removeBlock = (id) => {
        if (doc.blocks[0]?.id === id) return;
        const flatten = (blocks) =>
            blocks.flatMap(b => [b, ...flatten(b.children)]);
        const flat = flatten(doc.blocks);
        const prev = flat[flat.findIndex(b => b.id === id) - 1];
        const removeRecursive = (blocks) =>
            blocks
                .filter(b => b.id !== id)
                .map(b => ({ ...b, children: removeRecursive(b.children) }));
        setDoc(prev => ({ ...prev, blocks: removeRecursive(prev.blocks) }));
        if (prev) setFocusId(prev.id);
    };

    const indentBlock = (id) => {
        let moved = null;
        const process = (blocks) => {
            const result = [];
            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];
                if (block.id === id) {
                    moved = block;
                    if (i > 0) result[result.length - 1].children.push(moved);
                    else result.push(block);
                    continue;
                }
                result.push({ ...block, children: process(block.children) });
            }
            return result;
        };
        setDoc(prev => ({ ...prev, blocks: process(prev.blocks) }));
        if (moved) setFocusId(moved.id);
    };
    const changeType = (id, newType) => {
        setDoc(prev => ({
            ...prev,
            blocks: mapBlocks(prev.blocks, block =>
                block.id === id ? { ...block, type: newType } : block
            ),
        }));
    };

    return { doc, updateContent, updateMeta, addChild, addBlockBelow, changeType, removeBlock, indentBlock, focusId };
};