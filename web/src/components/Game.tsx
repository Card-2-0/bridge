import React from "react"
import { Button } from "./Button"

export const Game = ({trump,target,score}:any) => {
    return(
        <div>
            <p>Trump Suit : {trump}</p>
            <h3>Targets for teams :</h3>
            <p>Team 1 : {target[0]} , Team 2 : {target[1]}</p>
            <h3>Scores of Teams :</h3>
            <p>Team 1 : {score[0]} , Team 2 : {score[1]}</p>
        </div>
    )
}