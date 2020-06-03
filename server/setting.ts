export enum SUIT {
    CLB,
    HRT,
    DMD,
    SPD,
    NON
}

export type card = {
    suit:SUIT
    value:number
}

export type user = {
    id:string
    name:string
    cards:card[]
    room:string
}

export type room = {
    name:string
    users:user[]
    trump:number
    turn:number
}

export const shuffleCards = () => {
    let array:number[] = []
    for(let i = 0; i<52; ++i) array.push(i);
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return(array);
}