import {shuffleCards, SUIT, room, user, card} from './setting'

let tmp:any
let rooms:room[] = []
let newuser:user

export const addUser = (username:string, roomname:string, sid:string) => {
    tmp = rooms.findIndex((r) => r.name === roomname)
    if(tmp !== -1 && rooms[tmp].users.length === 4) return -1;
    newuser = {
        id:sid,
        name:username,
        cards:[],
        room:roomname
    }
    if(tmp === -1) {
            rooms.push({
            name:roomname,
            users:[newuser],
            trump:SUIT.NON,
            turn:-1
        })
        return 1;
    }
    else rooms[tmp].users.push(newuser)
    return rooms[tmp].users.length;
}

export const startGame = (roomname:string) => {
    tmp = rooms.findIndex((r) => r.name === roomname)
    let allcards = shuffleCards()
    for(let i=0; i<52; ++i) rooms[tmp].users[i%4].cards.push({
        suit:Math.floor(allcards[i]/13),
        value:(allcards[i])%13
    })
    return rooms[tmp].users;
}
