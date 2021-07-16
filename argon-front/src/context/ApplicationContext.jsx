import React from 'react';
import { LoggedContext, InfoMessageContext } from '../context';

function ApplicationContext({ logged, infoMessage, children }) {
  return (
    <InfoMessageContext.Provider value={infoMessage}>
      <LoggedContext.Provider value={logged}>
        {children}
      </LoggedContext.Provider>
    </InfoMessageContext.Provider>
  );
}

export default ApplicationContext;