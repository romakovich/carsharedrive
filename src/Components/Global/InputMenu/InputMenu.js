import React, { useEffect, useState } from 'react';
import DatePicker from '../Datepicker/DatePicker';
import InputMenuItem from './InputMenuItem';
import { useDispatch } from 'react-redux';
import { setFinderHeading, setSecondDate } from '../../../Store/RentPage/actions';
import iconLupaGreen from '../../../Assets/img/Rent-page/icon-lupa-green.svg';
import {filterCarBrand} from '../../NewCar/filterCarBrand';
import { filterCarCity } from './filterCarCity';
import { cityRegion } from '../../NewCar/city';

const InputMenu = React.forwardRef(({ 
    list=[],
    datePicker, category, cityFinder, allFilter, casco,
    menuBrand, menuCity, arrow,
    defaultValue,
    name, label, id, idFilterAll,
    value, placeholder, type,
    isMini, readOnly,
    stateDate, stateDate2
    , stateDispatch, stateDispatch2, 
    isFinder, isMobilFinder,
    onClick, unlockSubmit,
    errorName,
    setValue
}, ref) => {
    
    const dispatch = useDispatch();

    let [inputValue, setInputValue] = useState(defaultValue);

    let [isFocus, setFocus] = useState(false);

    let [menu, setMenu] = useState(list);
    let sortMenu = [...menu];
    
    if(errorName) {
        if(errorName.type == "required") { errorName.message = "Поле не должно оставаться пустым" }
        if(errorName.type == "validate") { errorName.message = "Необходимо ввести существующий город" }
    }

    let [datePickerEnabled, setDatePickerEnabled] = useState(false);

    return (<>
        <div className={isFinder && !isMobilFinder ? "input__menu__container is-finder" : "input__menu__container"} tabIndex="1" id={idFilterAll}
        style={{
        display: isMobilFinder && !datePicker && "block",
        position: isMobilFinder && isFocus && category && "absolute"
        }}
        >
            <div className="input__menu__container-select">
                <input className={isFocus ? (isMini ? "is-focus is-mini2" : "is-focus") : (isMini ? "is-mini2" : "")} 
                style={{borderColor: errorName && "#EB5757"}}

                name={name} autoComplete="off" id={id}
                placeholder={placeholder} readOnly={readOnly} type={type}
                onFocus={e=>{
                    if(name == "powerKWT") return;
                    setFocus(true); setMenu(menu => [...new Set(menu)]);
                    datePicker && (
                        setDatePickerEnabled(true), 
                        document.querySelector(".date-picker-container").focus()
                    );
                    
                    if(e.target.id == "rent-date") dispatch(setFinderHeading("Даты"))
                    if(e.target.id == "rent-category") dispatch(setFinderHeading("Категория"));
                    unlockSubmit && unlockSubmit();
                }} 
                onBlur={e=>{
                    setFocus(false);
                    if(e.target.id == "rent-category") dispatch(setFinderHeading("Поиск"));
                    
                }}
                
                onChange = {e => setInputValue(e.target.value)}
                value={datePicker || allFilter ? value : (menuBrand || menuCity ? defaultValue : inputValue)}
                
                onInput={e => {
                    if(menuBrand) return filterCarBrand(e.target.value, setMenu);
                    if(menuCity) return filterCarCity(e.target.value, setMenu);

                    sortMenu.forEach((el,i,arr) => {
                        let regExp = new RegExp('^' + e.target.value, "i");
                        regExp.test(el) && e.target.value != ""
                        ? (arr.splice(i,1), arr.unshift(el)) : ""
                    })
                    setMenu(sortMenu);
                    unlockSubmit && unlockSubmit();
                    
                }
            }
                onClick={onClick}
                
                ref = {ref}
                ></input>
                <label className={isFocus || inputValue != "" ? "is-focus" : ""}>{label}</label>
                {datePicker && <div className="icon-calendar"></div>}
                {allFilter 
                && <div className="icon-lupa-green" 
                style={{background: `url(${iconLupaGreen})` }}
                ></div>}
                {category || arrow ? <div className="icon-category">▼</div> : ""}
                {casco ? <a className="buy-casco" href="https://ru.wikipedia.org/wiki/%D0%9A%D0%B0%D1%81%D0%BA%D0%BE" target="_blank" rel="nofollow">Купить КАСКО</a> : ""}
            </div>
            
            {list 
            && <div className={isFocus 
                ? "input__menu__container-list is-focus" 
                : "input__menu__container-list" }
                style={{width: isMobilFinder ? "100%" : "329px"}}
            onBlur={()=>setFocus(false)}
            tabIndex="1">
            {sortMenu.map((el,i) => {
                return <InputMenuItem key={i} index={i} 
                city={el} selectedCity={inputValue} 
                category={category} menuCity
                region={cityRegion[i].region}
                
                onMouseDown={e=>{
                    setInputValue(category 
                        ? e.target.innerText.slice(0, e.target.innerText.indexOf("Категория")) 
                        : e.target.innerText.replace("🗸", "")); 
                    setInputValue(el);
                    setValue && setValue(name, el);
                     }
                }/>;
            })
            }
            </div>}
            {datePicker 
            && <DatePicker enabled="true" 
            stateDate={stateDate} stateDate2={stateDate2}
            stateDispatch={stateDispatch} stateDispatch2={stateDispatch2}
            enabled={datePickerEnabled} isMobilFinder={isMobilFinder}
            onBlur={()=>{
                setDatePickerEnabled(false); 
                dispatch(setSecondDate(false));
                dispatch(setFinderHeading("Поиск"));
            }}
            twoDate="true"
            />}
            {errorName ? <div className={"error"}>{errorName.message}</div> : ""}
        </div>
        
        </>
    )
})

export default InputMenu;

