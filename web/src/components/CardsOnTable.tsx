import React, { useEffect, useState } from "react";
const diams = <span className="suit">&diams;</span>;
const hearts = <span className="suit">&hearts;</span>;
const clubs = <span className="suit">&clubs;</span>;
const spades = <span className="suit">&spades;</span>;

const convert = ["J", "Q", "K", "A"];
export const CardsOnTable = ({ cards, users }: any) => {
  const [u1, setU1] = useState<any>(undefined);
  const [u2, setU2] = useState<any>(undefined);
  const [u3, setU3] = useState<any>(undefined);
  const [u4, setU4] = useState<any>(undefined);
  useEffect(() => {
    if (cards) {
      if (cards.length === 1) {
        setU1(undefined);
        setU2(undefined);
        setU3(undefined);
        setU4(undefined);
      }
      if (cards[cards.length - 1].id === 0) setU1(cards[cards.length - 1]);
      else if (cards[cards.length - 1].id === 1) setU2(cards[cards.length - 1]);
      else if (cards[cards.length - 1].id === 2) setU3(cards[cards.length - 1]);
      else if (cards[cards.length - 1].id === 3) setU4(cards[cards.length - 1]);
    }
  }, [cards]);
  return (
    <div className="table-cards">
      <h3>Cards on Table</h3>

      <div className="component playingCards fourColours rotateHand">
        <div className="grid-container">
          <div className="item1 t1">
            <h3>{users && users[0].name}</h3>
            <div className="card-on-table">
              {u1 ? (
                <a
                  className={`card rank-${
                    u1.value > 10
                      ? convert[parseInt(u1.value) - 11].toLowerCase()
                      : u1.value
                  } ${u1.suit.toLowerCase()}`}
                >
                  <span className="rank">
                    {u1.value > 10
                      ? convert[parseInt(u1.value) - 11]
                      : u1.value}
                  </span>
                  {u1.suit === "HEARTS" && hearts}
                  {u1.suit === "CLUBS" && clubs}
                  {u1.suit === "SPADES" && spades}
                  {u1.suit === "DIAMS" && diams}
                </a>
              ) : (
                <p>
                  <i className="fas fa-5x fa-question"></i>
                </p>
              )}
            </div>
          </div>
          <div className="item1 t2">
            <h3>{users && users[1].name}</h3>
            <div className="card-on-table">
              {u2 ? (
                <a
                  className={`card rank-${
                    u2.value > 10
                      ? convert[parseInt(u2.value) - 11].toLowerCase()
                      : u2.value
                  } ${u2.suit.toLowerCase()}`}
                >
                  <span className="rank">
                    {u2.value > 10
                      ? convert[parseInt(u2.value) - 11]
                      : u2.value}
                  </span>
                  {u2.suit === "HEARTS" && hearts}
                  {u2.suit === "CLUBS" && clubs}
                  {u2.suit === "SPADES" && spades}
                  {u2.suit === "DIAMS" && diams}
                </a>
              ) : (
                <p>
                  <i className="fas fa-5x fa-question"></i>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="grid-container">
          <div className="item1 t2">
            <h3>{users && users[3].name}</h3>
            <div className="card-on-table">
              {u4 ? (
                <a
                  className={`card rank-${
                    u4.value > 10
                      ? convert[parseInt(u4.value) - 11].toLowerCase()
                      : u4.value
                  } ${u4.suit.toLowerCase()}`}
                >
                  <span className="rank">
                    {u4.value > 10
                      ? convert[parseInt(u4.value) - 11]
                      : u4.value}
                  </span>
                  {u4.suit === "HEARTS" && hearts}
                  {u4.suit === "CLUBS" && clubs}
                  {u4.suit === "SPADES" && spades}
                  {u4.suit === "DIAMS" && diams}
                </a>
              ) : (
                <p>
                  <i className="fas fa-5x fa-question"></i>
                </p>
              )}
            </div>
          </div>
          <div className="item1 t1">
            <h3>{users && users[2].name}</h3>
            <div className="card-on-table">
              {u3 ? (
                <a
                  className={`card rank-${
                    u3.value > 10
                      ? convert[parseInt(u3.value) - 11].toLowerCase()
                      : u3.value
                  } ${u3.suit.toLowerCase()}`}
                >
                  <span className="rank">
                    {u3.value > 10
                      ? convert[parseInt(u3.value) - 11]
                      : u3.value}
                  </span>
                  {u3.suit === "HEARTS" && hearts}
                  {u3.suit === "CLUBS" && clubs}
                  {u3.suit === "SPADES" && spades}
                  {u3.suit === "DIAMS" && diams}
                </a>
              ) : (
                <p>
                  <i className="fas fa-5x fa-question"></i>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
