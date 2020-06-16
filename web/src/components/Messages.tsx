import React, { useEffect, useState } from "react";
import Modal from "react-modal"
import queryString from "query-string";
import io from "socket.io-client";
import { Trump } from "./Trump";
import { UserCards } from "./UserCards";
import { Game } from "./Game";
import { TargetChoose } from "./TargetChoose";
import { UserLeft } from "./UserLeft";
import { CardsOnTable } from "./CardsOnTable";
import { Winner } from "./Winner";
import { userInfo } from "os";
import { parse } from "path";
import { Link } from "react-router-dom";

const suitSymbol = new Map()
suitSymbol.set("SPADES","&spades;")
suitSymbol.set("DIAMS","&diams;")
suitSymbol.set("CLUBS","&clubs;")
suitSymbol.set("HEARTS","&hearts;")

const calcScore = (tar: number, sco: number) => {
  if (sco < tar) return (10*(sco-tar));
  else return ((10*tar) + (sco - tar));
};

// const ENDPOINT = "http://localhost:8080/"
const ENDPOINT = "https://still-beyond-54734.herokuapp.com/"
let socket: SocketIOClient.Socket;
let tmp: any = null;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Messages = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [usersinfo, setUsersInfo] = useState(tmp);
  const [id, setId] = useState(-1);
  const [cards, setCards] = useState<{ suit: string; value: string }[]>([]);
  const [trumpChoose, setTrumpChoose] = useState(false);
  const [trump, setTrump] = useState("");
  const [num, setNum] = useState(0);
  const [game, setGame] = useState(false);
  const [target, setTarget] = useState([-1, -1]);
  const [targetChoose, setTargetChoose] = useState(-1);
  const [trumpTurn, setTrumpTurn] = useState(1) 
  const [trumpPlayer, setTrumpPlayer] = useState(-1);
  const [roundTurn, setRoundTurn] = useState(false);
  const [cardsOnRound, setCardsOnRound] = useState<any[]>([]);
  const [roundSuit, setRoundSuit] = useState("any");
  const [userLeft, setUserLeft] = useState(false);
  const [score, setScore] = useState([0, 0]);
  const [totScore, setTotScore] = useState([0, 0]);
  const [noOfGames, setNoOfGames] = useState(0);
  const [gameDone, setGameDone] = useState(false);
  const [allCards, setAllCards] = useState<any[]>([])
  const [trumpMessage, setTrumpMessage] = useState<string>("")
  const [connectAgain, setConnectAgain] = useState(false)

  
  useEffect(() => {
    if(id !== -1){
    localStorage.clear()
    localStorage.setItem("name",name)
    localStorage.setItem("cards",JSON.stringify(cards))
    localStorage.setItem("usersinfo", JSON.stringify(usersinfo))
    localStorage.setItem("id", String(id))
    localStorage.setItem("trumpChoose",trumpChoose ? "1":"")
    localStorage.setItem("trump", trump)
    localStorage.setItem("num",String(num))
    localStorage.setItem("game", game ? "1" : "")
    localStorage.setItem("target",`${target[0]},${target[1]}`)
    localStorage.setItem("targetChoose", String(targetChoose))// const [targetChoose, setTargetChoose] = useState(-1);
    localStorage.setItem("trumpTurn", String(trumpTurn))// const [trumpTurn, setTrumpTurn] = useState(1) 
    localStorage.setItem("trumpPlayer", String(trumpPlayer))// const [trumpPlayer, setTrumpPlayer] = useState(-1);
    localStorage.setItem("roundTurn", roundTurn ? "1" : "")// const [roundTurn, setRoundTurn] = useState(false);
    localStorage.setItem("cardsOnRound", JSON.stringify(cardsOnRound))// const [cardsOnRound, setCardsOnRound] = useState<any[]>([]);
    localStorage.setItem("roundSuit", roundSuit)// const [roundSuit, setRoundSuit] = useState("any");
    localStorage.setItem("score", `${score[0]},${score[1]}`)// const [score, setScore] = useState([0, 0]);
    localStorage.setItem("totScore", `${totScore[0]},${totScore[1]}`)// const [totScore, setTotScore] = useState([0, 0]);
    localStorage.setItem("noOfGames", String(noOfGames))// const [noOfGames, setNoOfGames] = useState(0);
    localStorage.setItem("gameDone", gameDone ? "1":"")// const [gameDone, setGameDone] = useState(false);
    localStorage.setItem("allCards", JSON.stringify(allCards))// const [allCards, setAllCards] = useState<any[]>([])
    }
  }, [name,cards,usersinfo, id, trumpChoose, trump, num,  game, target, targetChoose, trumpTurn, trumpPlayer, roundTurn, cardsOnRound, roundSuit, score, totScore, noOfGames, gameDone, allCards])


  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, room }: any = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
    socket.emit("join", name, room, (error: any) => {
      if(error === "Room Full, Please try other room" ||
         error === "Name exists in room, Try another name"){
        console.log(error);
        alert(error);
        window.location.pathname = "/";
        return
      }
      setUsersInfo(JSON.parse(localStorage.getItem("usersinfo")!))
      setCards(JSON.parse(localStorage.getItem("cards")!))
      setTrumpChoose(!!localStorage.getItem("trumpChoose"))
      setTrump(localStorage.getItem("trump")!)
      setNum(parseInt(localStorage.getItem("num")!))
      setGame(!!localStorage.getItem("game"))
      setTarget(localStorage.getItem("target")!.split(',').map((e) => parseInt(e)))
      setTargetChoose(parseInt(localStorage.getItem("targetChoose")!))
      setTrumpTurn(parseInt(localStorage.getItem("trumpTurn")!))
      setTrumpPlayer(parseInt(localStorage.getItem("trumpPlayer")!))
      setRoundTurn(!!localStorage.getItem("roundTurn"))     
      setCardsOnRound(JSON.parse(localStorage.getItem("cardsOnRound")!).map((item:any) => {
        return ({id:item.id, value:parseInt(item.value), suit:item.suit}) 
      }))
      setRoundSuit(localStorage.getItem("roundSuit")!)
      setScore(localStorage.getItem("score")!.split(',').map((e) => parseInt(e)))
      setTotScore(localStorage.getItem("totScore")!.split(',').map((e) => parseInt(e)))
      setNoOfGames(parseInt(localStorage.getItem("noOfGames")!))
      setGameDone(!!localStorage.getItem("gameDone"))
      setAllCards(JSON.parse(localStorage.getItem("allCards")!))
      setId(parseInt(localStorage.getItem("id")!))
    });
  }, [ENDPOINT]);

  useEffect(() => {
    if(trumpMessage === "") return
    let tMessage = trumpMessage.split(" ")
    let x = document.getElementById("trump-box")
    if(tMessage.length > 3) {
      let x = document.getElementById("trump-box1")
      let msgbox = document.createElement("div")
      msgbox.setAttribute("class", "final-trump-message-box")
      msgbox.innerHTML = `<p class="trump-message">${trumpMessage}</p>`
      x?.appendChild(msgbox)
      return
    }
    let msgbox = document.createElement("div")
    let pno = (trumpTurn+2)%4+1
    if(pno-1 !== id)
    msgbox.innerHTML = `
      <p class="trump-message"><span class="trump-player-name">${tMessage[0]}  </span> ${tMessage[1]} ${tMessage.length===3 ? tMessage[2] : ""}</p> 
      <p class="trump-player-no">Player ${pno}</p>
    `
    else
    msgbox.innerHTML = `
      <p class="y-trump-player-no">Your turn</p>
      <p class="y-trump-message"><span class="y-trump-player-name">${tMessage[0]}  </span> ${tMessage[1]} ${tMessage.length===3 ? tMessage[2] : ""}</p>
    `
    msgbox.setAttribute("class", "trump-message-box")
    x?.appendChild(msgbox)
  }, [trumpMessage])

  useEffect(() => {
    if(!gameDone) return
    setTrump("")
    setNum(1)
    setGame(false)
    setTrumpPlayer(-1)
    setTargetChoose(-1)
    let x = document.getElementById("historyBox")
    while(x?.hasChildNodes) x.removeChild(x.children[0])
    setTrumpTurn((noOfGames+1)%4+1)
    if(id === (noOfGames+1)%4) setTrumpChoose(true)
    else setTrumpChoose(false)
  }, [gameDone])

  useEffect(() => {
    socket.on("connect_timeout", () => {console.log("connecion error1"); setConnectAgain(true)})
    socket.on("reconnect_attempt", () => {console.log("connecion error2"); setConnectAgain(true)})
    socket.once("cards", (dcards: any, id: number|undefined, roomusers: any) => {
      setCards(dcards.slice(0,13))
      setAllCards(dcards.slice(13));
      if(id !== undefined) setId(id);
      if(roomusers) setUsersInfo(roomusers);
    });
    socket.on(
      "trumpTurn",
      (playerid: number, trumpsuit: string, trumpvalue: string, pid: any) => {
        if (playerid === id) setTrumpChoose(true);
        else setTrumpChoose(false);
        setTrump(trumpsuit);
        setNum(parseInt(trumpvalue) + 1);
        if (pid !== undefined && usersinfo) {
          setTrumpPlayer(parseInt(pid) + 1);
          setTrumpMessage(`${usersinfo[pid].name} ${trumpvalue},${trumpsuit},<span class="suit-symbol">${suitSymbol.get(trumpsuit)}</span>`)
        }
        else if (trumpsuit !== "" && usersinfo) setTrumpMessage(`${usersinfo[(playerid+3)%4].name} PASS`)
        setTrumpTurn(playerid+1)
      }
    );
    socket.on(
      "trumpDone",
      (finalTrump: string, targets: number[], pid: number) => {
        setTrump(finalTrump);
        setTrumpPlayer(pid + 1);
        setTrumpChoose(false);
        setTarget(targets);
        setTrumpTurn(0)
        if(usersinfo)
        setTrumpMessage(`TRUMP DONE - ${usersinfo[pid].name} chose ${finalTrump} with ${targets[pid%2]}`)
      }
    );
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
    socket.on("roundTurn", (turn: number) => {
      if (turn === id) setRoundTurn(true);
      else setRoundTurn(false);
    });
    
    socket.on("roundStatus", (round: any, suitofround: string) => {
      setRoundSuit(suitofround);
      setCardsOnRound(round);
    });
    socket.on("userLeft", () => {
      setUserLeft(true);
    });
    socket.on("userRejoin", () => {
      setUserLeft(false)
    })

    if(score[0]+score[1] === 13 && !gameDone) {
      setTotScore([
        totScore[0] + calcScore(target[0], score[0]),
        totScore[1] + calcScore(target[1], score[1]),
      ]);
      setGameDone(true)
    };
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

  const WinnerHandle = (winner:number) => {
    if(winner === id) socket.emit("roundDone" , room, winner)
    if (winner % 2 === 1) setScore([score[0], score[1] + 1]);
    else setScore([score[0] + 1, score[1]]);
  }

  const closeModal = () => {
    setNoOfGames(noOfGames + 1);
    setCardsOnRound([]);
    setGameDone(false)
    setTarget([0,0])
    setScore([0,0])
    setCards(allCards.splice(0,13))
    setRoundTurn(false)
    setRoundSuit("any")
  }

  return (
    <div className="full-game">
      <div className="game-header">
      <h1 className="hithere">Hi {name ? name : "There"}</h1>
      {id != -1 && <h2 className="playerID">You are Player no. {id + 1}</h2>}
      <h1 className="room">Room: {room}</h1>
      </div>
      <div className={"game"+(userLeft ? " userleft" : "")}>
      <div className="game-left">
      {usersinfo && (
        <div className="room-details">
          {game && <Game trump={trump} target={target} score={score} />}
          <div className = "team-details td">
          <div className="teams-heading">
          <h3>Teams in Room</h3> 
          </div>
          <div className="teams">
            <div className="team1">
            <p className="team-name">Team 1</p>
            <p>Player 1 - {usersinfo[0].name}</p>
            <p>Player 3 - {usersinfo[2].name}</p>
            </div>
            <div className="team2">
            <p className="team-name">Team 2</p>
            <p>{usersinfo[1].name} - Player 2</p>
            <p>{usersinfo[3].name} - Player 4</p>
            </div>
          </div>
          </div>
          <div className = "score-and-games">
          <div className="team-details scores">
            <div className="teams-heading"><h3>Total Scores</h3></div>
            <div className="teams">
            <div className="team1">
            <p className="score-team-name">Team 1</p>
            <p className="score-score">{totScore[0]}</p>
            </div>
            <div className="team2">
            <p className="score-team-name">Team 2</p>
            <p className="score-score">{totScore[1]}</p>
            </div>
            </div>
          </div>
          <div className="noofgames">
          <div className="noofgames-heading"><h3>Games Played</h3></div>
          <div className="noofgames-result"><p>{noOfGames}</p></div>
          </div>
          </div>
       </div>
      )}        
      
      {cards.length >= 1 && (
        <UserCards
          cards={cards}
          game={roundTurn}
          handleDispatch={handleDispatch}
          roundSuit={roundSuit}
        />
      )}
      <div>
      {cardsOnRound.length > 0 && (
        <CardsOnTable cards={cardsOnRound} users={usersinfo} />
      )}
      {cardsOnRound.length === 4 && (
        <Winner cards={cardsOnRound} trump={trump} call={WinnerHandle} check={gameDone}/>
      )}
      </div>

      </div>

      <div className={"trump-section"+(game ? " trump-section-disable" : "")}>
        { id !== -1 && !userLeft && !game &&
              <div id="historyBox" className="history-box">
                <div className="teams-heading"><h3>Trump History</h3></div>
                <div id="trump-box" className="trump-box"></div>
                <div id="trump-box1" className="trump-box"></div>
                {trumpTurn !== 0 && (trumpTurn-1===id ? 
                  <div className="teams-heading turn-box-y"><p className="trump-message">Your Turn</p></div> : 
                  <div className="teams-heading turn-box-o"><p className="trump-message">Player {trumpTurn}'s Turn</p></div> )}
              </div> }
          {targetChoose === -1 && !game && trump && 
            <div className="current-trump">
              <p className="current-trump-suit">Current Trump : {trump}</p>
              <p className="current-trump-player">Trump Placed By Player {trumpPlayer}</p>
            </div>
          }
          {targetChoose !== -1 && (
            <TargetChoose handleSubmit={onChoose} op={targetChoose} trump={trump} />
          )}
          {trumpChoose && <Trump num={num} handleSubmit={onTrump} trump={trump} />}
        </div>
      </div>
      <Modal 
        isOpen={gameDone}
        ariaHideApp={false}
      >
        <div className="modal">
        <h3 className="modal-head">Results of Game</h3>
        <h5>Targets for teams :</h5>
        <p>Team 1 : {target[0]} , Team 2 : {target[1]}</p>
        <h5>Scores of Teams :</h5>
        <p>Team 1 : {score[0]} , Team 2 : {score[1]}</p>
        <h5>Total Scores</h5>
        <p>Team 1 : {totScore[0]} , Team 2 : {totScore[1]}</p>
        <button onClick={(e) => {console.log(cards); closeModal();}}>Next Game !!!</button>
        </div>
      </Modal>
        
      <Modal isOpen={userLeft} ariaHideApp={false}>
        <p className="user-left-p">User left, wait</p>
      </Modal>
      <Modal isOpen={connectAgain} ariaHideApp={false}>
        <p className="user-left-p">Connection lost, Login again</p>
        <Link to="/">Login here</Link>
      </Modal>
      
      {/* {userLeft && <UserLeft />} */}
    </div>
  );
};
