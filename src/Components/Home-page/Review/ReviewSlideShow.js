import React, { Fragment } from 'react';

const ReviewSlideShow = ({img, name, city, monolog}) => (
    <Fragment>
        <img src={img} alt="Client's portrait" />
        <div className="wrapper__text">
            <span className="wrapper__text-name">{name}</span>
            <span className="wrapper__text-city">{city}</span>
            <span className="wrapper__text-monolog">{monolog}</span>
        </div>
    </Fragment>
)

export default ReviewSlideShow;