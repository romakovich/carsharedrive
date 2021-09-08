import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../Assets/img/logo.svg';
import { Link } from 'react-router-dom';
import successRent from '../../Assets/img/Rent-page/success-rent.svg'
import { setSuccessRent } from '../../Store/CarPage/actions';


const SuccessRegistrationRent = ({}) => {

    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    return (
        <div className="success__container">
            <Link to="/" rel="nofollow">
                <img src={ logo } className="navbar__brand-text" alt="logo"/>
            </Link>
            <img className="success__container-img" src={successRent}/>
            <h2>Успех!</h2>
            <span className="success__container-text">Вы успешно забронировали автомобиль. 
Дождитесь подтверждения бронирования от владельца</span>
            <Link to="/" rel="nofollow">
                <button onClick={()=>dispatch(setSuccessRent(false))}>Перейти на главную</button>
            </Link>
        </div>
    )
}

export default SuccessRegistrationRent;
