export function addBlockTree(blocks, parentId, newBlock) {
    return blocks.map(block => {
    if (parentId === parentId) {
        return [...blocks, newBlock];
    };

    if (block.children.length>0) {
        return  {...block, children: addBlockTree(block.children, parentId, newBlock)};
    };

    return block;
})};

export function updateBlockTree(blocks, blockId, newContent) {
    return blocks.map(block => {
    if (block.id === blockId) {
        return {...block, content: newContent};
    if (block.children.length>0) {
        return  {...block, children: updateBlockTree(block.children, blockId, newContent)};
    };
}
return block;})};

export function deleteBlockTree(blocks, blockId) {
    return blocks.filter(block => block.id !== blockId).map(block => {
        if (block.children.length>0) {
            return  {...block, children: deleteBlockTree(block.children, blockId)};
        };
        return block;
    });
}

export function findAndRemoveBlockTree(blocks, blockId) {
    let foundBlock = null;
    const newBlocks = blocks.filter(block => {
        if (block.id === blockId) {
            foundBlock = block;
            return false;
        }
        if(block.children.length>0) {
            const [newChildren, extrected] = findAndRemoveBlockTree(block.children, blockId);
            if (extrected) {
                foundBlock = extrected;
                block.children = newChildren;
            }
        }
        return true;
    });
    return [newBlocks, foundBlock];
}

export function moveBlockTree(blocks, blockId, newParentId) {
    const[treeWhithoutBlock, blockToMove] = findAndRemoveBlockTree(blocks, blockId);
    if (!blockToMove) return blocks;
    if (newParentId === null) return [...treeWhithoutBlock, blockToMove];
return addBlockTree(treeWhithoutBlock, newParentId, blockToMove);   
}