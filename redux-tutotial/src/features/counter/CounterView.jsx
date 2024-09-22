import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment,decrement,reset,increaseByAmount } from "./counterSlice";

const CounterView = () => {
  // state theke value niye aslam
  const count = useSelector((state) => state.counter.count);
  //ekhane amra amader dispatch action ke dispatch korar jonno useDispatch hook er help nilam jekhane useDispatch amader actions guloke dispatch korbe ei je counterView ache tar modhee so etake amader ekta variable e store korte hobe
  const dispatch = useDispatch();

  return (
    <div>
      {/* value ke display korlam form slice */}
      <h2>count: {count}</h2>
      {/*ekhane amra amader action ke dispatch korlam */}
      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        Increment
      </button>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>
      <button
        onClick={() => {
          dispatch(reset());
        }}
      >
        Reset
      </button>
      <button
        onClick={() => {
          dispatch(increaseByAmount(4));
        }}
      >
        IncreaseByAmount
      </button>
    </div>
  );
};

export default CounterView;
