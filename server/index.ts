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
  getUsers,
  setTarget,
  updateRound,
  winner,
  getTurn,
} from "./game";
import { user } from "./setting";
let acusers = 0;

const PORT = 8080;
const app = express();
const server = createServer(app);
const io = socketio(server);
io.on("connect", async (socket) => {
  acusers += 1;
  console.log(acusers);

  socket.on("join", (name: string, room: string, callback) => {
    let res = addUser(name, room, socket.id);
    if (res === -1) return callback("Room Full, Please try other room");
    socket.join(room);
    if (res === 4) {
      let users: user[] = startGame(room);
      for (let i = 0; i < 4; ++i)
        io.to(users[i].id).emit("cards", users[i].cards, i, users);
      io.to(room).emit("trumpTurn", 0, "", "0");
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
      console.log(trumpsuit, trumpvalue, pass);
      let nxtturn = trumpPlay(trumpvalue, trumpsuit, pass, room);
      if (nxtturn === -1) {
        let tar = getTarget(room);
        io.to(room).emit("trumpDone", getTrump(room), tar);
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
    if (nxtturn === -1) {
      const result = winner(room);
      io.to(room).emit("roundstatus", result);
    } else {
      io.to(room).emit("roundTurn", nxtturn);
    }
  });
  socket.on("disconnect", () => {
    acusers -= 1;
    console.log(acusers);
  });
});
// app.use(cors)
app.use(router);
app.use(cors);

server.listen(process.env.PORT || PORT, () =>
  console.log(`Server has started on ${PORT}`)
);
