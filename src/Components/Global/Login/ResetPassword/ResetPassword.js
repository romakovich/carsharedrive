import React, { useEffect, useState } from 'react';
import InputBlock from '../inputBlock/InputBlock';
import login from '../../../../Assets/img/login.svg';
import closeImg from '../../../../Assets/img/close.svg';
import { Link } from 'react-router-dom';

import { Redirect } from 'react-router';
import { useForm  } from 'react-hook-form';

export const ResetPassword = ({ userData, 
    onResetPass, 
    buttonLoad, 
    resetPassSuccess, 
    errorServer }) => {

    const [errorMessage, setErrorMessage] = useState(false);
    const [submitLocked, setSubmitUnlock] = useState(false);

    const triggerForSubmit = () => {
        let isNotEmpty = Object.values(getValues())
        .every(el => el.length >= 6);

        isNotEmpty && !Object.values(errors).length 
        ? setSubmitUnlock(true) : setSubmitUnlock(false) 
    }

    const { register, handleSubmit, getValues, errors } = useForm({
        mode: 'onTouched',
        defaultValues: userData ? userData : false
    });

    
    useEffect(() => {
        try { 
            setErrorMessage(Object.values(errors)[Object.values(errors).length-1].message);
        } catch (err) {}
    })

    if(resetPassSuccess) return ( <Redirect to="/" /> )
    return (
        <>
        <div className="reset-container">
            <div className="reset-form">
            <Link to="/">
            <img src={closeImg} className="close"/>
            </Link>
                <img src={login} />
                <h2>Форма для восстановления пароля</h2>
                <span className={Object.values(errors).length || errorServer ? "is-valid" : ""}>{
                Object.values(errors).length && errorMessage 
                ? errorMessage : (errorServer ? errorServer : "")}</span>
                <form onSubmit={handleSubmit(()=>onResetPass(getValues()))}>

                    < InputBlock type="text" mail label="Введите почту" name="mail" autoComplete="on"
                    errorName={errors.mail} triggerForSubmit={ triggerForSubmit }
                    ref={register({ required: true, pattern: /\w+@\w+\.\w\w+/ })}/>
                    < InputBlock type="password" label="Введите новый пароль" name="password" resetPass
                    errorName={errors.password} triggerForSubmit={ triggerForSubmit }
                    ref={register({ required: true, minLength: 6 })} />
                    < InputBlock type="password" label="Повторите новый пароль" name="passwordRepeat" resetPass 
                    errorName={errors.passwordRepeat} triggerForSubmit={ triggerForSubmit }
                    ref={register({ required: true, minLength: 6, validate: value => value == getValues().password })}/>
                    
                    <div className="button-wrapper">
                        <button className={submitLocked ? "" : "is-disable"}>
                            {buttonLoad ? " " : "Сбросить пароль"}
                        </button>
                        <div className="cssload-container">
                        <div className={buttonLoad 
                            ? "cssload-zenith animate" : "cssload-zenith"}></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}