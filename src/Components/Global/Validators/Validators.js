export const validatorOnBlur = (el, setSt, len, pattern, min, max) => {
    if(el.length != len && len) { setSt(`Поле должно содержать ${len} символов`);}
    else if(pattern && !pattern.test(el)) { setSt('Введите корректный адрес электронной почты') }
    else if(el.length < min) { setSt(`Поле должно содержать больше символов`) } 
    else if(el.length > max) { setSt('Поле должно содержать меньше символов') }
    else { setSt('') } }

export const validatorOnChange = (el, setSt, len, pattern, min, max) => {
    if(el.length == (len-1) && len) { setSt(``);}
    else if(pattern && pattern.test(el)) { setSt('') }
    else if(el.length > (min-2)) { setSt(``) }
    else if(el.length < max) { setSt('') } }