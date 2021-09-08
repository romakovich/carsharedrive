import React, { Fragment, useState } from 'react';

const answer = "Данный вопрос обсуждается с собственником, но как правило автомобиль нужно вернуть туда, где вы его получили."

const CollapsibleBlock = ({question}) => {

    let [isActive, setIsActive] = useState(false);
    const handleClick = () => { 
        isActive ? setIsActive(false) : setIsActive(true); 
    }

    return (
    <Fragment>
        <div className="questions__container-rect" onClick={handleClick}>
            <div>{question}</div>
            <div className={isActive ? "icon-arrow is-active" : "icon-arrow"}></div>
        </div>
        <div className={isActive ? "questions__container-answer is-active" 
        : "questions__container-answer"} 
        style={isActive ? {maxHeight: "100px"} : {maxHeight: "0"}}>{answer}</div>
    </Fragment>
)}

export default CollapsibleBlock;

