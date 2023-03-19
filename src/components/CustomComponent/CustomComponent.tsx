import { clsx } from 'clsx';
import React from 'react';

import s from './customComponent.module.scss';

import ArrowSVG from '../../assets/icons/arrow-top.svg';
import ButtonSVG from '../../assets/icons/Button.svg';
import CopySVG from '../../assets/icons/copy.svg';
import HeadLineSVG from '../../assets/icons/HeadLine.svg';
import ImageSVG from '../../assets/icons/Image.svg';
import ParagraphSVG from '../../assets/icons/Paragraph.svg';
import TrashSVG from '../../assets/icons/trash.svg';
import { Item } from '../../redux/slices/boardSlice';

const Icons: { [key: string]: string } = {
  headline: HeadLineSVG,
  paragraph: ParagraphSVG,
  button: ButtonSVG,
  image: ImageSVG,
};

interface ImageComProps {
  element: Item;
  copyElement: () => void;
  deleteElementHandler: () => void;
  moveUpHandler: () => void;
  moveDownHandler: () => void;
  updateItemHandler: (
    event: React.ChangeEvent<HTMLInputElement>,
    id: Item['id'],
  ) => void;
}

export const CustomComponent: React.FC<ImageComProps> = ({
  element,
  copyElement,
  deleteElementHandler,
  moveUpHandler,
  moveDownHandler,
  updateItemHandler,
}) => {
  const [active, setActive] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  const currentSVG = Icons[element.type];

  const placeholder =
    element.type === 'image' ? 'Paste an URL' : 'Type something';

  React.useEffect(() => {
    if (active) {
      document.body.addEventListener('click', handleOut);
    }

    return () => {
      document.body.removeEventListener('click', handleOut);
    };
  }, [active]);

  const handleOut = (e: MouseEvent) => {
    if (!ref.current?.contains(e.target as HTMLDivElement)) {
      setActive(false);
    }
  };

  return (
    <div
      ref={ref}
      className={clsx(s.container, active && s.active)}
      onClick={() => setActive(true)}
    >
      <img src={currentSVG} alt={currentSVG} />
      <span>
        {element.type.charAt(0).toUpperCase() + element.type.slice(1)}
      </span>

      <div className={s.actionBlock}>
        <div className={s.actions}>
          <div className={s.action} onClick={moveUpHandler}>
            <img src={ArrowSVG} alt={ArrowSVG} />
          </div>
          <div className={s.action} onClick={moveDownHandler}>
            <img src={ArrowSVG} alt={ArrowSVG} />
          </div>
        </div>
        <div className={s.actions}>
          <div className={s.action} onClick={copyElement}>
            <img src={CopySVG} alt={CopySVG} />
          </div>
          <div className={s.action} onClick={deleteElementHandler}>
            <img src={TrashSVG} alt={TrashSVG} />
          </div>
        </div>
      </div>

      <div className={s.inputContainer}>
        <input
          type='text'
          className={s.input}
          value={element.body}
          onChange={(e) => {
            updateItemHandler(e, element.id);
          }}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
