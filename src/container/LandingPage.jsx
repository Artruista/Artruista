import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';


const LandingPage = () => {
  return (
    
    <Router>
      <React.Fragment>
          <Switch>
           <Route path="/" exact component={Login} />
           <Route path="/signup" component={SignUp} />
          </Switch>
        </React.Fragment>
    </Router>
  );
}

export default LandingPage;
