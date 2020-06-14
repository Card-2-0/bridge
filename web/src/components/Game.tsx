import React from "react"
import { Button } from "./Button"

export const Game = ({trump,target,score}:any) => {
    return(
        <div>
            <p className="trump-suit-display">Trump Suit : {trump}</p>
            <div className="dash-topic">
                <h3>Score / Target</h3>
                <p className="dash-team-name">Team 1</p> 
                <p className="dash-team-score">{score[0]} / {target[0]}</p>
                <p className="dash-team-name">Team 2</p> 
                <p className="dash-team-score dash-end">{score[1]} / {target[1]}</p>
            </div>
        </div>
    )
}