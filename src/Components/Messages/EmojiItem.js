import React from 'react';

const EmojiItem = ({
    emoji
}) => {
    return (<>
        <div className="emoji-item">
            {emoji}
        </div>
    </>)
}

export default EmojiItem;