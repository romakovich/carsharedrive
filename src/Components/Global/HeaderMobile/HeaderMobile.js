import React, { useState } from 'react';
import logoMobile from '../../../Assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderMobile = ({onClick}) => {

    const isAuth = useSelector(state => state.login.isAuth);
    const [name, setName] = useState(localStorage.getItem("userName"));

    return (
    <div className="mobile__wrapper is-mobile is-animated is-active">
        <Link to="/" rel="nofollow">
            <img src={ logoMobile } className="navbar__brand-mobil" alt="logo" />
        </Link>
        <div className="menu__mobile-container">
            <nav className="menu__mobile">
                <Link to={isAuth ? "/rent-page" : "/about"} className="menu__mobile-link is-animated" rel="nofollow">{isAuth ? "Бронирования" : "О нас"}</Link>
                <div className="menu__mobile-rect"></div>
                <Link to={isAuth ? "/my-cars" : ""} className="menu__mobile-link is-animated">{isAuth ? "Мои автомобили" : "Условия"}</Link>
                <div className="menu__mobile-rect"></div>
                <Link to="/questions" className="menu__mobile-link is-animated" rel="nofollow">{isAuth ? "Сообщения" : "Частые вопросы"}</Link>
            </nav>
            {isAuth 
            ? <div className="menu__mobile-avatar">
                <img src={`http://localhost:8000/img-car/${localStorage.getItem("userMail")}/avatar/avatar.jpg`} 
                href="" target="_blank" rel="nofollow"></img> 
                {name}
            </div>

            : <div className="menu__login is-animated" href="" target="_blank" rel="nofollow" onClick={onClick}>Войти</div>
        }
        </div>
    </div>
    )
}

export default HeaderMobile;