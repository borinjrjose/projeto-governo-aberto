import React from 'react';

export const LoggedContext = React.createContext({
  logged: false,
  setLogged: () => {},
});

export const InfoMessageContext = React.createContext({
  infoMessage: null,
  setInfoMessage: () => {},
});

export { default as ApplicationContext } from './ApplicationContext';