import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const classes = useStyles();

  return (
    <div className = "buttons">
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Share
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
      >
        Upload
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Download
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
      >
        Accounts
      </Button>
    </div>
  );
}