import React from "react"
import { Button } from "./Button"

export const Game = ({trump,target}:any) => {
    return(
        <div>
            <p>Trump Suit : {trump}</p>
            <p>Target Score for Team 1 : {target[0]}</p>
            <p>Target Score for Team 2 : {target[1]}</p>
        </div>
    )
}