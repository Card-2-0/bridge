import React, { useState } from "react";

export const Trump = ({num, handleSubmit}:any) => {
  const [trumpSuit, setTrumpSuit] = useState("SPADES");
  const [trumpValue, setTrumpVal] = useState(String(num));
  let arr = [];
  for (let i=num; i < 14; i++) {
    arr.push(i.toString());
  }
  return (
    <div>
      <p>Trump</p>
      <select name="suit" onChange={(e) => setTrumpSuit(e.target.value)}>
        <option value="SPADES">SPADES</option>
        <option value="CLUBS">CLUBS</option>
        <option value="HEARTS">HEARTS</option>
        <option value="DIAMS">DIAMOND</option>
      </select>
      <select name="val" onChange={(e) => setTrumpVal(e.target.value)}>
        {arr.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <button onClick={(e) => {handleSubmit(trumpSuit, trumpValue, true)}}>Confirm Trump</button>
      <button onClick={(e) => {handleSubmit("",String(num-1),false)}}>Pass</button>
    </div>
  );
};
