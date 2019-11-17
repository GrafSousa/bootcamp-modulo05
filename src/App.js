import React from 'react';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Routes from './routes';
import GlobalStyle from './styles/global';
import { alertOptions } from './config/alertConfig';

function App() {
  return (
    <>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Routes />
        <GlobalStyle />
      </AlertProvider>
    </>
  );
}

export default App;
