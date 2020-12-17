import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Header from './Header.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { AddingStory } from '../redux/actions/actions.js';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    borderRadius: 5,
    border: 0,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(45, 29, 32, .3)',
  }
}));


export default function Story() {
  const classes = useStyles();
  const history = useHistory();


  useEffect(() => {
    // on mount of component, invoking getCoords and saving lat and longitude to userStory state
    getCoords();
  }, []);


  // initial state will be an object where properties are keys of input and values are empty strings
  const [userStory, setUserStory] = useState({
    firstName: '',
    lastName: '',
    story: '',
    help: '',
    payment: '',
    lat: null,
    lng: null
  });

  // invoking dispatch to send to store and update state/send to db
  const dispatch = useDispatch();
  const addUser = (data) => dispatch(AddingStory(data));
  
  
  const onChangeInput = e => {
    // destructuring name and value from e.target
    const {name, value } = e.target;
    // replacing respective name of input with its respective value
    setUserStory({
      ...userStory, 
      [name]: value 
    })
  };

  // invoked on mount to get lat and longitude from browser
  const getCoords = () => {
    // getting geolocation from user
    navigator.geolocation.getCurrentPosition(
       (position) => {
         // position contains coordinates, destructuring lat and longitude from coords object
         const {latitude, longitude} = position.coords;
         // setting state of userstory with latitude and longitude from user browser
         // these coords are used to place markers from user stories on map
           setUserStory({
             ...userStory,
              lat: latitude,
              lng: longitude    
          });
         },
       () => null);
  }; 



  // handling click of submit button
  const handleSubmit = (e) => {
    e.preventDefault()
    // on submit, sending userStory data to reducer/db
    addUser(userStory);

    // refreshing userStory to empty
    setUserStory({
      firstName: '',
      lastName: '',
      story: '',
      help: '',
      payment: '',
      lat: null,
      lng: null
    });

    // returning user back to main page
    return history.push('/')
  }

  return (
    <React.Fragment>
      <Header />
      <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Tell us about you
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                value={userStory.firstName}
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={onChangeInput}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={userStory.lastName}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                id="Story"
                rows={6}
                label="What is your story?"
                name="story"
                value={userStory.story}
                onChange={onChangeInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  id="Help"
                  rows={4}
                  label="How can we help?"
                  name="help"
                  value={userStory.help}
                  onChange={onChangeInput}
                />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  id="Payment"
                  rows={2}
                  label="Do you have a Venmo or Paypal account?"
                  name="payment"
                  value={userStory.payment}
                  onChange={onChangeInput}
                />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
    </React.Fragment>
  );
}