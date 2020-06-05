import React from "react"

export const UserCards = ({cards}:any) => {
    return(
        <div className="playingCards fourColours rotateHand">
            <h3>Your Cards Are</h3>
            <ul className="table">
            {cards.map((card:any) => {
                const lowerValue = card.value.toLowerCase();
                const suitLower = card.suit.toLowerCase();
                // console.log(suitLower);
                return (
                <li>
                    <a className={`card rank-${lowerValue} ${suitLower}`}>
                    <span className="rank">{card.value}</span>
                    <span className="suit">&diams;</span>
                    </a>
                </li>
                );
            })}
            </ul>
        </div>
    )
}