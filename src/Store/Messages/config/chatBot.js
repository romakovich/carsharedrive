export const chatBot = (
        fromUser, 
        toUser, 
        chatBot, 
        lastTrip,
        ) => {

    return {
        time: Date.now(),
        fromUser: fromUser,
        toUser: toUser,
        message: "",
        isRead: false,
        emoji: [],
        chatBot: chatBot,
        lastTrip: lastTrip
    }
};