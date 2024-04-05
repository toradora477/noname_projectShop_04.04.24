import React from 'react';
import RouterSwitch from './RouterSwitch';
import { BrowserRouter as Router } from 'react-router-dom';
import MenuMain from './components/MenuMain';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <MenuMain />
        <RouterSwitch />
      </Router>
    </div>
  );
}

export default App;
