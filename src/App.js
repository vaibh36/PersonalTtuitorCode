import React from 'react';
import logo from './logo.svg';
import classes from './App.css';
import Register from './Container/Register';
import Homepage from './Container/Homepage';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from '../src/Container/Header/Header';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Route to='/homepage' component={Homepage}></Route>
      </BrowserRouter>

    </div>
  );
}

export default App;
