import React, { useEffect } from "react";

const calculateVal = (val: string) => {
  if (val === "A") return "14";
  else if (val === "J") return "11";
  else if (val === "Q") return "12";
  else if (val === "K") return "13";
  else return val;
};

export const Winner = ({ cards, trump }: any) => {
  let higgest: any = null;
  cards.map((c: any) => {
    c.value = calculateVal(c.value);
    return c;
  });
  const trumpPlays = cards.filter((c: any) => c.suit === trump);
  const suitPlays = cards.filter((c: any) => c.suit === cards[0].suit);

  if (trumpPlays.length !== 0) {
    trumpPlays.sort((a: any, b: any) => parseInt(b.value) - parseInt(a.value));
    higgest = trumpPlays[0];
  } else {
    suitPlays.sort((a: any, b: any) => parseInt(b.value) - parseInt(a.value));
    higgest = suitPlays[0];
  }
  console.log(higgest);
  return (
    <div>{higgest && <p>Winner is player {higgest.id + 1} from client</p>}</div>
  );
};
