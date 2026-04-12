export function updateBlock(blocks, id, patch) {
  return blocks.map(block =>
    block.id === id
      ? { ...block, ...patch }
      : { ...block, children: updateBlock(block.children ?? [], id, patch) }
  );
}
export function insertAfter(blocks, afterId, newBlock) {
  return blocks.flatMap(block => {
    if (block.id === afterId) return [block, newBlock];
    return [{ ...block, children: insertAfter(block.children ?? [], afterId, newBlock) }];
  });
}

export function insertAsChild(blocks, parentId, newBlock) {
  return blocks.map(block => {
    if (block.id === parentId)
      return { ...block, children: [...(block.children ?? []), newBlock] };
    return { ...block, children: insertAsChild(block.children ?? [], parentId, newBlock) };
  });
}

export function removeBlock(blocks, id) {
  return blocks
    .filter(block => block.id !== id)
    .map(block => ({ ...block, children: removeBlock(block.children ?? [], id) }));
}

export function removeBlockWithFocus(blocks, id) {
  const flat = flattenTree(blocks);
  const currentIndex = flat.findIndex(b => b.id === id);
  
  const updatedBlocks = removeBlock(blocks, id);
  const newFlat = flattenTree(updatedBlocks);
  
  let focusId = null;
  if (currentIndex > 0 && newFlat.length > 0) {
    const focusIndex = Math.min(currentIndex - 1, newFlat.length - 1);
    focusId = newFlat[focusIndex].id;
  }
  
  return { blocks: updatedBlocks, focusId };
}
export function extractBlock(blocks, id) {
  let found = null;
  const remaining = blocks
    .filter(block => { if (block.id === id) { found = block; return false; } return true; })
    .map(block => {
      const [newChildren, extracted] = extractBlock(block.children, id);
      if (extracted) found = extracted;
      return { ...block, children: newChildren };
    });
  return [remaining, found];
}

export function moveBlock(blocks, id, newParentId) {
  const [remaining, block] = extractBlock(blocks, id);
  if (!block) return blocks;
  if (newParentId === null) return [...remaining, block];
  return insertAsChild(remaining, newParentId, block);
}

export function flattenTree(blocks) {
  return blocks.flatMap(block => [block, ...flattenTree(block.children ?? [])]);
}
export function indentBlock(blocks, id) {
  const process = (list) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
      const block = list[i];
 
      if (block.id === id) {
        if (i > 0) {
          const prev = result[result.length - 1];
          result[result.length - 1] = {
            ...prev,
            children: [...(prev.children ?? []), block],
          };
        } else {
          // No hay predecesor: no se puede indentar más
          result.push(block);
        }
        continue;
      }
 
      result.push({ ...block, children: process(block.children ?? []) });
    }
    return result;
  };
 
  return process(blocks);
}