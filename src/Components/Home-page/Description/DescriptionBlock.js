import React from 'react';

const DescriptionBlock = ({h, img, alt, span}) => (
    <div className="main-description__container-block">
    <img src={ img } alt={ alt } />
    <div className="main-description__container-block-text">
        <h2>{ h }</h2>
        <span>{ span }</span>
    </div>
</div>
)

export default DescriptionBlock;