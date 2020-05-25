// Import babel-polyfill because this file uses "async/await" words
import 'babel-polyfill';
import React from 'react';
import { Switch, Route } from 'react-router';
import queryString from 'query-string';

import MaterialProvider from '../theme';
import Layout from '../layout';

import Home from '../pages/Home/view';

import ProductApi from '../services/product/product';

/**
* loadData is a function that preloads needed data for server-side rendering,
* is called in handleRender.js -> Promise.all() when server is started up,
* and each component thats need required data to render must implement it!
*
* Important: Remember that loadData must return a Promise for resolve in Promise.all
*
* For more info see:
*  https://reacttraining.com/react-router/web/guides/server-rendering
*/
export const routes = [
  {
    path: '/home',
    exact: true,
    componentWithState: (initialState) => <Home initialState={initialState} />,
    loadData: () => {
      const query = "ipad";
      const data = ProductApi.search(query);

      const query2 = "focus";
      const data2 = ProductApi.search(query2);

      const results = [data, data2];

      return results;
    },
    mapToState: (results) => {
      const [ items, notifications ] = results;
      return { items, notifications };
    },

  },

];

// If specified path don't match with routes, render NotFound
export default function Router({ initialState }) {
  return (
    <MaterialProvider>
      <Switch>
        { 
          routes.map(
            route => 
              <Route key={route.path} {...route} render={ () =>
                <Layout>
                  { route.componentWithState(initialState) }
                </Layout>
              } />
          )
        }
        { /*<Route component={NotFound} />*/ }
      </Switch>
    </MaterialProvider>
  );
}
