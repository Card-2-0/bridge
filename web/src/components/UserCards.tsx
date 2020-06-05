import React, { useState } from "react";

export const UserCards = ({ cards, game, handleDispatch }: any) => {
  const [suit, setSuit] = useState<string>("");
  const [val, setVal] = useState<string>("");

  return (
    <div className="playingCards fourColours rotateHand">
      <h3>Your Cards Are</h3>
      <ul className="table">
        {cards.map((card: any, i: any) => {
          const lowerValue = card.value.toLowerCase();
          const suitLower = card.suit.toLowerCase();
          // console.log(suitLower);
          return (
            <li key={i} value={`${card.suit} ${card.value}`}>
              <a className={`card rank-${lowerValue} ${suitLower}`}>
                <span className="rank">{card.value}</span>
                <span className="suit">&diams;</span>
                {game && (
                  <input
                    type="radio"
                    name="c-10C"
                    id="c-10C"
                    value="select"
                    onClick={(e) => {
                      setVal(card.value);
                      setSuit(card.suit);
                    }}
                  />
                )}
              </a>
            </li>
          );
        })}
        <button
          onClick={() => handleDispatch(val, suit)}
          disabled={!val && !suit}
        >
          Dispatch Card
        </button>
      </ul>
    </div>
  );
};
