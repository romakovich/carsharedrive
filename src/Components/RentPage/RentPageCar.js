import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import iconCran from '../../Assets/img/Rent-page/icon-cran.svg';
import iconTechno from '../../Assets/img/Rent-page/icon-techno.svg';
import { setCarPage } from '../../Store/CarPage/actions';

export const RentPageCar = ({
    
    isFinder, isMapOpen, myCars,
    index
}) => { 

    const carPage = useSelector(state => state.CarPage.carPage);
    const carsList = useSelector(state => state.RentPage.carsList);

    const dispatch = useDispatch();

    useEffect(()=>{
    })

    let imgCar = carsList[index].photosCars[0];
    let nameCar = `${carsList[index].brand} ${carsList[index].model}, ${carsList[index].year}`;
    let priceCar = `${carsList[index].price} ₽/сутки`;
    let imgAvatar = `http://localhost:8000/img-car/${carsList[index].owner.mail}/avatar/avatar.jpg`;
    let ratingCar = carsList[index].rating;
    let power = carsList[index].power;
    let engine = carsList[index].engine;
    let transmission = carsList[index].transmission;
    let driveUnit = carsList[index].driveUnit;
    let ownerMail = carsList[index].owner.mail;

    let carPageId = `car-page?${carsList[index]._id}`;
    let userPageId = `user-page?${ownerMail}`;

    let registrationRentId = `registration-rent?${carsList[index]._id}`,
        carRentId = `registration-rent?${carsList[index]._id}`;


    return (<>
        <div className={isFinder ? "car-frame is-finder" : "car-frame"} >
            <Link to={carPageId}></Link>
            <div className="car-frame-car" 

            style={{backgroundImage: `url(${imgCar})`, backgroundSize: `cover`, backgroundRepeat:"no-repeat", width: "328px" }}>
            </div>
  
            {!myCars && <div className={isFinder ? "wrapper is-finder" : "wrapper"}>
                <Link className="user-page-link" to={userPageId}></Link>
                <div className="car-frame-avatar" 
                style={{backgroundImage:`url(${imgAvatar})`, backgroundSize: `cover`}}>

                </div>
            </div> }

            {isFinder 
            ? <div className="car-frame-info">
                <div className="car-frame-rating">
                    <span style={{color: "#F2C94C"}}>★</span> {`${carsList[index].rating} (${carsList[index].ratingCount})`} 
                </div>
                <div className={isFinder ? "car-frame-name finder" : "car-frame-name"}>{nameCar}</div>
                <div className={isMapOpen ? "car-frame-info-wrapper is-map-open" : "car-frame-info-wrapper"}>
                    <div className="car-frame-info-engine">
                        <img src={iconCran}/>
                        <span>2.0 л / {power} л.с. / {engine}</span>
                    </div>
                    <div 
                    className={isMapOpen 
                        ? "info-driveunit-map" 
                        : ""}>
                        <img className={!isMapOpen ? "img-driveunit-no-map" : ""}
                        src={iconTechno}/>
                        <span>{transmission} / {driveUnit}</span>
                    </div>

                </div>
                <p className="car-frame-price">{priceCar}</p>
            </div>
            : <div className="car-frame-name">{nameCar}
                <p>от {priceCar}</p>
            </div>
            }
            {isFinder && !isMapOpen && !myCars ?  
            <div className="car-frame-button-wrapper">
                <Link to={carRentId}></Link>
                <button className="car-frame-action">Арендовать</button>
            </div> : ""}
        </div>
    </>)
}