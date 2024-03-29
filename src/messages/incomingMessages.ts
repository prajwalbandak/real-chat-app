import z from 'zod'


export enum SupportedMessage {
    JoinRoom = "JOIN_ROOM",
    sendMessage = "SEND_MESSAGE",
    UpvoteMessage = "UPVOTE_MESSAGE"
}

 export type IncomingMessage = {
    type:SupportedMessage.JoinRoom,
    payload:InitMessageType
} | {
    type:SupportedMessage.sendMessage,
    payload:UserMessageType
} | {
    type:SupportedMessage.UpvoteMessage,
    payload:UpvoteMessageType
}



export const InitMessage = z.object({
    name:z.string(),
    userId:z.string(),
    roomId:z.string(),
})



export type InitMessageType = z.infer<typeof InitMessage>


export const UserMessage = z.object({
    message : z.string(),
    userId:z.string(),
    roomId:z.string(),
})


export type UserMessageType = z.infer<typeof UserMessage>

export const UpvoteMessageType = z.object({
    chatId : z.string(),
    userId:z.string(),
    roomId:z.string(),
})


export type UpvoteMessageType = z.infer<typeof UpvoteMessageType>