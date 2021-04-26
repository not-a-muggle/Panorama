import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../constants/apiConstants';
import { withRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        Panorama
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn(props) {
  const [state, setState] = useState({
    email: "",
    password: "",
    successMessage: null
  })
  const handleChange = (e) => {
    const { id, value } = e.target
    setState(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    var basicAuth = 'Basic ' + new Buffer(state.email + ':' + state.password).toString('base64');
    // const baseURL = process.env.gatewayServerIP + ":" + process.env.gatewayServicePort || 'http://localhost:3000'
    // const baseURL = "http://149.165.171.5:30200"
    const baseURL = "/api"
    axios.post(baseURL + '/signin', {}, {
      headers: { 'Authorization': basicAuth }
    })
      .then(function (response) {
        if (response.status === 200) {
          setState(prevState => ({
            ...prevState,
            'successMessage': 'Login successful. Redirecting to home page..'
          }))
          localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
          localStorage.setItem("username", response.data.username);
          console.log(`username set to ${response.data.username}`)

          redirectToImages();

        }
        else if (response.code === 204) {
          props.showError("Username and password do not match");
        }
        else {
          props.showError("Username does not exists");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const redirectToImages = () => {
    props.history.push('/Images');
  }


  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Navbar />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={state.email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
            value={state.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button onClick={handleSubmitClick}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/ForgotPassword">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/SignUp">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignIn);