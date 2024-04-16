import React from 'react';
import RouterSwitch from './RouterSwitch';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuMain, SideMenu, Footer } from './components';
import { useClientViewData } from './tools/hooks';
import Modals from './Modals';
import './App.scss';
import './common_constants/styles/textStyle.scss';

function App() {
  useClientViewData();
  return (
    <div className="App text-style regular-text">
      <Router>
        <MenuMain />
        <SideMenu />
        <RouterSwitch />
        <Footer />
        <Modals />
      </Router>
    </div>
  );
}

export default App;
