import React from 'react';
import { ThemeProvider } from '@material-ui/styles';

import theme from './theme';

const MaterialProvider = (props) =>
    <ThemeProvider theme={theme}>
      { props.children }
    </ThemeProvider>;

export default MaterialProvider;