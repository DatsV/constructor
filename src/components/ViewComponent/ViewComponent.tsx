import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { boardItems, Item } from '../../redux/slices/boardSlice';
import { ButtonComponent } from './Components/ButtonComponent';
import { HeadLineComponent } from './Components/HeadLineComponent';
import { ImageComponent } from './Components/ImageComponent';
import { ParagraphComponent } from './Components/ParagraphComponent';

import s from './viewComponent.module.scss';

const components: { [key: string]: React.FC<{ body: Item['body'] }> } = {
  image: ImageComponent,
  paragraph: ParagraphComponent,
  headline: HeadLineComponent,
  button: ButtonComponent,
};

export const ViewComponent: React.FC = () => {
  const items = useAppSelector(boardItems);

  return (
    <div className={s.container}>
      {items &&
        items.map((el) => {
          const Component = components[el.type];
          return <Component key={el.id + 'render'} body={el.body} />;
        })}
    </div>
  );
};
