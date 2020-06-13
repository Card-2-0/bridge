import React, { useState } from "react"
const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13]

export const TargetChoose = ({handleSubmit,op,trump}:any) => {
    const [option, setOption] = useState(0);
    if(op === 0)
    return(
        <div className="target-choose">
            <p className="target-trump-suit">The Trump Suit is {trump}</p>
            <h3 className="teams-heading">Target Choosing</h3>
            <select name="val" onChange={(e) => setOption(parseInt(e.target.value))}>
                {arr.map((val) => (
                <option key={val} value={val}>{val}</option>
                ))}
            </select>
            <button className="target-choose-button" onClick = {(e) => handleSubmit(option)}>Choose Option</button>
        </div>
    )
    else if(op === 1)
    return(
        <div className="target-choose">
            <p className="target-trump-suit">The Trump Suit is {trump}</p>
            <p className="target-choose-info">Please wait, while your team-mate chooses</p>
        </div>
    )
    else
    return(
        <div className="target-choose">
            <p className="target-trump-suit">The Trump Suit is {trump}</p>
            <p className="target-choose-info">Please wait, while the other team chooses their targets</p>
        </div>
    )
}