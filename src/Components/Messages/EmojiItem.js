import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

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