import React from 'react';
import { matchPath } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import Router, { routes } from '../universal/routes';
import renderFullPage from './renderFullPage';

export default function handleRender(req, res) {

  const promisesForSSR = [];

  // Use `some` to imitate `<Switch>` behavior of selecting only the first to match
  const matchedRoute = routes.find(route => matchPath(req.path, route));

  if (matchedRoute && matchedRoute.loadData) promisesForSSR.push(...matchedRoute.loadData());

  return Promise.all(promisesForSSR).then(
    (response) => {
      const props = matchedRoute.mapToState(response);
          
      const html = renderToString(
          <StaticRouter location={req.url}>
            <Router initialState={ props } />
          </StaticRouter>
      );

      // Send a code based on whether the route matched or was not found
      return res
        .status(matchedRoute && matchedRoute.isExact ? 200 : 404)
        .send(renderFullPage(html, props));
    }
  );
}
