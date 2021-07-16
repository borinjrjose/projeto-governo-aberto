import React, { useState } from 'react';

import { Container, Typography, Button, TextField, Grid, FormControlLabel, Checkbox, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useHistory } from 'react-router-dom';

import axios from 'axios';

import { API_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function doSignUp() {
    try {
      await axios({
        method: 'post',
        url: API_URL + '/cadastro',
        data: {
          email, senha, nome, sobrenome
        },
      });

      history.push('/signin');
    } catch(e) {
      console.log(e.response);
    }
  }

  return (
    <Container className={classes.content} maxWidth="xs">
      <Typography component="h2" variant="h5">
        Cadastre-se
      </Typography>
      <form 
        className={classes.form} 
        noValidate
        onSubmit={e => {
          e.preventDefault();
          doSignUp();
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Nome"
              autoFocus
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Sobrenome"
              name="lastName"
              autoComplete="lname"
              value={sobrenome}
              onChange={e => setSobrenome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Cadastrar
        </Button>
      </form>
    </Container>
  );
}

export default SignUp;
