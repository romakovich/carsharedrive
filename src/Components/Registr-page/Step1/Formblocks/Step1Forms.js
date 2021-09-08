import React, { useEffect, useState } from 'react';
import FormBlock from './FormBlock';
import { useForm  } from 'react-hook-form';
import { useSelector } from 'react-redux';
import OnSubmit from '../../../../Containers/Registration/Step1/OnSubmit';

import { setUserBirthday
    , setUserPassportDate
    , setUserDriverDate} from '../../../../Store/Global/actions';
import { setFormatDate } from '../../../RentPage/SetFormatDate';

export const Step1Forms = ({
    setRegButtonActive1,
    submitFormsStep1,
    isStep1,
    userData
}) => {

    const { register, handleSubmit, getValues, errors } = useForm({
        mode: 'onTouched',
        defaultValues: userData && userData
    });

    let userBirthday = useSelector(state => [...state.global.userBirthday]);
    let userPassportDate = useSelector(state => [...state.global.userPassportDate]);
    let userDriverDate = useSelector(state => [...state.global.userDriverDate]);

    const triggerForSubmit = () => {
        let isNotEmpty = Object.values(getValues())
        .every(el => el.length >=6 );

        isStep1 && isNotEmpty && !Object.values(errors).length 
        ? setRegButtonActive1(true) : setRegButtonActive1(false) 
    }

    const [ hiddenPassword, showPassword ] = useState(false);
    const changeTypePasswords = () => {
        hiddenPassword ? showPassword(false) : showPassword(true)
    }
    useEffect(()=> {

    })

    return (
        <>
        
        <form onSubmit={handleSubmit(()=> {
            isStep1 ? submitFormsStep1(getValues()) : console.log("test")
        } )}>
            <div className="form-container">
            <fieldset>
            <legend>Информация о вас</legend>
                <FormBlock label="ФИО" hint="ФИО полностью" name="name"
                autoComplete="on"
                errorName={errors.name}
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 6 })}/>

                <FormBlock label="Дата рождения" hint="00.00.0000" name="birthday" type="date"
                value = {setFormatDate(userBirthday, true)} typeDate="userBirthday"
                stateDate = {userBirthday}
                stateDispatch={setUserBirthday}
                errorName={errors.birthday} isMini
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true })}/>
                
                <FormBlock label="Электронная почта" hint="mail@example.com" name="mail" 
                autoComplete="on"
                errorName={errors.mail}
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, pattern: /\w+@\w+\.\w\w+/, minLength: 6 })}/>

                <FormBlock label="Телефон" isMini hint="+7 900 000-00-00" name="phone" 
                errorName={errors.phone} type="number"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 11, maxLength: 13 })}/>
            </fieldset>
            <fieldset>
            <legend>Паспорт</legend>
                <FormBlock label="Серия и номер" isMini hint="0000 000000" name="passport" 
                errorName={errors.passport} type="number"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 10, maxLength: 10 })}/>

                <FormBlock type="date" hint="00.00.0000" label="Дата выдачи" 
                name="passportDate" value = {setFormatDate(userPassportDate, true)}
                errorName={errors.passportDate}
                stateDate = {userPassportDate}
                stateDispatch={setUserPassportDate}
                typeDate="userPassportDate"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true })}/>

                <FormBlock label="Название органа выдавшего паспорт" name="passportOrgan" 
                errorName={errors.passportOrgan}
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 6 })}/>

                <FormBlock label="Код подразделения" isMini name="passportCode" 
                errorName={errors.passportCode} type="number"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, maxLength: 6, minLength: 6})}/>
            </fieldset>
            <fieldset>
            <legend>Водительское удостоверение</legend>
                <FormBlock label="Серия и номер" hint="0000 000000" name="driver" 
                errorName={errors.driver} type="number"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, maxLength: 10, minLength: 10})}/> 

                <FormBlock type="date" isMini hint="00.00.0000" label="Дата выдачи" 
                name="driverDate" value = {setFormatDate(userDriverDate,true)}
                stateDate = {userDriverDate}
                stateDispatch={setUserDriverDate}
                errorName={errors.driverDate}
                typeDate="userDriverDate"
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true })}/>
            </fieldset> 
            <fieldset>
            <legend>Пароль</legend>
            <FormBlock label="Придумайте пароль" name="password" password
            type={hiddenPassword ? "text" : "password"} changeType={changeTypePasswords}
                errorName={errors.password}
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 6 })}/>

            <FormBlock label="Повторите пароль" name="passwordRepeat" type="password" password
            type={hiddenPassword ? "text" : "password"} changeType={changeTypePasswords}
                errorName={errors.passwordRepeat}
                triggerForSubmit={ triggerForSubmit }
                ref={register({ required: true, minLength: 6, validate: value => value == getValues().password })}/>
            </fieldset>
            </div>

            < OnSubmit />

        </form>
        </>
    )
}