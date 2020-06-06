import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Trump } from "./Trump";
import { UserCards } from "./UserCards";
import { Game } from "./Game";
import { TargetChoose } from "./TargetChoose";
import { UserLeft } from "./UserLeft";

const ENDPOINT = "http://localhost:8080/";
let socket: any;
let tmp: any = null;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Messages = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersinfo, setUsersInfo] = useState(tmp);
  const [id, setId] = useState(-1);
  const [cards, setCards] = useState<{suit:string,value:string}[]>([]);
  const [trumpChoose, setTrumpChoose] = useState(false);
  const [trump, setTrump] = useState("");
  const [num, setNum] = useState(0);
  const [game, setGame] = useState(false);
  const [target, setTarget] = useState([-1, -1]);
  const [targetChoose, setTargetChoose] = useState(-1);
  const [trumpPlayer, setTrumpPlayer] = useState(-1);
  const [roundTurn, setRoundTurn] = useState(false)
  const [cardsOnRound, setCardsOnRound] = useState<any[]>([])
  const [Roundmessage, setRoundMessage] = useState("")
  const [roundSuit, setRoundSuit] = useState("any")
  const [userLeft, setUserLeft] = useState(false)
  
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
    socket.on("cards", (dcards: any, id: number, roomusers: any) => {
      setCards(dcards);
      setId(id);
      setUsersInfo(roomusers);
    });
    socket.on(
      "trumpTurn",
      (playerid: number, trumpsuit: string, trumpvalue: string, pid: any) => {
        if (playerid === id) setTrumpChoose(true);
        else setTrumpChoose(false);
        setTrump(trumpsuit);
        setNum(parseInt(trumpvalue) + 1);
        if (pid !== undefined) setTrumpPlayer(parseInt(pid) + 1);
      }
    );
    socket.on("trumpDone", (finalTrump: string, targets: number[], pid:number) => {
      setTrump(finalTrump);
      setTrumpPlayer(pid+1)
      setTrumpChoose(false);
      setTarget(targets);
    });
    socket.on("targetChoose", (t: number) => {
      if (t === id % 2) {
        setTargetChoose(0);
      } else setTargetChoose(2);
    });
    socket.on("targetSelectDone", (targets: number[]) => {
      setTarget(targets);
      setGame(true);
      setTargetChoose(-1);
    });
    socket.on("roundTurn", (turn:number) => {
      if(turn === id) setRoundTurn(true)
      else setRoundTurn(false)
    })
    socket.on("roundDone", (result: any) => {
      setRoundMessage(`Player ${result+1} won the round`)
    });
    socket.on("roundStatus", (round:any, suitofround:string) => {
      setRoundSuit(suitofround)
      setCardsOnRound(round)
    })
    socket.on("userLeft", () => {
      setGame(false)
      setTargetChoose(-1)
      setTrump("")
      setTrumpPlayer(-1)
      setTrumpChoose(false)
      setCards([])
      setUsersInfo(null)
      setId(-1)
      setUserLeft(true)
      socket.disconnect()
    })
  });

  const onTrump = (trumpSuit: string, trumpValue: string, pass: boolean) => {
    socket.emit("trumpPlay", trumpValue, trumpSuit, pass, room, id);
  };

  const onChoose = (tar: number) => {
    setTargetChoose(1);
    socket.emit("targetSelect", id, tar, room);
  };

  const handleDispatch = (val: string, suit: string) => {
    const filter = cards.filter((c) => {
      if (c.suit !== suit || c.value !== val) return c;
    });
    setCards(filter);
    socket.emit("round", room, id, val, suit);
  };
  return (
    <div>
      <h1>Hi {name ? name : "There"}</h1>
      {id != -1 && <p>You are Player no. {id + 1}</p>}
      {usersinfo && (
        <div>
          <h4>Teams in Room</h4>
          <p>
            Team 1 : {usersinfo[0].name} (Player 1) and {usersinfo[2].name}{" "}
            (Player 3)
          </p>
          <p>
            Team 2 : {usersinfo[1].name} (Player 2) and {usersinfo[3].name}{" "}
            (Player 4)
          </p>
        </div>
      )}
      {cards.length >= 1 && (
        <UserCards cards={cards} game={roundTurn} handleDispatch={handleDispatch} roundSuit={roundSuit} />
      )}
      {trumpChoose && <Trump num={num} handleSubmit={onTrump} trump={trump} />}
      {targetChoose === -1 && !game && trump && <p>Current Trump : {trump}</p>}
      {trumpPlayer !== -1 && <p>Trump Placed By {trumpPlayer}</p>}
      {targetChoose !== -1 && (
        <TargetChoose handleSubmit={onChoose} op={targetChoose} trump={trump} />
      )}
      {game && <Game trump={trump} target={target} />}
      {cardsOnRound && 
      <div>
        <ol>
          {cardsOnRound.map((card,i) => <li key={i}>{card.suit}, {card.value} from {card.id+1}</li>)}
        </ol>
      </div>}
      {cardsOnRound.length === 4 && <p>{Roundmessage}</p>}
      {userLeft && <UserLeft />}
    </div>
  );
};
