import { useState } from 'react';

export const useDocument = () => {
    // 1. Estado inicial
    const [doc, setDoc] = useState({
        title: 'Mi Documento de Ingeniería',
        blocks: [
            { id: '1', content: '¡Bienvenida al editor!', children: [] }
        ]
    });

    // 2. Función para actualizar contenido (Recursiva)
    const updateContent = (id, newContent) => {
        const updateRecursive = (blocks) => {
            return blocks.map(block => {
                if (block.id === id) {
                    return { ...block, content: newContent };
                }
                if (block.children.length > 0) {
                    return { ...block, children: updateRecursive(block.children) };
                }
                return block;
            });
        };

        setDoc(prev => ({
            ...prev,
            blocks: updateRecursive(prev.blocks)
        }));
    };

    // 3. Función para añadir un HIJO (Recursiva)
    const addChild = (parentId) => {
        const addChildRecursive = (blocks) => {
            return blocks.map(block => {
                if (block.id === parentId) {
                    const newChild = {
                        id: crypto.randomUUID(),
                        content: '',
                        children: []
                    };
                    return { ...block, children: [...block.children, newChild] };
                }
                if (block.children.length > 0) {
                    return { ...block, children: addChildRecursive(block.children) };
                }
                return block;
            });
        };

        setDoc(prev => ({
            ...prev,
            blocks: addChildRecursive(prev.blocks)
        }));
    };

    const [focusId, setFocusId] = useState(null);
    // 4. Función para añadir bloque PRINCIPAL (Esta estaba afuera, ahora está ADENTRO)
    const addMainBlock = () => {
        const newBlock = {
            id: crypto.randomUUID(),
            content: '',
            children: []
        };

        setDoc(prev => ({
            ...prev,
            blocks: [...prev.blocks, newBlock]
        }));
    };
    const indentBlock = (id) => {
        let movedBlock = null;

        const process = (blocks) => {
            let result = [];

            for (let i = 0; i < blocks.length; i++) {
                const block = blocks[i];

                if (block.id === id) {
                    movedBlock = block;

                    // 👉 si hay anterior → lo hacemos hijo
                    if (i > 0) {
                        const prev = result[result.length - 1];
                        prev.children = [...prev.children, movedBlock];
                    } else {
                        // si no hay anterior, lo dejamos igual
                        result.push(block);
                    }

                    continue;
                }

                result.push({
                    ...block,
                    children: process(block.children)
                });
            }

            return result;
        };

        setDoc(prev => ({
            ...prev,
            blocks: process(prev.blocks)
        }));

        if (movedBlock) {
            setFocusId(movedBlock.id);
        }
    };
    const addBlockBelow = (id) => {
        const newId = crypto.randomUUID();

        const newBlock = {
            id: newId,
            content: '',
            children: []
        };

        const insertRecursive = (blocks) => {
            return blocks.flatMap(block => {
                if (block.id === id) {
                    return [block, newBlock];
                }

                if (block.children.length > 0) {
                    return [{
                        ...block,
                        children: insertRecursive(block.children)
                    }];
                }

                return [block];
            });
        };

        setDoc(prev => ({
            ...prev,
            blocks: insertRecursive(prev.blocks)
        }));

        setFocusId(newId); // 👈 ESTE ES EL SECRETO
    };
    const removeBlock = (id) => {
        // 👉 si es el primer bloque, NO hacer nada
        if (doc.blocks.length > 0 && doc.blocks[0].id === id) {
            return;
        }

        // 🔽 el resto queda igual
        const flatten = (blocks) => {
            let result = [];

            for (const block of blocks) {
                result.push(block);
                if (block.children.length > 0) {
                    result = result.concat(flatten(block.children));
                }
            }

            return result;
        };

        const flatBlocks = flatten(doc.blocks);
        const index = flatBlocks.findIndex(b => b.id === id);
        const prevBlock = index > 0 ? flatBlocks[index - 1] : null;

        const removeRecursive = (blocks) => {
            return blocks
                .filter(block => block.id !== id)
                .map(block => ({
                    ...block,
                    children: removeRecursive(block.children)
                }));
        };

        setDoc(prev => ({
            ...prev,
            blocks: removeRecursive(prev.blocks)
        }));

        if (prevBlock) {
            setFocusId(prevBlock.id);
        }
    };

    // 5. Retorno de todas las funciones (Único return del Hook)
    return {
        doc,
        updateContent,
        addChild,
        addMainBlock,
        addBlockBelow,
        removeBlock,
        indentBlock,
        focusId
    };
};