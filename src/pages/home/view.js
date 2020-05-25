import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Event from '../../components/Event';

const Home = ({ initialState }) => {

    // Grab the state from a global variable injected into the server-generated HTML
  const { items } = initialState; // eslint-disable-line no-underscore-dangle

  console.log("dasd", initialState);

  //const meetups = useState(preloadedState.items);

  return (
    <>
        {
          items.items.map(
            event => <Event { ...event } />
          )
        }
    </>
  );
};


export default Home;