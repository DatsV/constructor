import React from 'react';
import { Header } from '../../components/Header/Header';
import { MainBlock } from '../../components/MainBlock/MainBlock';
import { SideBar } from '../../components/SideBar/SideBar';
import { ViewComponent } from '../../components/ViewComponent/ViewComponent';

import s from './layout.module.scss';

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <div className={s.container}>
        <SideBar />

        <div className={s.mainContainer}>
          <MainBlock />

          <ViewComponent />
        </div>
      </div>
    </>
  );
};
