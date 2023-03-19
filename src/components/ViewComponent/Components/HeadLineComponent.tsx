import React from 'react';
import { Item } from '../../../redux/slices/boardSlice';

import s from './shared.module.scss';

interface HeadLineProps {
  body: Item['body'];
}

export const HeadLineComponent: React.FC<HeadLineProps> = ({ body }) => {
  return <span className={s.headLine}>{body ? body : 'Empty headline'}</span>;
};
