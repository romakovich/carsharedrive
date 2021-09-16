import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Containers/Header/Header';
import { setFormatName } from '../CarPage/scripts/setFormatName';
import Footer from '../Global/Footer/Footer';
import UserPageCar from './UserPageCar';

export const UserPage = ({
    getUser, userPage,
}) => {

    useEffect(()=>{
        getUser(window.location.search.slice(1));
    }, [])

    if(!userPage) return (<>
        <Header />
        <Footer />
    </>)
    return (<>
        <Header />
        <div className="user-page__container">
            <img className="user-page__container-avatar" 
            src={`http://localhost:8000/img-car/${userPage.mail}/avatar/avatar.jpg`}/>
            <h3>{setFormatName(userPage.name)}</h3>
            <div className="user-page__container-rate">
                {[0,1,2,3,4].map(el=>{
                    return <div className="rate-item">★</div>
                }
                )}
            </div>
            {userPage.mail != localStorage.getItem("userMail") 
            ? <Link className="user-page__container-tochat" to="messages">Написать в чат</Link>
            : ""}
            <div className="user-page__container-info">
                <div className="user-page__container-info-left">
                    <div>Дата рождения
                        <div className="mobil">{userPage.birthday.replaceAll("-", ".")}</div>
                    </div>
                    <div className="user-page__container-info-item">Телефон
                        <div className="mobil">{userPage.phone}</div>
                    </div>
                    <div className="user-page__container-info-item">Эл. почта
                        <div className="mobil">{userPage.mail}</div>
                    </div>
                </div>
                <div className="user-page__container-info-right">
                    <div className="no-mobil">{userPage.birthday.replaceAll("-", ".")}</div>
                    <div className="no-mobil">{userPage.phone}</div>
                    <div className="no-mobil">{userPage.mail}</div>
                </div>
            </div>
            <h3>Автомобили</h3>
            <div className="mycars__container">
                <div className="mycars__container-wrapper">
                {userPage.cars.length ? userPage.cars.map((el, i) => {
                    return <UserPageCar car={el} isFinder="true" myCars="true"/>
                }) : ""}
                </div>
            </div>
        </div>
        <Footer />
    </>)
}
