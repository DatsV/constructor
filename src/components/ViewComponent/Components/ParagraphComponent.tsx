import React from 'react';
import { Item } from '../../../redux/slices/boardSlice';

import s from './shared.module.scss';

interface ParagraphProps {
  body: Item['body'];
}

export const ParagraphComponent: React.FC<ParagraphProps> = ({ body }) => {
  return <span className={s.paragraph}>{body ? body : 'Empty paragraph'}</span>;
};
