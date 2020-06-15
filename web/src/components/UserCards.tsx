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
    <div className="user-cards playingCards fourColours rotateHand">
      {game ? (
        <h3 className='your-turn'>Its Your Turn. Pick a Highlighted Card</h3>
      ) : (
        <h3 className="wait-please">Please wait for your turn ...</h3>
      )}
      <div className="grid">
        {cards.map((card: any, i: any) => {
          const lowerValue = card.value.toLowerCase();
          const suitLower = card.suit.toLowerCase();
          return (
            <div className="item" key={i}>
              {card.value === val && card.suit === suit ? (
                <a
                  onClick={() => {
                    if (game && (anyCard || card.suit === roundSuit)) {
                      setVal(card.value);
                      setSuit(card.suit);
                    }
                  }}
                  className={
                    !anyCard
                      ? roundSuit === card.suit
                        ? `card rank-${lowerValue} ${suitLower} available`
                        : `card rank-${lowerValue} ${suitLower}`
                      : `card rank-${lowerValue} ${suitLower} available`
                  }
                  style={{ marginTop: "-1.2rem" }}
                >
                  <span className="rank">{card.value}</span>
                  {suitLower === "hearts" && hearts}
                  {suitLower === "clubs" && clubs}
                  {suitLower === "spades" && spades}
                  {suitLower === "diams" && diams}
                </a>
              ) : (
                <a
                  onClick={() => {
                    if (game && (anyCard || card.suit === roundSuit)) {
                      setVal(card.value);
                      setSuit(card.suit);
                    }
                  }}
                  className={
                    !anyCard
                      ? roundSuit === card.suit
                        ? `card rank-${lowerValue} ${suitLower} available`
                        : `card rank-${lowerValue} ${suitLower}`
                      : `card rank-${lowerValue} ${suitLower} available`
                  }
                >
                  <span className="rank">{card.value}</span>
                  {suitLower === "hearts" && hearts}
                  {suitLower === "clubs" && clubs}
                  {suitLower === "spades" && spades}
                  {suitLower === "diams" && diams}
                </a>
              )}
            </div>
          );
        })}
      </div>
      <div hidden={!game}>
        <button
          onClick={() => {
            handleDispatch(val, suit);
            setSuit("");
            setVal("");
          }}
          disabled={!val && !suit}
          className="dispatch-button"
        >
          Dispatch Card
        </button>
      </div>
    </div>
  );
};
