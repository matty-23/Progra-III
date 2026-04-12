import { Children } from "react";

export const BLOCK_TYPES = {
  PARAGRAPH: 'paragraph',
  HEADING:   'heading',
  CHECKLIST: 'checklist',
  BULLET: 'bullet',     
  NUMBERED: 'numbered',
};

export const createBlock = (type = BLOCK_TYPES.PARAGRAPH, content = '', metadata = {}) => ({
  id: crypto.randomUUID(),
  type,
  content,
  align: 'left',
  metadata,
  children: [],
});