import React from 'react';
import { Item } from '../../../redux/slices/boardSlice';
import s from './shared.module.scss';

interface ImageProps {
  body: Item['body'];
}

export const ImageComponent: React.FC<ImageProps> = ({ body }) => {
  return (
    <div className={s.imageContainer}>
      {body ? <img src={body} alt={'image'} /> : <div className={s.img}></div>}
    </div>
  );
};
