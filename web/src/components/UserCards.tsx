import React, { useState, useEffect } from "react";
const diams = <span className="suit">&diams;</span>;
const hearts = <span className="suit">&hearts;</span>;
const clubs = <span className="suit">&clubs;</span>;
const spades = <span className="suit">&spades;</span>;

export const UserCards = ({ cards, game, handleDispatch, roundSuit }: any) => {
  const [suit, setSuit] = useState<string>("");
  const [val, setVal] = useState<string>("");
  const [anyCard, setAnyCard] = useState(true);
  useEffect(() => {
    if (roundSuit === "any") setAnyCard(true);
    else if (cards.findIndex((card: any) => card.suit === roundSuit) === -1)
      setAnyCard(true);
    else setAnyCard(false);
  });
  return (
    <div className="playingCards fourColours rotateHand">
      <h3>Your Cards Are</h3>
      {game ? (
        <h4>Its Your Turn. Pick a card or a Highlighted Card</h4>
      ) : (
        <h4>Please wait for your turn...</h4>
      )}
      <ul className="table">
        {cards.map((card: any, i: any) => {
          const lowerValue = card.value.toLowerCase();
          const suitLower = card.suit.toLowerCase();
          return card.value === val && card.suit === suit ? (
            <li
              key={i}
              value={`${card.suit} ${card.value}`}
              onClick={() => {
                if (game && (anyCard || card.suit === roundSuit)) {
                  setVal(card.value);
                  setSuit(card.suit);
                }
              }}
            >
              <a
                className={
                  card.suit === roundSuit
                    ? `card rank-${lowerValue} ${suitLower} available`
                    : `card rank-${lowerValue} ${suitLower}`
                }
                style={{ marginTop: "-1rem" }}
              >
                <span className="rank">{card.value}</span>
                {suitLower === "hearts" && hearts}
                {suitLower === "clubs" && clubs}
                {suitLower === "spades" && spades}
                {suitLower === "diams" && diams}
              </a>
            </li>
          ) : (
            <li
              key={i}
              value={`${card.suit} ${card.value}`}
              onClick={() => {
                if (game && (anyCard || card.suit === roundSuit)) {
                  setVal(card.value);
                  setSuit(card.suit);
                }
              }}
            >
              <a
                className={
                  card.suit === roundSuit
                    ? `card rank-${lowerValue} ${suitLower} available`
                    : `card rank-${lowerValue} ${suitLower}`
                }
              >
                <span className="rank">{card.value}</span>
                {suitLower === "hearts" && hearts}
                {suitLower === "clubs" && clubs}
                {suitLower === "spades" && spades}
                {suitLower === "diams" && diams}
              </a>
            </li>
          );
        })}
        <div hidden={!game}>
          <button
            onClick={() => {
              handleDispatch(val, suit);
              setSuit("");
              setVal("");
            }}
            disabled={!val && !suit}
          >
            Dispatch Card
          </button>
        </div>
      </ul>
    </div>
  );
};
