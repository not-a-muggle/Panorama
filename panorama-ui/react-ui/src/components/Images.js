
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconLabelButtons from './IconLabelButtons';
import './components.css'

import ImageList from './ImageList.js'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    // width: `calc(100% - ${drawerWidth}px)`,
    width: '100%',
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.error.dark,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function PermanentDrawerLeft() {
  const classes = useStyles();
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="red" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            PANORAMA
          </Typography>
          <IconLabelButtons selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
        </Toolbar>
      </AppBar>
      <ImageList selectedRows={selectedRows} setSelectedRows={setSelectedRows} />

    </div>
  );
}