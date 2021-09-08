import React, { Fragment } from 'react';

const CirclesBlock = ({span, isIcon, needLine}) => (  
    <Fragment>
        <div className="circles__container-wrapper">
            <div className="circles__container-wrapper-circle">
                <div className={isIcon.length > 1 ? isIcon : "number"}>{isIcon.length == 1 ? isIcon : ""}</div>
            </div>
            <span>{span}</span>
        </div>
        {needLine ? <div className="circles__container-line"></div> : ""}
    </Fragment>
)

export default CirclesBlock;