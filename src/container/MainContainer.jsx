import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardsDetail from '../components/CardsDetail.jsx';

import Header from '../components/Header.jsx'
import Map from '../components/Map.jsx';
import { NavLink } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nav: {
    boxShadow: '0 1px 1px 1px rgba(45, 29, 32, .3)', 
    textDecoration: 'none',
    borderRadius: 5
  }
}));

const MainContainer = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
          <Header />
          <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7}>
              <Map />
            </Grid>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <div className={classes.paper}>
                <NavLink to="/story" activeClassName="selected" className={classes.nav}>
                  <Button variant="contained">Share your story</Button>
                </NavLink>
                <CardsDetail />
              </div>
            </Grid>
          </Grid>
    </React.Fragment>
  )
}

export default MainContainer
