export type UserId = string;

export interface Chat {
    id:string;
    userId : string;
    name:string;
    message:string;
    upvotes : UserId[]; //who has upvoited 

}


export abstract class Store {
    constructor(){

    }
    initRomm(roomId:string){

    }

    getChats(room:string, limit:number, offset:number){

    }
    addChat(userId: UserId, name:string, rooom:string, message:string){

    }
    upvote(userId:UserId, room:string, chatId:string){
        
    }
}