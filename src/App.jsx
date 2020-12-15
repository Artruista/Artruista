import React from 'react';
import  { useSelector, useDispatch } from 'react-redux';
import { IncreaseCounter } from './redux/actions/actions';





export default function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);
  const increaseCounter = () => dispatch(IncreaseCounter());

  const handleClick = () => {
    increaseCounter(); 
  };

  

  return (
    <div>
      <h1>Hello </h1>
      <button onClick={handleClick}>hello: {counter}</button>
    </div>
  )
}
