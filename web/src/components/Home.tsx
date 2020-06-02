import React from "react";
import { cards, Card } from "../utils";
export const Home = () => {
  function shuffle(array: any) {
    array.sort(() => Math.random() - 0.5);
  }
  shuffle(cards);
  let hand1: Card[] = [];
  let hand2: Card[] = [];
  let hand3: Card[] = [];
  let hand4: Card[] = [];
  cards.map((card: any, i: any) => {
    if (i < 13) hand1.push(card);
    else if (i >= 13 && i < 26) hand2.push(card);
    else if (i >= 26 && i < 39) hand3.push(card);
    else hand4.push(card);
  });
  console.log(cards, hand1, hand2, hand3, hand4);
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
        {hand1.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li key={i}>
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
        {hand2.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li key={i}>
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
        {hand3.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li key={i}>
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
        {hand4.map((card: Card, i: any) => {
          const lower = card.value?.toLowerCase();
          return (
            <li key={i}>
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
    </div>
  );
};
