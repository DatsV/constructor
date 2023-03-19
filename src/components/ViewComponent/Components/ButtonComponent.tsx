import React from 'react';
import { Item } from '../../../redux/slices/boardSlice';
import s from './shared.module.scss';

interface ButtonProps {
  body: Item['body'];
}

export const ButtonComponent: React.FC<ButtonProps> = ({ body }) => {
  return (
    <button className={s.button}>
      <span>{body ? body : 'Empty button'}</span>
    </button>
  );
};
