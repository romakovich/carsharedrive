import React from 'react';
import { month as monthName} from '../Global/Datepicker/Month';

const CarPageReview = ({
    trip
}) => {

    const setFormatName = (name) => {
        return name.slice(0, name.indexOf(" "))
        + " "
        + name.slice(name.lastIndexOf(" "))[1] 
        + "."
    }

    const name = setFormatName(trip.clientInfo.name),
        date = `${monthName[new Date(trip.endRent).getMonth()]} ${new Date(trip.endRent).getFullYear()}`,
        text = trip.review;

    return (<>
        <div className="review">
            <div className="wrapper">
                <img src={`http://localhost:8000/img-car/${trip.client}/avatar/avatar.jpg`}></img>
                <div className="name">{name}
                    <p>{date}</p>
                </div>
            </div>
            <div className="text">
                {text}
            </div>
            
        </div>
    </>)
}

export default CarPageReview;