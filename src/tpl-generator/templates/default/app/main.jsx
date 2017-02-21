import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory } from 'history';
import { RouterContext, match } from 'react-router';
import routes from './routes.jsx';
import '../assets/scss/main.scss';

// Exported static site renderer:
export default function render(locals, callback) {
  const history = createMemoryHistory();
  const location = history.createLocation(locals.path);
  match({ routes, location }, (err, redirectLocation, renderProps) => {
    callback(null, ReactDOMServer.renderToString(<RouterContext {...renderProps} />));
  });
}
