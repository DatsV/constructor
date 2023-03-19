import React from 'react';
import { v4 as uuid } from 'uuid';
import { useDispatch } from 'react-redux';
import { add, Item } from '../../redux/slices/boardSlice';

import HeadLineSVG from '../../assets/icons/HeadLine.svg';
import ParagraphSVG from '../../assets/icons/Paragraph.svg';
import ButtonSVG from '../../assets/icons/Button.svg';
import ImageSVG from '../../assets/icons/Image.svg';

import s from './sideBar.module.scss';

export const SideBar = () => {
  const dispatch = useDispatch();

  const addItemHandler = (type: Item['type']) => {
    let id = uuid().slice(0, 4);
    const item: Item = { id, body: '', type };

    dispatch(add(item));
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    type: Item['type'],
  ) => {
    e.dataTransfer.setData('drag', type);
  };

  const Template = (img: string, text: string, type: Item['type']) => {
    return (
      <div
        className={s.item}
        onClick={() => addItemHandler(type)}
        draggable
        onDragStart={(e) => dragStartHandler(e, type)}
      >
        <img src={img} alt={img} />
        <span className={s.helperText}>{text}</span>
      </div>
    );
  };

  return (
    <div className={s.container}>
      <div className={s.widgetsGroup}>
        <div className={s.row}>
          {Template(HeadLineSVG, 'Headline', 'headline')}

          {Template(ParagraphSVG, 'Paragraph', 'paragraph')}
        </div>

        <div className={s.row}>
          {Template(ButtonSVG, 'Button', 'button')}

          {Template(ImageSVG, 'Image', 'image')}
        </div>
      </div>
    </div>
  );
};
