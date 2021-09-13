import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Containers/Header/Header';
import RentPageCar from '../../Containers/RentPage/RentPageCar';
import ferrari from '../../Assets/img/Rent-page/ferrari.svg'
import { Link } from 'react-router-dom';

export const MyCars = ({
    sortCarsList, setCarsList,
    
}) => {

    useEffect(()=> {
        sortCarsList(
            setCarsList, null, localStorage.getItem("userMail")
        );
    }, [])
    
    const carsList = useSelector(state => state.RentPage.carsList);

    return ( <>
        <Header />
        <div className="mycars__container">
            <div style={{alignItems: !carsList.length && "center"}} className="mycars__container-wrapper">
                {carsList.length ? <h2>Мои автомобили</h2> : ""}
                {carsList.length ? carsList.map((el, i) => {
                    return <RentPageCar key={i} index={i} isFinder="true" myCars="true"/>
                }) : ""}
                {!carsList.length 
                && 
                <>
                
                <img className="mycars__container-wrapper-ferrari" src={ferrari}></img>
                <h2>Зарабатывайте на своём автомобиле</h2>
                <span>Сдавайте автомобиль в аренду и получайте заработок.</span>
                </>
                }
            </div>
        </div>
        {carsList.length ? <div className="submit-block-rect"></div> : ""}
        <div className={carsList.length ? "button-wrapper-mycar" : "button-wrapper-mycar empty"}>
        <Link to="/new-car" rel="nofollow">
            <button>Добавить автомобиль</button>
        </Link>
            
        </div>
        </>
    )
}
