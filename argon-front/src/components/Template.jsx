import React, { useEffect, useState } from 'react';

import { AppBar, Toolbar, Typography, Button, Container, Snackbar, ThemeProvider, createMuiTheme, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

import { ApplicationContext } from '../context';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(5,0),
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Template({ children }) {
  const defaultTheme = useTheme();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: defaultTheme.palette.grey['700'],
        light: defaultTheme.palette.grey['500'],
      },
      secondary: defaultTheme.palette.teal,
    }
  });

  const classes = useStyles();

  const [logged, setLogged] = useState(false);
  const [infoMessage, setInfoMessage] = useState(null);

  useEffect(() => {
    const isLogged = JSON.parse(window.localStorage.getItem('logged'));

    setLogged(isLogged);
  }, [setLogged]);

  useEffect(() => {
    window.localStorage.setItem('logged', logged);
  }, [logged])

  return (
    <ThemeProvider theme={theme}>
      <ApplicationContext 
        logged={{ logged, setLogged }}
        infoMessage={{ infoMessage, setInfoMessage }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Argon
            </Typography>
            <Typography variant="h6">
              {logged ? (
                <>
                  <Link className={classes.link} to='/map'><Button color="inherit">Mapa de Calor</Button></Link>
                  <Link className={classes.link} to='/modalIdh'><Button color="inherit">Tabela de Calor por Idhm</Button></Link>
                  <Link className={classes.link} to='/glossary'><Button color="inherit">Glossário</Button></Link>
                  <Link className={classes.link} to='/charts'><Button color="inherit">Gráficos</Button></Link>
                  <Link className={classes.link} to='/modalUserInput'><Button color="inherit">Relate uma ocorrência</Button></Link>
                  <Link className={classes.link} to='/logout'><Button color="inherit">Sair</Button></Link>
                </>
              ) : (
                <>
                  <Link className={classes.link} to='/signin'><Button color="inherit">Login</Button></Link>
                  <Link className={classes.link} to='/signup'><Button color="inherit">Cadastre-se</Button></Link>
                </>
              )}
              </Typography>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          {children}
        </main>

        <Snackbar open={!!infoMessage} autoHideDuration={4000} onClose={() => setInfoMessage(null)}>
          <Alert 
            onClose={() => setInfoMessage(null)}
            severity="success"

          >
            {infoMessage}
          </Alert>
        </Snackbar>
      </ApplicationContext>
    </ThemeProvider>
  );
}
export default Template;
