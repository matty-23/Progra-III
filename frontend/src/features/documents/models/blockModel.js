import { Children } from "react";

export const BLOCK_TYPES = {
  PARAGRAPH: 'paragraph',
  HEADING:   'heading',
  CHECKLIST: 'checklist',
};

export const createBlock = (type = BLOCK_TYPES.PARAGRAPH, content = '', metadata = {}) => ({
  id: crypto.randomUUID(),
  type,
  content,
  metadata,
  children: [],
});