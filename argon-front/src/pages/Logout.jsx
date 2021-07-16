import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { InfoMessageContext, LoggedContext } from '../context';

function Logout() {
  const history = useHistory();
  const { setLogged } = useContext(LoggedContext);
  const { setInfoMessage } = useContext(InfoMessageContext);

  useEffect(() => {
    setLogged(false);
    history.push('/');
    setInfoMessage('Sesão encerrada com sucesso')
  });

  return (
    <>
    </>
  );
}

export default Logout;