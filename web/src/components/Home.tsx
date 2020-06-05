import React, { useState } from "react";
import { cards, Card } from "../utils";
import { Trump } from "./Trump";
export const Home = () => {
  function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(cards);
  const [Hand1, setHand1] = useState<Card[]>([]);
  const [Hand2, setHand2] = useState<Card[]>([]);
  const [Hand3, setHand3] = useState<Card[]>([]);
  const [Hand4, setHand4] = useState<Card[]>([]);
  const [num, setNum] = useState(0);
  let hand1: Card[] = [];
  let hand2: Card[] = [];
  let hand3: Card[] = [];
  let hand4: Card[] = [];
  cards.map((card: any, i: any) => {
    if (i < 13) hand1.push(card);
    else if (i >= 13 && i < 26) hand2.push(card);
    else if (i >= 26 && i < 39) hand3.push(card);
    else hand4.push(card);
    return card;
  });
  if (hand1.length === 13 && num === 0) {
    setHand1(hand1);
    setNum(1);
  }
  if (hand2.length === 13 && num === 1) {
    setHand2(hand2);
    setNum(2);
  }
  if (hand3.length === 13 && num === 2) {
    setHand3(hand3);
    setNum(3);
  }
  if (hand4.length === 13 && num === 3) {
    setHand4(hand4);
    setNum(4);
  }

  const diams = <span className="suit">&diams;</span>;
  const hearts = <span className="suit">&hearts;</span>;
  const clubs = <span className="suit">&clubs;</span>;
  const spades = <span className="suit">&spades;</span>;
  const deck = Array(10);
  deck.fill(1, 1);
  //   const handleClick = (hand: Card[] , i: any) => {
  //     hand = hand.splice(i, 1);
  //   }
  return (
    <div className="playingCards fourColours faceImages simpleCards inText rotateHand">
      <br />
      <ul className="deck">
        {deck.map((_, i: any) => (
          <li key={i}>
            <div className="card back">*</div>
          </li>
        ))}
      </ul>
      <ul className="hand">
        {Hand1 &&
          Hand1.map((card: Card, i: any) => {
            const lower = card.value?.toLowerCase();
            return (
              <li
                key={i}
                onClick={() => {
                  var array = [...Hand1]; // make a separate copy of the array
                  var index = i;
                  if (index !== -1) {
                    array.splice(index, 1);
                    setHand1(array);
                  }
                }}
              >
                <a className={`card rank-${lower} ${card.suit}`}>
                  <span className="rank">{card.value}</span>
                  {card.suit === "hearts" && hearts}
                  {card.suit === "clubs" && clubs}
                  {card.suit === "spades" && spades}
                  {card.suit === "diams" && diams}
                </a>
              </li>
            );
          })}
      </ul>
      <ul className="hand">
        {Hand2.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li
              key={i}
              onClick={() => {
                var array = [...Hand2]; // make a separate copy of the array
                var index = i;
                if (index !== -1) {
                  array.splice(index, 1);
                  setHand2(array);
                }
              }}
            >
              <a className={`card rank-${lower} ${card.suit}`}>
                <span className="rank">{card.value}</span>
                {card.suit === "hearts" && hearts}
                {card.suit === "clubs" && clubs}
                {card.suit === "spades" && spades}
                {card.suit === "diams" && diams}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="hand">
        {Hand3.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li
              key={i}
              onClick={() => {
                var array = [...Hand3]; // make a separate copy of the array
                var index = i;
                if (index !== -1) {
                  array.splice(index, 1);
                  setHand3(array);
                }
              }}
            >
              <a className={`card rank-${lower} ${card.suit}`}>
                <span className="rank">{card.value}</span>
                {card.suit === "hearts" && hearts}
                {card.suit === "clubs" && clubs}
                {card.suit === "spades" && spades}
                {card.suit === "diams" && diams}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className="hand">
        {Hand4.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li
              key={i}
              onClick={() => {
                var array = [...Hand4]; // make a separate copy of the array
                var index = i;
                if (index !== -1) {
                  array.splice(index, 1);
                  setHand4(array);
                }
              }}
            >
              <a className={`card rank-${lower} ${card.suit}`}>
                <span className="rank">{card.value}</span>
                {card.suit === "hearts" && hearts}
                {card.suit === "clubs" && clubs}
                {card.suit === "spades" && spades}
                {card.suit === "diams" && diams}
              </a>
            </li>
          );
        })}
      </ul>
      <Trump num={1}/>
    </div>
  );
};
