import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import MainContainer from './MainContainer.jsx';
import Story from '../components/Story.jsx'

const LandingPage = () => {
  return (
    
    <Router>
      <React.Fragment>
          <Switch>   
           <Route path="/login" exact component={Login} />
           <Route path="/signup" component={SignUp} />
           <Route exact path="/" component={MainContainer} />
           <Route path='/story' component={Story} exact/>
          </Switch>
        </React.Fragment>
    </Router>
  );
}

export default LandingPage;
