import React, { useState } from "react";

export const UserCards = ({ cards, game }: any) => {
  const [suit, setSuit] = useState<string>("");
  const [val, setVal] = useState<string>("");
  const handleDispatch = () => {};
  return (
    <div className="playingCards fourColours rotateHand">
      <h3>Your Cards Are</h3>
      <ul className="table">
        {cards.map((card: any, i: any) => {
          const lowerValue = card.value.toLowerCase();
          const suitLower = card.suit.toLowerCase();
          // console.log(suitLower);
          return (
            <li
              key={i}
              value={`${card.suit} ${card.value}`}
              onClick={(e) => {
                console.log(e.currentTarget.value);
              }}
            >
              <a className={`card rank-${lowerValue} ${suitLower}`}>
                <span className="rank">{card.value}</span>
                <span className="suit">&diams;</span>
                {game && (
                  <input
                    type="checkbox"
                    name="c-10C"
                    id="c-10C"
                    value="select"
                  />
                )}
              </a>
            </li>
          );
        })}
        <button onClick={handleDispatch}>Dispatch Card</button>
      </ul>
    </div>
  );
};
