import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { IncreaseCounter } from './redux/actions/actions';
import Login from './container/Login.jsx';
import Header from './components/Header.jsx';
import SignUp from './container/SignUp.jsx';
import Story from './components/Story.jsx';
import CardsDetail from './components/CardsDetail.jsx';
import { BrowserRouter as Router,Switch,  Route } from 'react-router-dom';
import MainContainer from './container/MainContainer.jsx'



export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const increaseCounter = () => dispatch(IncreaseCounter());

  const handleClick = () => {
    increaseCounter(); 
  };

  return (
    <div>
      <Header />
      <MainContainer />
    </div>
  )
}

