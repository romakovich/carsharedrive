import io from "socket.io-client";

export const sendMessage = (
    fromUser, 
    toUser, 
    chatBot, 
    message,
    lastTrip,
    timeout=0) => {
        
    const socket = io('http://localhost:5000', { transports: ['websocket'] });

    setTimeout(() => {
        socket.emit('msgToServer', 
        {
            time: Date.now(),
            fromUser,
            toUser,
            message: "",
            isRead: false,
            emoji: [],
            chatBot,
            lastTrip
        });
    }, timeout);
};

export const wsSend = () => {
    const socket = io('http://localhost:5000', { transports: ['websocket'] });
    socket.emit('msgToServer');
}