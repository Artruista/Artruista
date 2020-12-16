import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { IncreaseCounter } from './redux/actions/actions';
import Login from './components/Login.jsx/index.js';
import Header from './components/Header.jsx';
import SignUp from './components/SignUp.jsx/index.js';




export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const increaseCounter = () => dispatch(IncreaseCounter());



  return (
    <div>
      <Header />
      <Login />
      {/* <SignUp /> */}
    </div>
  )
}
