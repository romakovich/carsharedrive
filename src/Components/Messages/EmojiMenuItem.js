import React from 'react';

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