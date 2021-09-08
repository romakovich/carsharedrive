import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmojiMenuItem = ({
    emoji, setEmojiMenu, 
    payload, updateMessage
}) => {

    return (<>
        <div className="emoji-item" 
        onClick={()=>{
            setEmojiMenu(false);
            console.log(emoji)
            updateMessage(payload.time, {emoji})
        }}>
            {emoji}
        </div>
    </>)
}

export default EmojiMenuItem;