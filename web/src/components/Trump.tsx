import React, { useState } from "react";
const suitSymbol = new Map()
suitSymbol.set("SPADES","&spades;")
suitSymbol.set("DIAMS","&diams;")
suitSymbol.set("CLUBS","&clubs;")
suitSymbol.set("HEARTS","&hearts;")

export const Trump = ({num, handleSubmit}:any) => {
  const [trumpSuit, setTrumpSuit] = useState("SPADES");
  const [trumpValue, setTrumpVal] = useState(String(num));
  let arr = [];
  for (let i=num; i < 14; i++) {
    arr.push(i.toString());
  }
  return (
    <div className="trump-select">
      <div className="teams-heading"><h3>Trump</h3></div>
      <select className="trump-suit-option" name="suit" onChange={(e) => setTrumpSuit(e.target.value)}>
        <option value="SPADES">SPADES &spades;</option>
        <option value="CLUBS">CLUBS &clubs;</option>
        <option value="HEARTS">HEARTS &hearts;</option>
        <option value="DIAMS">DIAMOND &diams;</option>
      </select>
      <select name="val" onChange={(e) => setTrumpVal(e.target.value)}>
        {arr.map((val) => (
          <option key={val} value={val}>{val}</option>
        ))}
      </select>
      <button className = "trump-button trump-confirm" onClick={(e) => {handleSubmit(trumpSuit, trumpValue, true)}}>Confirm Trump</button>
      <button className = "trump-button trump-pass" onClick={(e) => {handleSubmit("",String(num-1),false)}}>Pass</button>
    </div>
  );
};
