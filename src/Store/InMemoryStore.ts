import { Chat, UserId, Store } from "./Store";
let globalChatId= 0;

export interface Room{
    roomId:string;
    chats:Chat[]
}

export class InMemoryStore implements Store{
    private store:Map<string, Room>

    constructor(){
        this.store = new Map<string, Room>();

    }

    initRomm(roomId: string) {
        this.store.set(roomId, {
            roomId, 
            chats:[]
        })
    }

    getChats(roomId: string, limit: number, offset: number) {
        const room = this.store.get(roomId);
        
        if(!room){
            return []
        }
        return room.chats.reverse().slice(0, offset).slice(-1 * limit)

    }

    addChat(userId: UserId, name: string, rooomId: string, message: string){
        if(!this.store.get(rooomId)){
            this.initRomm(rooomId);
        }
        
        const room = this.store.get(rooomId);
            if(!room){
                return;
            }
        
        const chat = {
            id: (globalChatId++).toString(),
            userId,
            name,
            message,
            upvotes:[]
        }
        room.chats.push(chat);
        return chat;        
    }   

    upvote(userId: string, roomId: string, chatId: string) {
        const room = this.store.get(roomId);
        if (!room) {
            return 
        }
        // Todo: Make this faster
        const chat = room.chats.find(({id}) => id == chatId);

        if (chat) {
            if (chat.upvotes.find(x => x === userId)) {
                return chat;
            }
            chat.upvotes.push(userId);
        }
        return chat;
    }
    //The upvote method takes three arguments: userId, roomId, and chatId. 
    //It first gets the room with the given roomId from the store.
    // If the room is not found, it returns. Next, 
    //it finds the chat with the given chatId in the room's chats list. 
    //If the chat is not found, it returns. 
    //Then, it checks if the user has already upvoted the chat. 
    //If the user has already upvoted the chat, it returns the chat without modifying it.
    // If the user has not already upvoted the chat, it adds the user's id to the chat's upvotes list and 
    //returns the updated chat.
}