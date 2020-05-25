import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Paper,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    margin: '5%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

const Event = props => {
  const { className, title, picture } = props;

  const classes = useStyles();

  return (
    <Paper className={clsx(classes.root, className)} elevation={3}>
      <Card>
        <CardHeader
          title={title}
          subheader="The information can be edited"
        />
        <Divider />
        <CardContent>
          <CardMedia
            className={classes.media}
            image={picture}
            title="Paella dish"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
          >
            Save details
            </Button>
        </CardActions>
      </Card>
    </Paper>
  );
};

Event.propTypes = {
  className: PropTypes.string
};

export default Event;
