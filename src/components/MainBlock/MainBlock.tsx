import React from 'react';
import { CustomComponent } from '../CustomComponent/CustomComponent';
import { v4 as uuid } from 'uuid';
import s from './mainBlock.module.scss';
import {
  add,
  boardItems,
  deleteItem,
  Item,
  overwriteItems,
  updateItem,
} from '../../redux/slices/boardSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

export const MainBlock = () => {
  let id = uuid().slice(0, 5);
  const dispatch = useAppDispatch();

  const items = useAppSelector(boardItems);

  const copyElementHandler = (currentIndex: number, el: Item) => {
    if (!items) {
      return;
    }
    const newEl = { ...el, id };

    dispatch(
      overwriteItems([
        ...items.slice(0, currentIndex),
        newEl,
        ...items.slice(currentIndex),
      ]),
    );
  };

  const deleteElementHandler = (id: string) => {
    dispatch(deleteItem(id));
  };

  const moveHandler = (
    currentIndex: number,
    el: Item,
    action: 'up' | 'down',
  ) => {
    if (!items) {
      return;
    }

    const change = (index: number) => {
      const newState = [...items].filter((e) => e.id !== el.id);
      newState.splice(index, 0, el);

      dispatch(overwriteItems(newState));
    };
    switch (action) {
      case 'up':
        if (currentIndex === 0) {
          return;
        }
        change(currentIndex - 1);

        break;

      case 'down':
        if (currentIndex === items.length - 1) {
          return;
        }
        change(currentIndex + 1);
        break;

      default:
        break;
    }
  };

  const updateItemHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: Item['id'],
  ) => {
    dispatch(updateItem({ id, body: e.currentTarget.value }));
  };

  const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('drag');
    const element: Item = { id, body: '', type };
    dispatch(add(element));
  };

  return (
    <div
      className={s.container}
      onDrop={onDropHandler}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={s.blocksContainer}>
        {items &&
          items.map((el) => {
            const currentIndex = items.indexOf(el);
            return (
              <CustomComponent
                key={el.id}
                element={el}
                copyElement={() => copyElementHandler(currentIndex, el)}
                deleteElementHandler={() => deleteElementHandler(el.id)}
                moveUpHandler={() => moveHandler(currentIndex, el, 'up')}
                moveDownHandler={() => moveHandler(currentIndex, el, 'down')}
                updateItemHandler={updateItemHandler}
              />
            );
          })}
      </div>
    </div>
  );
};
