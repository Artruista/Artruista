import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { IncreaseCounter } from './redux/actions/actions';
import Login from './components/Login.jsx';
import Header from './components/Header.jsx';
import SignUp from './components/SignUp.jsx';
import Story from './components/Story.jsx';
import CardsDetail from './components/CardsDetail.jsx';
import { HashRouter as Router,Switch,  Route } from 'react-router-dom';
import MainContainer from './container/MainContainer.jsx'



export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const increaseCounter = () => dispatch(IncreaseCounter());



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
  )
}

