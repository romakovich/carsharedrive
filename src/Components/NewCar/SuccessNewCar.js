import React from 'react';
import logo from '../../Assets/img/logo.svg';
import { Link } from 'react-router-dom';
import succesImg from '../../Assets/img/successNewCar.svg';
import { useDispatch } from 'react-redux';
import { setStep } from '../../Store/NewCar/actions';

const SuccessNewCar = ({

}) => {

    const dispatch = useDispatch();

    return (<>
        <div className="success__container">
            <Link to="/" rel="nofollow">
                <img src={ logo } className="navbar__brand-text" alt="logo"/>
            </Link>
            <img className='success__container-img' src={succesImg} alt="Success" />
            <h2>Успех!</h2>
            <span className="success__container-text">Автомобиль добавлен. Дождитесь, когда указанная вами информация
пройдёт проверку модераторами.</span>
            <Link to="/" rel="nofollow">
                <button onClick={()=>dispatch(setStep(1))}>Перейти на главную</button>
            </Link>
        </div>
    </>)
}

export default SuccessNewCar;

