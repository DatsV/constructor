import React from 'react';

import s from './header.module.scss';

export const Header: React.FC = () => {
  return (
    <div className={s.container}>
      <div className={s.title}>
        <span>REACT EDITOR Test</span>
      </div>
    </div>
  );
};
