import React, { useState } from "react";
export const Trump = () => {
  const [trumpSuit, setTrumpSuit] = useState("");
  const [trumpValue, setTrumpVal] = useState("");
  const [currentVal, setCurrentVal] = useState("5");
  let i: number = parseInt(currentVal);
  let arr = [];
  for (i; i < 13; i++) {
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
          <option value={val}>{val}</option>
        ))}
      </select>
      <button disabled={!trumpSuit || !trumpValue}>Confirm Trump</button>
      <button>Pass</button>
    </div>
  );
};
