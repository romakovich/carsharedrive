import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from '../../../Global/Datepicker/DatePicker';

const FormBlock = React.forwardRef(({ 
    label, name, type, value,
    autoComplete="off",
    hint=label, 
    isMini, 
    errorName,
    triggerForSubmit,
    changeType,
    password, 
    stateDate, stateDispatch
     }, ref) => {

    const [datePickerEnabled, setDatePickerEnabled] = useState(false);
    
    const openDatePicker = () => {
        datePickerEnabled 
        ? setDatePickerEnabled(false) 
        : setDatePickerEnabled(true)
    }

    useEffect(()=> {
        try {
            datePickerEnabled 
            && document.querySelectorAll(".date-picker-container")
            .forEach(el => el.style.opacity == 1 && el.focus())
        } catch (e) {}

    })
    
    const errMail = useSelector(state => state.registration.errMail);

    if(errorName) {
        if(errorName.type == "required") { errorName.message = "Поле не должно оставаться пустым" }
        else if(errorName.type == "minLength") { errorName.message = "Поле должно содержать больше символов" }
        else if(errorName.type == "maxLength") { errorName.message = "Поле должно содержать меньше символов" }
        else if(errorName.type == "validate") { errorName.message = "Пароли не совпадают" }
        else if(errorName.type == "pattern") { errorName.message = "Введите корректный адрес электронной почты" }
    }
    const date = new Date();
    let dateMinus14 = `${date.getFullYear()-14}-12-31`.toString();

    return (
    <>
    
    {/* PaddingBottomErrors */}
    <div className={errorName || (errMail && name=="mail") 
    ? "form-block invalid" : "form-block"}>
        
        <label>{label}</label>
        <div className={password ? "wrapper password-input" : (isMini ? "wrapper is-mini" : "wrapper")}>
            {type == "date" ? <div className={!isMini ? "icon-calendar" : "icon-calendar is-mini"}></div> : ""}
            <input name={name} ref={ref } autoComplete = {autoComplete}
            style={{cursor: type == "date" && "pointer"}}
            value={ value }
            onChange={()=> {
                triggerForSubmit && triggerForSubmit()
            }} onFocus={() => {
                triggerForSubmit && triggerForSubmit()
            }}
            onBlur={() => {
                triggerForSubmit && triggerForSubmit();
            }}
            max={ name == "birthday" ? dateMinus14 : "" }
            onClick={openDatePicker}
            /*Красная обводка*/
            className={(!isMini && !errorName ? "" 
            : isMini && errorName ? "is-mini invalid" : isMini ? "is-mini" 
            : errorName ? "invalid" : "") 
            || (errMail && name=="mail" ? "invalid" : "")}

            placeholder={hint} 
            
            />
            
            {type == "date" 
            ? <DatePicker onBlur={()=>setDatePickerEnabled(false) } 
            enabled={datePickerEnabled}
            stateDate={stateDate}
            stateDispatch={stateDispatch}/> : ""
            }
            {errorName && <span className={password ? "error-pass" : "error"}>{errorName.message}</span>}
            {errMail && name=="mail" ? <span className="error">{errMail}</span> : ""}
            
            {password && <span onClick={ changeType } className="hide-pass icon-eye-off"></span>}
            
            
        </div>
    </div>
    </>
)
})

export default memo(FormBlock);

