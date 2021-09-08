import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../Assets/img/logo.svg';
import success from '../../../Assets/img/success.svg';

import { useDispatch } from 'react-redux';
import { setFinishRegFalse } from '../../../Store/Registration/actions';

const Success = () => {
    useEffect(() => {
        document.title="SkillDrive. Регистрация завершена";
    });
    const dispatch = useDispatch();
    return (
        <div className="success__container">
            <Link to="/" rel="nofollow">
                <img src={ logo } className="navbar__brand-text" alt="logo"/>
            </Link>
            <img className='success__container-img' src={success} alt="Success" />
            <h2>Успех!</h2>
            <span className="success__container-text">Вы успешно зарегистрировались. Дождитесь проверки документов и начните пользоваться сервисом.</span>
            <Link to="/" rel="nofollow">
                <button onClick={()=>dispatch(setFinishRegFalse(false))}>Перейти на главную</button>
            </Link>
        </div>
    )
}
export default Success;