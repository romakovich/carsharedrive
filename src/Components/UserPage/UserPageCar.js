import React from 'react';
import { Link } from 'react-router-dom';
import iconCran from '../../Assets/img/Rent-page/icon-cran.svg';
import iconTechno from '../../Assets/img/Rent-page/icon-techno.svg';

const UserPageCar = ({
    car, isMapOpen
}) => {

    return (<>
        <div className="car-frame" >
            <Link to={car._id}></Link>
            <div className="car-frame-car" 

            style={{backgroundImage: `url(${car.photosCars[0]})`, backgroundSize: `cover`, backgroundRepeat:"no-repeat", width: "328px" }}>
            </div>

            <div className="car-frame-info">
                <div className="car-frame-rating">
                    <span style={{color: "#F2C94C"}}>★</span> {`${car.rating} (${car.ratingCount})`} 
                </div>
                <div className="car-frame-name">{`${car.brand} ${car.model}, ${car.year}`}</div>
                <div className={isMapOpen ? "car-frame-info-wrapper is-map-open" : "car-frame-info-wrapper"}>
                    <div className="car-frame-info-engine">
                        <img src={iconCran}/>
                        <span>2.0 л / {car.power} л.с. / {car.engine}</span>
                    </div>
                    <div 
                    className={isMapOpen 
                        ? "info-driveunit-map" 
                        : ""}>
                        <img className={!isMapOpen ? "img-driveunit-no-map" : ""}
                        src={iconTechno}/>
                        <span>{car.transmission} / {car.driveUnit}</span>
                    </div>

                </div>
                <p className="car-frame-price">{car.price} ₽ в сутки</p>
            </div>
        </div>
    </>)
}

export default UserPageCar;