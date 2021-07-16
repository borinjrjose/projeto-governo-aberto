import React, { useContext, useState } from 'react';

import { Container, Typography, Button, TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

import { API_URL } from '../constants';
import { LoggedContext } from '../context';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const { setLogged } = useContext(LoggedContext);

  async function doLogin() {
    try {
      await axios({
        method: 'post',
        url: API_URL + '/login',
        data: {
          email, senha,
        },
      });

      setLogged(true);
      history.push('/map');
    } catch(e) {
      console.log(e.response);
    }
  }

  return (
    <Container className={classes.content} maxWidth="xs">
      <Typography component="h2" variant="h5">
        Login
      </Typography>

      <form
        className={classes.form}
        noValidate
        onSubmit={e => {
          e.preventDefault();
          doLogin();
        }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="E-mail"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type="password"
          id="password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
        <Link href="#" variant="body2">
          Esqueci minha senha
        </Link>
      </form>
    </Container>
  );
}

export default SignIn;
