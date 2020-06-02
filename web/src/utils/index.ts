export interface Card {
  value: string | null | undefined;
  suit: string | null | undefined;
}
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
export const suits = ["hearts", "spades", "diams", "clubs"];
export const cards: Card[] = [];
suits.map((suit: any, i: any) => {
  values.map((val: string, j: any) => {
    cards[13 * i + j] = {
      value: val,
      suit,
    };
    return val;
  });
  return suit;
});
