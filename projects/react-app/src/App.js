import React from 'react';
import RouterSwitch from './configs/RouterSwitch';
import { BrowserRouter as Router } from 'react-router-dom';
import { MenuMain, MenuAdmin, SideMenu, Footer } from './components';
import { useClientViewData } from './tools/hooks';
import Modals from './Modals';
import './App.scss';
import './common_constants/styles/textStyle.scss';

function App() {
  useClientViewData();
  return (
    <div className="App font-style">
      <Router>
        <div className="App-side-menu-and-content">
          <SideMenu />
          <div className="App-menu-main-and-content">
            <MenuMain />
            <MenuAdmin />
            <RouterSwitch />
          </div>
        </div>
        <Footer />
        <Modals />
      </Router>
    </div>
  );
}

export default App;
