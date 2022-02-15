import 'reflect-metadata';
import './index.css';
import './styles.scss';
import './locales/config';

import React from 'react';
import ReactDOM from 'react-dom';

import { configure } from 'mobx';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { App } from './containers/App';
import { IoCContainer, IoCProvider } from './ioc';
import { darkTheme } from './themes';

//import reportWebVitals from './reportWebVitals';

configure({
  enforceActions: 'never',
});

ReactDOM.render(
  <React.StrictMode>
    <IoCProvider container={IoCContainer}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </IoCProvider>
  </React.StrictMode>,
  document.querySelector('#root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
