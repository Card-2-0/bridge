export type card = {
  suit: string;
  value: string;
};

export type user = {
  id: string;
  name: string;
  cards: card[];
  room: string;
};

export type room = {
  name: string;
  users: user[];
  trump: string;
  turn: number;
  passes: number;
  target: number[];
  tchoose: number;
  round: any[];
  suitofround: string,
  preStart: number,
  roundsDone:number,
  restart:number
};

export const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export const suits = ["HEARTS", "SPADES", "DIAMS", "CLUBS"];

export const shuffleCards = () => {
  let array: number[] = [];
  for (let i = 0; i < 52; ++i) array.push(i);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};
