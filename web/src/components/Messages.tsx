import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Trump } from "./Trump";
import { UserCards } from "./UserCards"
import { Game } from "./Game";
import { TargetChoose } from "./TargetChoose";

const ENDPOINT = "http://localhost:8080/";
let socket: any;
let tmp:any = null;
const arr = [1,2,3,4,5,6,7,8,9,10,11,12]

export const Messages = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersinfo, setUsersInfo] = useState(tmp)
  const [id, setId] = useState(-1);
  const [cards, setCards] = useState([{ suit: "", value: "" }]);
  const [trumpChoose, setTrumpChoose] = useState(false);
  const [trump, setTrump] = useState("");
  const [num, setNum] = useState(0)
  const [game, setGame] = useState(false)
  const [target, setTarget] = useState([-1,-1])
  const [targetChoose, setTargetChoose] = useState(-1)

  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, room }: any = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
    socket.emit("join", name, room, (error: any) => {
      console.log(error);
      alert(error);
      window.location.pathname = "/";
    });
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("cards", (dcards: any, id: number, roomusers:any) => {
      setCards(dcards);
      setId(id);
      setUsersInfo(roomusers);
    });
    socket.on("trumpTurn", (playerid:number, trumpsuit:string, trumpvalue:string) => {
      if(playerid === id) setTrumpChoose(true)
      else setTrumpChoose(false)
      setTrump(trumpsuit)
      setNum(parseInt(trumpvalue)+1)
    })
    socket.on("trumpDone", (finalTrump:string, targets:number[]) =>{
      setTrump(finalTrump)
      setTrumpChoose(false)
      setTarget(targets)
    })
    socket.on("targetChoose", (t:number) => {
      if(t === id%2) { setTargetChoose(0) }
      else setTargetChoose(2)
    })
    socket.on('targetSelectDone', (targets:number[]) => {
      setTarget(targets)
      setGame(true)
      setTargetChoose(-1)
    })
  });

  const onTrump = (trumpSuit:string , trumpValue:string , pass:boolean) => {
    console.log(trumpValue, trumpSuit, pass)
    socket.emit('trumpPlay',trumpValue, trumpSuit, pass,room,id)
  }

  const onChoose = (tar:number) => {
    console.log(tar)
    setTargetChoose(1)
    socket.emit('targetSelect', id, tar, room)
  }
  return (
    <div>
      <h1>Hi {name ? name : "There"}</h1>
      {id != -1 && <p>You are Player no. {id + 1}</p>}
      {usersinfo && 
        <div>
          <h4>Teams in Room</h4>
          <p>Team 1 : {usersinfo[0].name} (Player 1) and {usersinfo[2].name} (Player 3)</p>
          <p>Team 2 : {usersinfo[1].name} (Player 2) and {usersinfo[3].name} (Player 4)</p>
        </div>}
      {cards.length > 1 && <UserCards cards = {cards} /> }
      {trumpChoose && <Trump num={num} handleSubmit={onTrump} trump={trump} />}
      { (targetChoose === -1 && !game && trump) && <p>Current Trump : {trump}</p>}
      {targetChoose !== -1 &&  <TargetChoose handleSubmit={onChoose} op={targetChoose} trump={trump} /> }
      {game && <Game trump = {trump} target={target}/>}
    </div>
  );
};
