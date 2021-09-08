import React from 'react';

const TeamName = ({name, profession, imgName}) => (
    <div className="teams__item">
        <img src={imgName} alt={name + " " + profession} />
        <div className="teams__item-name-text">
            <span>{name}</span><br />
            <span>{profession}</span>
        </div>
    </div>
)

export default TeamName;