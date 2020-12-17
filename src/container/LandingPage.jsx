import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/Login.jsx';
import SignUp from '../components/SignUp.jsx';
import MainContainer from './MainContainer.jsx';
import Story from '../components/Story.jsx'
import Map from '../components/Map.jsx';

const LandingPage = () => {
  return (
    <div>hi</div>
    // <Router>
    //   <React.Fragment>
    //       <Switch>   
    //        <Route path="/login" exact component={Login} />
    //        <Route path="/signup" component={SignUp} />
    //        <Route exact path="/" component={MainContainer} />
    //        <Route path='/story' component={Story} exact/>
    //       </Switch>
    //     </React.Fragment>
    // </Router>

    // <React.Fragment>
    //   <Map />
    // </React.Fragment>

  );
}

export default LandingPage;
