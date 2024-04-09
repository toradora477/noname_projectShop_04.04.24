import React from 'react';
import RouterSwitch from './RouterSwitch';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuMain from './components/MenuMain';
import Footer from './components/Footer';
import { useClientViewData } from './tools/hooks';
import './App.scss';

function App() {
  useClientViewData();
  return (
    <div className="App">
      <Router>
        <MenuMain />
        <RouterSwitch />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
