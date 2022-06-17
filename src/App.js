import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import './scss/index.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LandingPage from './views/LandingPage';
import SearchPage from './views/SearchPage';
import ResultPage from './views/ResultPage';

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/search' component={SearchPage} />
          <Route exact path='/result' component={ResultPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

