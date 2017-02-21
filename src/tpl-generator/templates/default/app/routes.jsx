import React from 'react';
import App from './components/app/app.jsx';
import { Router, Route, browserHistory } from 'react-router';

export default (
    <Router history={browserHistory}>
      <Route path="*" component={App} />
    </Router>
);
