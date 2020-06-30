import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
const img = require("../assets/title.jpg")

export const Login = () => {
    const [name, setName] = useState('')
    const [room, setRoom ] = useState('')
    const [space, setSpace] = useState(false)
    useEffect(() => {
        if(name.indexOf(' ') !== -1 || room.indexOf(' ') !== -1) setSpace(true)
        else setSpace(false)
    },[name, room])
    useEffect(() => {
    if( window.localStorage )
    {
        if( !localStorage.getItem('firstLoad') )
        {
        localStorage['firstLoad'] = true;
        window.location.reload();
        }
        else
        localStorage.removeItem('firstLoad');
    }
    },[])
    return (
        <div className="login-page">
        <div className="login">
            <div className="heading">
                <img src={img} width="150px"/>
                <h1 className="title">BRIDGE</h1>
            </div>
            <p className="instructions">Instructions : Enter your player name and the room name (if room already exists, you'll be joined in that or new one will be created). Share the room name with your friends and ask them join. Once four players join in a room, the game will start !!</p>
            <h1 className="login-title">&#10140;  LOGIN</h1>
            <div className="login-input-section">
            <i className="fas fa-2x fa-user fas-field"></i>
            <input
                className="login-input"
                type = 'text'
                placeholder = 'Enter Name'
                value = {name}
                onChange = { ({target}) => setName(target.value) }  /> 
            </div>
            {space && <p>Space not allowed in user or room name ! ! !</p>}
            <div className="login-input-section">
            <i className="fas fa-2x fa-key fas-field"></i>
            <input
                className="login-input"
                type = 'text'
                placeholder = "Enter Room"
                value = {room}
                onChange = { ({target}) => setRoom(target.value) } />
            </div>
            <div className="login-input-section">
            <i className="fas fa-2x fa-sign-in-alt fas-submit"></i>
            <Link 
                onClick={(e) => (!name || !room || (name.indexOf(" ") != -1) || (room.indexOf(" ") != -1)) ?
                                 e.preventDefault() :
                                 null} 
                to={`/game?name=${name}&room=${room}`}
                className = "login-submit"
            >Enter Room
            </Link>
            </div>
            <p className="login-rules">Click here for <a href="/rules" target="_blank">Rules {"&"} Instructions</a></p>
        </div>
        </div>
    )
}