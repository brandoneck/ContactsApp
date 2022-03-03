import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Navigation from './routes/Navigation';
// import Header from './pages/Header';
import { BrowserRouter } from 'react-router-dom';
import "./styles/design.css";


ReactDOM.render(
  <BrowserRouter class="background">
    {/* <h1>Playboy Test</h1> */}
    <Navigation />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
