import React from "react"
const diams = <span className="suit">&diams;</span>;
const hearts = <span className="suit">&hearts;</span>;
const clubs = <span className="suit">&clubs;</span>;
const spades = <span className="suit">&spades;</span>;

export const CardsOnTable = ({cards, users}:any) => {
    return(
        <div>
        <h3>Cards on Table:</h3>
        <div className="playingCards fourColours rotateHand">
            <ul className="table">
                {cards.map((card: any, i: any) => {
                if(card.value === '14') card.value = 'A'
                if(card.value === '13') card.value = 'K'
                if(card.value === '12') card.value = 'Q'
                if(card.value === '11') card.value = 'J'
                const lowerValue = card.value.toLowerCase();
                const suitLower = card.suit.toLowerCase();
                return (
                    <li key={i} value={`${card.suit} ${card.value}`}>
                    <a className={`card rank-${lowerValue} ${suitLower}`}>
                        <span className="rank">{card.value}</span>
                        {suitLower === "hearts" && hearts}
                        {suitLower === "clubs" && clubs}
                        {suitLower === "spades" && spades} 
                        {suitLower === "diams" && diams}
                    </a>
                    </li>
                );
                })}
            </ul>
            {<ol>
            {cards.map((card:any,i:number) => <li key={i}>{card.suit}, {card.value} from {users && users[card.id].name}</li>)}
            </ol> }
        </div>
    </div>
    )
}