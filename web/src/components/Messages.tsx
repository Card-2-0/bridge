import React, { useEffect, useState } from "react"
import queryString from "query-string"
import io from "socket.io-client"
import { Game } from "./Game";
const ENDPOINT = "http://localhost:8080/"
let socket:any;

export const Messages = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [id, setId] = useState(-1)
    const [cards, setCards] = useState([{suit:"",value:""}])

    useEffect(() => {
        socket = io(ENDPOINT)
        const { name, room }:any = queryString.parse(window.location.search);
        setName(name); setRoom(room)
        socket.emit('join', name, room, (error:any) => {
            console.log(error)
            alert(error)
            window.location.pathname = '/'
        })
    },[ENDPOINT])

    useEffect(() => {
        socket.on('cards', (dcards:any, id:number) => {
            setCards(dcards);
            setId(id);
        })
    })

    return(
        <div>
            <h1>Hi There</h1>
            {id != -1 && <p>You are Player no. {id+1}</p>}
            {cards.length > 1 && <ul>{cards.map((card) => <li>Suit:{card.suit} Value:{card.value}</li> )}</ul>}
        </div>
    )
}