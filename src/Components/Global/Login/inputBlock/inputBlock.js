import React, { memo, useState } from 'react';

const InputBlock = React.forwardRef(({
    type, label, name, autoComplete="off",
    errorName,
    triggerForSubmit,
    onClick,
    value, focusDefault = false,
    resetPass}, ref) => {
    
    let [isFocus, setFocus] = useState(focusDefault);
    if(errorName) {
        if(errorName.type == "required") { errorName.message = "Поле не должно оставаться пустым" }
        else if(errorName.type == "minLength") { errorName.message = "Поле должно содержать больше символов" }
        else if(errorName.type == "maxLength") { errorName.message = "Поле должно содержать меньше символов" }
        else if(errorName.type == "validate") { errorName.message = "Пароли не совпадают" }
        else if(errorName.type == "pattern") { errorName.message = "Введите корректный адрес электронной почты" }
    }

    return ( <>

        <div className="input-container">

            <input type={type} ref={ref} name={name} autoComplete={autoComplete} 
            onChange={triggerForSubmit} value ={value} onBlur={e=>{
                e.target.value != "" ? setFocus(true) : setFocus(false); 
                triggerForSubmit()}} 
                onFocus={e => {
                    //e.target.style.border = "green";
                    setFocus(true); 
                    triggerForSubmit()}} 
            className={errorName ? "is-valid" : ""} />

            <label 
            className={!isFocus && !errorName 
            ? "" : isFocus && errorName 
            ? "is-focus is-valid" : isFocus 
            ? "is-focus" : errorName 
            ? "is-valid" : ""}>{label}
            </label>

            {(type=="password" && !resetPass)
            && <div className="forget-pass" 
            onClick={onClick}>Забыли?
            </div>}
            
        </div>
       
 
</>
    )
})

export default memo(InputBlock);
