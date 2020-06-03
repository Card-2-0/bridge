import { createServer } from "http"
import express from "express"
import router from "./router"
import socketio from "socket.io"
import cors from "cors"
import { addUser, startGame } from "./game"
import { user } from "./setting"
let acusers = 0

const PORT = 8080
const app = express()
const server = createServer(app)
const io = socketio(server)
io.on('connect', async (socket) => {
  acusers+=1; console.log(acusers)
  socket.on('join', (name:string, room:string, callback) => {
    let res = addUser(name, room, socket.id)
    if(res === -1) return(callback('Room Full, Please try other room'))
    socket.join(room)
    if(res === 4){
      let users:user[] = startGame(room)
      for(let i=0; i<4; ++i) io.to(users[i].id).emit('cards',users[i].cards,i)
    }
  })
  socket.on('disconnect', () => {acusers-=1; console.log(acusers)})
})
// app.use(cors)
app.use(router)
app.use(cors)

server.listen(process.env.PORT || PORT, () => console.log(`Server has started on ${PORT}`));