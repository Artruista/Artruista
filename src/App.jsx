import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { IncreaseCounter } from './redux/actions/actions';
import Login from './container/Login.jsx';
import Header from './components/Header.jsx';
import SignUp from './container/SignUp.jsx';




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
      <Login />
      {/* <SignUp /> */}
    </div>
  )
}
