import { createServer } from "http";
import express from "express";
import router from "./router";
import socketio from "socket.io";
import cors from "cors";
import {
  addUser,
  startGame,
  trumpPlay,
  getTrump,
  getTarget,
  setTarget,
  updateRound,
  getTurn,
  getRound,
  getRoundSuit,
  removeRoom,
  resetRoom,
} from "./game";
import { user } from "./setting";
interface Hash {
  [details: string] : string;
} 
let socketroom:Hash = {};
let socketname:Hash = {};

const PORT = 8080;
const app = express();
const server = createServer(app);
const io = socketio(server).listen(server, {pingInterval:10000, pingTimeout:5000});
io.on("connect", async (socket) => {
  // console.log(acusers);

  socket.on("join", (name: string, room: string, callback) => {
    let res = addUser(name, room, socket.id);
    console.log("join",name,room,res)
    if (res === -1) {
      return callback("Room Full, Please try other room");
    }
    if (res === -2) {
      io.to(room).emit("userRejoin")
      socketroom[socket.id] = room
      socketname[socket.id] = name
      socket.join(room)
      return callback("Rejoin")
    }
    if(res === -3) {
      return callback("Name exists in room, Try another name")
    }
    socket.join(room);
    socketname[socket.id] = name
    socketroom[socket.id] = room
    if (res === 4) {
      let users: user[] = startGame(room);
      for (let i = 0; i < 4; ++i)
        io.to(users[i].id).emit("cards", users[i].cards, i, users);
      io.to(room).emit("trumpTurn", getTurn(room), "", "0");
    }
  });

  socket.on(
    "trumpPlay",
    (
      trumpvalue: string,
      trumpsuit: string,
      pass: boolean,
      room: string,
      id: any
    ) => {
      console.log(room, id, trumpsuit, trumpvalue, pass);
      let nxtturn = trumpPlay(trumpvalue, trumpsuit, pass, room);
      if (nxtturn === -1) {
        let tar = getTarget(room);
        io.to(room).emit("trumpDone", getTrump(room), tar, getTurn(room));
        if (tar[0] === 0) io.to(room).emit("targetChoose", 0);
        else io.to(room).emit("targetChoose", 1);
        return;
      }
      if (pass)
        io.to(room).emit("trumpTurn", nxtturn, getTrump(room), trumpvalue, id);
      else io.to(room).emit("trumpTurn", nxtturn, getTrump(room), trumpvalue);
    }
  );

  socket.on("targetSelect", (id: number, tar: number, room: string) => {
    if (setTarget(id, tar, room)) {
      io.to(room).emit("targetSelectDone", getTarget(room));
      io.to(room).emit("roundTurn", getTurn(room))
    }
  });
  socket.on("round", (room: string, id: number, val: string, suit: string) => {
    let nxtturn = updateRound(room, id, val, suit);
    let round = getRound(room)
    io.to(room).emit("roundStatus", round, round.length === 4 ? "any":getRoundSuit(room))
    if (nxtturn === -1) {
      // const result = winner(room);
      // io.to(room).emit("roundDone", result);
      // io.to(room).emit("roundTurn", result)
    } else {
      io.to(room).emit("roundTurn", nxtturn, getRound(room));
    }
  });
  socket.on("roundDone", (room, winner) => {
    resetRoom(room, winner)
    io.to(room).emit("roundTurn", winner)
  })
  socket.on("chat", (message:string, name:string, room:string) => {
    console.log("chat", room, ":" , name, message)
    io.to(room).emit("chat", `${name}:${message}`)
  })
  socket.on("disconnect", () => {
    let tmp = socketroom[socket.id]
    console.log("left", socketname[socket.id], socketroom[socket.id])
    if(tmp) {
      removeRoom(tmp)
      io.to(tmp).emit('userLeft', socketname[socket.id])
      delete socketname[socket.id]
      delete socketroom[socket.id]
    }
  });
});
app.use(router);
app.use(cors);

server.listen(process.env.PORT || PORT, () =>
  console.log(`Server has started on ${PORT}`)
);
