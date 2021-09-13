import React, {useEffect, useState} from 'react';
import Header from '../Global/Header/Header';
import io from "socket.io-client";
import Message from './Message';
import User from './User';

import imgSendMessage from '../../Assets/img/Messages/imgSendMessage.svg';
import imgSendDoc from '../../Assets/img/Messages/imgSendDoc.svg';
import { formatDate } from './config/getDate';
import { wsSend } from '../../Store/Messages/config/wsSend';

export const Messages = ({
    getUsers, users, getChatHistory, chatHistory,
    toUser, toUserName, fromUser,
    chatMessage, setChatMessage,
    lastTrip, 
    updateTrip, createMessage, updateMessage
}) => {
    
    const [inputValue, setInputValue] = useState("");
    const [isChat, setChat] = useState(false);
    const socket = io('http://localhost:5000', { transports: ['websocket'] });

    const addMessage = message => setChatMessage(message);

    useEffect(()=> {
        socket.on('msgToClient', addMessage);
        getUsers();
    },[]);

    const userMessage = 
    {
        time: Date.now(),
        fromUser: fromUser,
        toUser: toUser,
        message: inputValue,
        isRead: false,
        emoji: [],
        chatBot: false,
        lastTrip  
    }

    if((!isChat && !users) || (isChat && !chatHistory)) return (<div><Header /></div>)

    return (<>
        <Header chatMessage={chatMessage}/>
        <div className="messages__container">
            {!isChat 
            ? <><h2>Сообщения</h2> 
            <div className="wrapper">
                {users.map((el,i) => {
                    return <User key={i} user={el} setChat={setChat} 
                    getChatHistory={getChatHistory} chatHistory={chatHistory}
                    chatMessage={chatMessage} toUser={toUser}
                    />
                })}
            </div>
            </>
            : <>
            <div className="back-page-arrow" 
                onClick={()=> {
                    setChat(false);
                    getUsers();
                    wsSend()
                    }}>
                <span className="icon-back"></span>
                <span>Назад</span>
            </div>
            <div className="messages__container-name">{toUserName}</div>
            <div className="messages__container-area">
                
            {chatMessage
            .map((el, i)=>{
                if((el.toUser == toUser && el.fromUser == fromUser)
                || (el.toUser == fromUser && el.fromUser == toUser)) {
                    
                    let date = new Date(el.time).getDate(),
                    prevDate = chatMessage[i-1] && new Date(chatMessage[i-1].time).getDate();

                    return (<>
                        {prevDate != date && 
                        (<div className="messages__container-date" key={el.time}>
                            {formatDate(el.time)}
                        </div>)}
                        <Message key={el} payload={el} chatHistory={chatHistory}
                        toUser={toUser} fromUser={fromUser} 
                        setChatMessage={setChatMessage} chatMessage={chatMessage}
                        updateTrip={updateTrip} updateMessage={updateMessage}
                        />
                    </>)
                }
                })
            }
            </div>
            <div className="messages__container-input">
                <img src={imgSendDoc} />
                <input type="text" value={inputValue} 
                placeholder="Начните вводить текст"
                onChange={e=>{ setInputValue(e.target.value); }}
                onKeyDown={event=>{
                if(event.key === "Enter" && inputValue != "") { 
                    createMessage(userMessage); 
                    setInputValue("");
                } 
                }}
                onClick={()=>{
                    let onlineMessages = [...messages];
                    onlineMessages.forEach(el=>{
                        if(el.fromUser == user.mail) {
                            el["isRead"] = true;
                        }
                    })
                    setMessages(onlineMessages);
                    wsSend()
                }}
                >
                </input>
                <img src={imgSendMessage} 
                onClick={()=> { if(inputValue != "") {
                    createMessage(userMessage);
                    setInputValue("");
                }}}/>
            </div>
            </> 
            }
        </div>
    </>)
}
