import React, { useEffect, useState } from 'react';
import InputBlock from './inputBlock';
import { useForm  } from 'react-hook-form';

export const AllForms = ({ isFormForSend, isFormMailSent, userData,
    setFormForSend, 
    onAuth, onForgetPass,
    buttonLoad, errorServer }) => {

    const { register, handleSubmit, getValues, errors } = useForm({
        mode: 'onTouched',
        defaultValues: userData ? userData : false
    });

    const [errorMessage, setErrorMessage] = useState(false);
    const [submitLocked, setSubmitUnlock] = useState(false);

    const triggerForSubmit = () => {
        let isNotEmpty = Object.values(getValues())
        .every(el => el.length >= 6);

        isNotEmpty && !Object.values(errors).length 
        ? setSubmitUnlock(true) : setSubmitUnlock(false) 
    }

    useEffect(() => {
        try { 
            let errorsList = Object.values(errors);
            setErrorMessage(errorsList[errorsList.length-1].message); 
        } 
        catch (err) {}
    })

    const toForgetPass = () => { isFormForSend ? setFormForSend(false) : setFormForSend(true); }
    
    return (
        <div className="form-wrapper">
            <h2>{isFormMailSent 
            ? "Проверьте почту" : isFormForSend 
            ? "Восстановление пароля" : "Авторизация"}</h2>

            {isFormForSend || isFormMailSent 
            ? <div className={isFormMailSent 
            ? "modal__container-description mail-sent" : "modal__container-description"}>
                {isFormForSend ? "Мы отправим ссылку для восстановления пароля на вашу электронную почту" 
                : "Мы отправили письмо на вашу почту, пройдите по ссылке, которую мы отправили и измените пароль."}
            </div> : ""}

            <form onSubmit={handleSubmit(()=> { 
                isFormForSend ? onForgetPass(getValues()) : onAuth(getValues())
            })}> 
                <span className={Object.values(errors).length && !isFormForSend || errorServer ? "is-valid" : ""}>
                    {errorServer ? errorServer 
                    : (Object.values(errors).length ? errorMessage : "") }
                </span>

                {!isFormMailSent && <InputBlock name="mail" type="text" label="Электронная почта" autoComplete="on"
                errorName={errors.mail} triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, pattern: /\w+@\w+\.\w\w+/ })}/>}

                {(!isFormForSend && !isFormMailSent) && <InputBlock name="password" type="password" label="Пароль" 
                errorName={errors.password} triggerForSubmit={ triggerForSubmit }
                onClick={toForgetPass}
                ref={register({ required: true, minLength: 6 })}/>}
                
                {!isFormMailSent && <div className="button-wrapper">
                    <button className={submitLocked ? "" : "is-disable"}>
                        {!isFormForSend 
                        ? (!buttonLoad ? "Войти" : " ") 
                        : (!buttonLoad ? "Отправить" : " ")}</button>
                    <div className="cssload-container">
                    <div className={buttonLoad 
                        ? "cssload-zenith animate" : "cssload-zenith"}></div>
                    </div>
                </div>}
            </form>
        </div>
    )
}