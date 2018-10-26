import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Home from './components/Home';
import QuestionAnswer from './components/QuestionAnswer';
import QuestionResults from './components/QuestionResults';
import Header from './components/Header/Header';

import './components/style.css';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={QuestionAnswer} />
        <Route path="/:id/results" component={QuestionResults} />
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
