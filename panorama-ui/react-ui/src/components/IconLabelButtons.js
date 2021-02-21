import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {API_BASE_URL} from '../constants/apiConstants';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const [selectedFile , setState] = useState(null)

  const fileSelectedHandler = (event) => {
    setState(event.target.files[0])
  };

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append('image',{selectedFile});
    axios.post(API_BASE_URL,fd)
    .then(res => {
      console.log(res)
    })
  }
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
      <input type = "file" onChange={fileSelectedHandler}/>
      <Button
        onClick = {fileUploadHandler}
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