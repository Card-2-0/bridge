import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ScrollToBottom from 'react-scroll-to-bottom';
import queryString from "query-string";
import io from "socket.io-client";
import axios from "axios"
import { Trump } from "./Trump";
import { UserCards } from "./UserCards";
import { Game } from "./Game";
import { TargetChoose } from "./TargetChoose";
import { CardsOnTable } from "./CardsOnTable";
import { Winner } from "./Winner";
import { Link } from "react-router-dom";
const audioFile = require("../assets/juntos.mp3")
const audio = new Audio(audioFile)

const suitSymbol = new Map();
suitSymbol.set("SPADES", "&spades;");
suitSymbol.set("DIAMS", "&diams;");
suitSymbol.set("CLUBS", "&clubs;");
suitSymbol.set("HEARTS", "&hearts;");

const calcScore = (tar: number, sco: number) => {
  if (sco < tar) return 10 * (sco - tar);
  else return 10 * tar + (sco - tar);
};

const ENDPOINT = "http://localhost:8080";
// const ENDPOINT = "https://still-beyond-54734.herokuapp.com"
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
  const [trumpTurn, setTrumpTurn] = useState(1);
  const [trumpDone, setTrumpDone] = useState(false);
  const [trumpPlayer, setTrumpPlayer] = useState(-1);
  const [roundTurn, setRoundTurn] = useState(false);
  const [cardsOnRound, setCardsOnRound] = useState<any[]>([]);
  const [roundSuit, setRoundSuit] = useState("any");
  const [userLeft, setUserLeft] = useState(true);
  const [score, setScore] = useState([0, 0]);
  const [totScore, setTotScore] = useState([0, 0]);
  const [noOfGames, setNoOfGames] = useState(0);
  const [gameDone, setGameDone] = useState(false);
  const [allCards, setAllCards] = useState<any[]>([]);
  const [trumpMessage, setTrumpMessage] = useState<string>("");
  const [connectAgain, setConnectAgain] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState<string[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [newMessage, setNewMessage] = useState(false)
  const [acusers, setAcusers] = useState<any[]>([])

  useEffect( () => {
    axios.get(ENDPOINT+"/test").then ((res) =>
    {
      if (id !== -1) {
        localStorage.clear();
        localStorage.setItem("targetChoose", String(targetChoose))
      }
    }
    )
  }, [
    targetChoose,
  ]);

  useEffect( () => {
    return (() => {socket.disconnect()})
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    const { name, room }: any = queryString.parse(window.location.search);
    setName(name);
    setRoom(room);
    socket.emit("join", name, room, async (error: any, opid:number) => {
      if (
        error === "Room Full, Please try other room" ||
        error === "Name exists in room, Try another name"
      ) {
        console.log(error);
        alert(error);
        window.location.pathname = "/";
        return;
      }
      console.log(opid)
      await axios.get(ENDPOINT+'?name='+room).then (async (res) => {
        console.log(res.data)
        let pid = opid
        setCards(res.data.cards[pid])
        setAllCards(res.data.allcards[pid])
        setUsersInfo(res.data.usersinfo)
        setTrumpChoose(res.data.trumpTurn === pid)
        setTrump(res.data.trump)
        setNum(res.data.num)
        setTarget(res.data.target)
        setTargetChoose(res.data.targetChoose)
        setTrumpTurn(res.data.trumpTurn+1)
        setTrumpPlayer(res.data.trumpPlayer)
        setRoundTurn(res.data.roundTurn === pid)
        setCardsOnRound(res.data.cardsOnRound)
        setRoundSuit(res.data.roundSuit)
        setScore(res.data.score)
        setNoOfGames(res.data.noOfGames)
        setTrumpDone(res.data.trumpDone)
        setGame(res.data.trumpDone)
        setTotScore(res.data.totScore)
        setAcusers(res.data.active)
      })
      setTargetChoose(parseInt(localStorage.getItem("targetChoose")!));
      setId(opid);
    });
  }, [ENDPOINT]);

  useEffect(() => {
    if (trumpMessage === "") return;
    let tMessage = trumpMessage.split(" ");
    let x = document.getElementById("trump-box");
    if (tMessage.length > 3) {
      let x = document.getElementById("trump-box1");
      let msgbox = document.createElement("div");
      msgbox.setAttribute("class", "final-trump-message-box");
      msgbox.innerHTML = `<p class="trump-message">${trumpMessage}</p>`;
      x?.appendChild(msgbox);
      return;
    }
    let msgbox = document.createElement("div");
    let pno = ((trumpTurn + 2) % 4) + 1;
    if (pno - 1 !== id)
      msgbox.innerHTML = `
      <p class="trump-message"><span class="trump-player-name">${
        tMessage[0]
      }  </span> ${tMessage[1]} ${tMessage.length === 3 ? tMessage[2] : ""}</p> 
      <p class="trump-player-no">Player ${pno}</p>
    `;
    else
      msgbox.innerHTML = `
      <p class="y-trump-player-no">Your turn</p>
      <p class="y-trump-message"><span class="y-trump-player-name">${
        tMessage[0]
      }  </span> ${tMessage[1]} ${tMessage.length === 3 ? tMessage[2] : ""}</p>
    `;
    msgbox.setAttribute("class", "trump-message-box");
    x?.appendChild(msgbox);
  }, [trumpMessage]);

  useEffect(() => {
    if (chat.length === 0) return;
    // let msgbox = document.createElement("p");
    // msgbox.setAttribute("class", "chat-message");
    // msgbox.innerHTML = `
    // <span class="chat-user">${
    //   chat.split("$")[0]
    // }</span><span class="chat-user-content">${chat.split("$")[1]}</span>
    // `;
    // let x = document.getElementById("chat");
    // x?.appendChild(msgbox);
    if(!showChat ) { if(!newMessage)setNewMessage(true);}
    audio.play(); 
  }, [chat]);

  useEffect(() => {
    if (!gameDone) return;
    setTrump("");
    setNum(1);
    setGame(false);
    setTrumpPlayer(-1);
    setTargetChoose(-1);
    setTrumpDone(false)
    let x = document.getElementById("historyBox");
    while (x?.hasChildNodes) x.removeChild(x.children[0]);
    setTrumpTurn(((noOfGames + 1) % 4) + 1);
    if (id === (noOfGames + 1) % 4) setTrumpChoose(true);
    else setTrumpChoose(false);
  }, [gameDone]);

  useEffect(() => {
    let c = 0;
    console.log(acusers)
    for(let i = 0; i<acusers.length; i++)
    if(acusers[i].ac) c+=1;
    if(c == 4) setUserLeft(false)
    else setUserLeft(true)
  }, [acusers])

  useEffect(() => {
    socket.on("connect_timeout", () => {
      console.log("connecion error1");
      setConnectAgain(true);
    });
    socket.on("reconnect_attempt", () => {
      console.log("connecion error2");
      setConnectAgain(true);
    });
    socket.once(
      "cards",
      (dcards: any, id: number | undefined, roomusers: any) => {
        setCards(dcards.slice(0, 13));
        setAllCards(dcards.slice(13));
        setUserLeft(false)
        if (id !== undefined) setId(id);
        if (roomusers) setUsersInfo(roomusers);
      }
    );
    socket.on(
      "trumpTurn",
      (playerid: number, trumpsuit: string, trumpvalue: string, pid: any) => {
        if (playerid === id) setTrumpChoose(true);
        else setTrumpChoose(false);
        setTrump(trumpsuit);
        setNum(parseInt(trumpvalue) + 1);
        if (pid !== undefined && usersinfo) {
          setTrumpPlayer(parseInt(pid) + 1);
          setTrumpMessage(
            `${
              usersinfo[pid].name
            } ${trumpvalue},${trumpsuit},<span class="suit-symbol">${suitSymbol.get(
              trumpsuit
            )}</span>`
          );
        } else if (trumpsuit !== "" && usersinfo)
          setTrumpMessage(`${usersinfo[(playerid + 3) % 4].name} PASS`);
        setTrumpTurn(playerid + 1);
      }
    );
    socket.on(
      "trumpDone",
      (finalTrump: string, targets: number[], pid: number) => {
        setTrump(finalTrump);
        setTrumpPlayer(pid + 1);
        setTrumpChoose(false);
        setTarget(targets);
        setTrumpTurn(0);
        if (usersinfo)
          setTrumpMessage(
            `TRUMP DONE - ${usersinfo[pid].name} chose ${finalTrump} with ${
              targets[pid % 2]
            }`
          );
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
      setTrumpDone(true);
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
    socket.on("chat", (chatMessage: string[]) => {
      setChat(chatMessage);
    });
    socket.on("userChange", (acusers:any) => {
      setAcusers(acusers)
    })

    if (score[0] + score[1] === 13 && !gameDone) {
      setTotScore([
        totScore[0] + calcScore(target[0], score[0]),
        totScore[1] + calcScore(target[1], score[1]),
      ]);
      setGameDone(true);
    }
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

  const WinnerHandle = (winner: number) => {
    if (winner === id) socket.emit("roundDone", room, winner);
    if (winner % 2 === 1) setScore([score[0], score[1] + 1]);
    else setScore([score[0] + 1, score[1]]);
  };

  const closeModal = () => {
    setNoOfGames(noOfGames + 1);
    setCardsOnRound([]);
    setGameDone(false);
    setTarget([0, 0]);
    setScore([0, 0]);
    setCards(allCards.splice(0, 13));
    setRoundTurn(false);
    setRoundSuit("any");
  };

  const sendMessage = () => {
    setChatInput("");
    socket.emit("chat", chatInput, name, room);
  };

  return (
    <div className="full-game">
      <div className="game-header">
        <h1 className="hithere">Hi {name ? name : "There"}</h1>
        {id != -1 && <h2 className="playerID">You are Player no. {id + 1}</h2>}
        <h1 className="room">Room: {room}</h1>
        <button
          className={"chat-open"+ (newMessage ? " unread":"")}
          onClick={(e) => {
            e.preventDefault();
            setShowChat(true);
            setNewMessage(false);
          }}
        >
          {newMessage && <span>&bull;  </span>}Chat Room
        </button>
      </div>
      <div className="game">
        <div className="game-left">
          {usersinfo && (
            <div>
              <div className={"room-details" + (showChat ? " hide" : "")}>
                {game && <Game trump={trump} target={target} score={score} />}
                <div className="team-details td">
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
                <div className="score-and-games">
                  <div className="team-details scores">
                    <div className="teams-heading">
                      <h3>Total Scores</h3>
                    </div>
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
                    <div className="noofgames-heading">
                      <h3>Games Played</h3>
                    </div>
                    <div className="noofgames-result">
                      <p>{noOfGames}</p>
                    </div>
                  </div>
                </div>
              </div>
              )
              <div
                className={
                  "chat-room room-details" + (!showChat ? " hide" : "")
                }
              >
                <div className="chat-title">
                  <h3>Chat</h3>
                </div>
                <ScrollToBottom className="chat">
                  {chat.map((msg:string) => 
                    <p className="chat-message">
                      <span className="chat-user">{msg.split("$")[0]}</span>
                      <span className="chat-user-content">{msg.split("$")[1]}</span>
                    </p>
                  )}
                </ScrollToBottom>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessage();
                  }}
                >
                  <input
                    value={chatInput}
                    type="text"
                    id="chat-input"
                    className="chat-input"
                    placeholder="Enter Message"
                    onChange={(e) => {
                      setChatInput(e.target.value);
                    }}
                  />
                  <button className="chat-send" type="submit">
                    Send
                  </button>
                </form>
                <button
                  className="chat-close"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowChat(false);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {cards.length >= 1 && (
            <UserCards
              cards={cards}
              game={roundTurn}
              handleDispatch={handleDispatch}
              roundSuit={roundSuit}
              round={trumpDone}
            />
          )}
          <div>
            {cardsOnRound.length > 0 && (
              <CardsOnTable cards={cardsOnRound} users={usersinfo} />
            )}
            {cardsOnRound.length === 4 && (
              <Winner
                cards={cardsOnRound}
                trump={trump}
                call={WinnerHandle}
                check={gameDone}
              />
            )}
          </div>
        </div>

        <div
          className={"trump-section" + (game ? " trump-section-disable" : "")}
        >
          {id !== -1 && !game && (
            <div id="historyBox" className="history-box">
              <div className="teams-heading">
                <h3>Trump History</h3>
              </div>
              <div id="trump-box" className="trump-box"></div>
              <div id="trump-box1" className="trump-box"></div>
              {trumpTurn !== 0 &&
                (trumpTurn - 1 === id ? (
                  <div className="teams-heading turn-box-y">
                    <p className="trump-message">Your Turn</p>
                  </div>
                ) : (
                  <div className="teams-heading turn-box-o">
                    <p className="trump-message">Player {trumpTurn}'s Turn</p>
                  </div>
                ))}
            </div>
          )}
          {targetChoose === -1 && !game && trump && (
            <div className="current-trump">
              <p className="current-trump-suit">Current Trump : {trump}</p>
              <p className="current-trump-player">
                Trump Placed By Player {trumpPlayer}
              </p>
            </div>
          )}
          {targetChoose !== -1 && (
            <TargetChoose
              handleSubmit={onChoose}
              op={targetChoose}
              trump={trump}
            />
          )}
          {trumpChoose && (
            <Trump num={num} handleSubmit={onTrump} trump={trump} />
          )}
        </div>
      </div>
      <Modal isOpen={gameDone} ariaHideApp={false}>
        <div className="modal">
          <h3 className="modal-head">Results of Game</h3>
          <h5>Targets for teams :</h5>
          <p>
            Team 1 : {target[0]} , Team 2 : {target[1]}
          </p>
          <h5>Scores of Teams :</h5>
          <p>
            Team 1 : {score[0]} , Team 2 : {score[1]}
          </p>
          <h5>Total Scores</h5>
          <p>
            Team 1 : {totScore[0]} , Team 2 : {totScore[1]}
          </p>
          <button
            onClick={(e) => {
              console.log(cards);
              closeModal();
            }}
          >
            Next Game !!!
          </button>
        </div>
      </Modal>

      <Modal isOpen={userLeft} ariaHideApp={false}>
        <h1 className="acusers">Room Status</h1>
        {acusers.map((user) => {return(
          <p className={user.ac ? "online":"offline"}>{user.name}</p>
        )})}
      </Modal>
      <Modal isOpen={connectAgain} ariaHideApp={false}>
        <p className="user-left-p">Connection lost, Login again</p>
        <Link to="/">Login here</Link>
      </Modal>
    </div>
  );
};
