import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {API_BASE_URL} from '../constants/apiConstants';
import axios from 'axios';
import Cookies from 'universal-cookie'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons() {
  const [selectedFile , setState] = useState({username : "",files : [], fileNames: []})

  const fileSelectedHandler = async (event) => {
    const file = event.target.files
    const cookies = new Cookies();
    const name = cookies.get('username');
    console.log(name);
    const base64 = []
    const fileImageNames = []
    for(const eachFile of file) {
      base64.push(await convertBase64(eachFile))
      fileImageNames.push(eachFile.name)
    }
    const stateObject = {
      username: name,
      files: base64,
      fileNames: fileImageNames 
    }
    console.log(stateObject)
    setState(prevState => ({
      ...prevState,
      username:name,
      files: base64,
      fileNames: fileImageNames
  }))
    console.log(selectedFile)
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

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
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
      >
        Download
      </Button>
      <Button
        onClick = {fileUploadHandler}
        variant="contained"
        color="default"
        className={classes.button}
      >
        Upload
      </Button>
      <input type = "file" multiple onChange={fileSelectedHandler}/>
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