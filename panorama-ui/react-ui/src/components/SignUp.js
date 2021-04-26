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
import Navbar from "../components/Navbar"

//process.env.gatewayServerIP = "http://gateway-service"
//process.env.gatewayServicePort = "3000"
// const baseURL = "http://149.165.171.5:30200"
const baseURL = "/api"
const api = axios.create({
  baseURL: baseURL + "/signup"
})


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignUp(props) {
  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    phonenumber: "",
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
  const sendDetailsToServer = () => {
    if (state.email.length && state.password.length) {
      const payload = {
        firstName: state.firstname,
        lastName: state.lastname,
        birthday: state.birthday,
        phonenumber: state.phonenumber,
        email: state.email,
        password: state.password,
      }

      // const baseURL = "http://gateway-service" + ":" + "3000"
      const baseURL = "/api"
      axios.post(baseURL + '/signup', payload, {headers:{origin:'http://149.165.157.30:30800'}})
        .then(function (response) {
          if (response.status === 201) {
            setState(prevState => ({
              ...prevState,
              'successMessage': 'Registration successful. Redirecting to home page..'
            }))
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToLogin();
            props.showError(null)
          } else {
            props.showError("Some error ocurred");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      props.showError('Please enter valid username and password');
    }

  }
  const redirectToHome = () => {
    props.updateTitle('Home')
    props.history.push('/home');
  }
  const redirectToLogin = () => {
    props.history.push('/SignIn');
  }
  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer()

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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="First Name"
                value={state.firstname}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastName"
                value={state.lastname}
                onChange={handleChange}
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="birthday"
                label="Birthday"
                name="birthday"
                value={state.birthday}
                onChange={handleChange}
                autoComplete="birthday"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="phonenumber"
                label="Phone Number"
                name="phonenumber"
                value={state.phonenumber}
                onChange={handleChange}
                autoComplete="phonenumber"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                value={state.email}
                onChange={handleChange}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={state.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I agree to terms and conditions of use"
              />
            </Grid>
          </Grid>
          <Button onClick={handleSubmitClick}
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/SignIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);