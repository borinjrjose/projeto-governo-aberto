/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-roboto';

import './index.css';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import {
  Template,
  ModalIdh,
  ModalUserInput,
} from './components';

import { 
  SignIn,
  SignUp,
  Logout,
  Glossary,
  SecurityCharts,
  HeatMap,
 } from './pages';

ReactDOM.render(
    <BrowserRouter>
      <Template>
        <Switch>
          <Route path="/map"><HeatMap /></Route>
          <Route path="/modalIdh"><ModalIdh /></Route>
          <Route path="/modalUserInput"><ModalUserInput /></Route>
          <Route path="/glossary"><Glossary /></Route>
          <Route path="/charts"><SecurityCharts /></Route>
          <Route path="/signin"><SignIn /></Route>
          <Route path="/signup"><SignUp /></Route>
          <Route path="/logout"><Logout /></Route>
        </Switch>
      </Template>
    </BrowserRouter>,
  document.getElementById('root'),
);
