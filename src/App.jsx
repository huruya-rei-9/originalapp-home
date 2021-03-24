import React from 'react';
import './App.css';
import Home from './containers/Home';

const App = () => {
    return (
    <div className="App" >
      <div className="container">
        <Home />
      </div>
      <footer>© 2021 Riku Ganeko</footer>
    </div>
  );
};

export default App;