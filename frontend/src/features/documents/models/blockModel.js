import { Children } from "react";

export const BLOCK_TYPES = {
    PARAGRAPH: 'paragraph',
    HEADING: 'h1',
    CHECKLIST: 'checklist'}
;
export const createBlockLabel = (type=BLOCK_TYPES.PARAGRAPH, content='', metadata={}) => ({
    id: crypto.randomUUID(),
    type,
    content,
    metadata,
    children: []
});