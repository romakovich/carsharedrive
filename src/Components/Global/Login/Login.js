import React, { useEffect } from 'react';
import closeImg from '../../../Assets/img/close.svg';
import back from '../../../Assets/img/back.svg';
import login from '../../../Assets/img/login.svg';
import forgetPass from '../../../Assets/img/forget-pass.svg';
import sentMail from '../../../Assets/img/sentMail.svg';
import { Link } from 'react-router-dom';
import AllForms from '../../../Containers/Login/AllForms';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../../Store/Login/actions';

export const Login = ({loginIsClose, closeLogin, isFormForSend, isFormMailSent, 
    errMailLogin, errPasswordLogin, setLoginButtonActive, setFormMailSent, setFormForSend}) => {

    const dispatch = useDispatch();
    useEffect(() => {
        let token = localStorage.getItem("accessToken"),
        userMail = localStorage.getItem("userMail");
        
        token && userMail && dispatch(setAuth(userMail))

        if(isFormForSend) { errMailLogin == false 
            ? setLoginButtonActive(false) : setLoginButtonActive(true) }
        else { errMailLogin == false && errPasswordLogin == false 
            ? setLoginButtonActive(false) : setLoginButtonActive(true) }
    }, [])

    const changeForm = () => { isFormForSend ? setFormForSend(false) : setFormForSend(true); }

    return (
        <>
        <div className={loginIsClose ? "modal__wrapper is-disable" : "modal__wrapper"}>
        <div className={isFormMailSent ? "modal__container mail-sent" : isFormForSend ? "modal__container forget-pass" : "modal__container"}>
            <div className={isFormMailSent ? "modal__container-nav mail-sent" : "modal__container-nav"}>
                {isFormMailSent ? "" :isFormForSend ? <img className="modal__container-nav-back" src={ back } alt="Закрыть" onClick={changeForm}/> : ""}
                <img className="modal__container-nav-close" src={ closeImg } alt="Закрыть" onClick={() => {closeLogin(true); setTimeout(() => {setFormMailSent(false)}, 300);}}/>
            </div>
            <img className="modal__container-img" 
            src={ isFormMailSent 
                ? sentMail : isFormForSend 
                ? forgetPass : login}
            />

            <AllForms />


            {isFormMailSent || isFormForSend ? "" : <div className="modal__container-rect"></div>}

            {isFormForSend || isFormMailSent ? "" : <Link to="/registration" 
            onClick={() => closeLogin(true)}>Зарегистрироваться</Link>}
        </div>
        </div>
        <div className={loginIsClose ? "plug is-disable" : "plug"} />
    </>
    )
}