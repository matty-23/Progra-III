export function updateBlock(blocks, id, patch) {
  return blocks.map(block =>
    block.id === id
      ? { ...block, ...patch }
      : { ...block, children: updateBlock(block.children, id, patch) }
  );
}

export function insertAfter(blocks, afterId, newBlock) {
  return blocks.flatMap(block => {
    if (block.id === afterId) return [block, newBlock];
    return [{ ...block, children: insertAfter(block.children, afterId, newBlock) }];
  });
}

export function insertAsChild(blocks, parentId, newBlock) {
  return blocks.map(block => {
    if (block.id === parentId) return { ...block, children: [...block.children, newBlock] };
    return { ...block, children: insertAsChild(block.children, parentId, newBlock) };
  });
}

export function removeBlock(blocks, id) {
  return blocks
    .filter(block => block.id !== id)
    .map(block => ({ ...block, children: removeBlock(block.children, id) }));
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
  return blocks.flatMap(block => [block, ...flattenTree(block.children)]);
}