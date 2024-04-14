import React from 'react';
import RouterSwitch from './RouterSwitch';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuMain from './components/MenuMain';
import Footer from './components/Footer';
import { useClientViewData } from './tools/hooks';
import Modals from './Modals';
import './App.scss';

function App() {
  useClientViewData();
  return (
    <div className="App">
      <Router>
        <MenuMain />
        <RouterSwitch />
        <Footer />
        <Modals />
      </Router>
    </div>
  );
}

export default App;
