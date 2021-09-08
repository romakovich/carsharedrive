import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerDay from './DatePickerDay';
import { month } from './Month';

const DatePicker = ({onBlur
    , enabled
    , stateDate = [], stateDate2 = []
    , stateDispatch = [], stateDispatch2 = []
    , twoDate, carPage
    , isMobilFinder, forceSecondDate
}) => {

    const dispatch = useDispatch();
    const isSecondDate = useSelector(state => state.RentPage.isSecondDate);
    let newUserDate = isSecondDate || forceSecondDate ? stateDate2 : stateDate;

    let firstUserDay = [...newUserDate];
    firstUserDay[2] = 1;
    let userDay = new Date(firstUserDay).getDay();

    let lastDay = [...newUserDate];
    lastDay.length = 2;
    let amountDay;
    if(new Date(lastDay.concat([31])).getDate() == 31) {
        amountDay = 31
    } else if(new Date(lastDay.concat([30])).getDate() == 30) {
        amountDay = 30
    } else if(new Date(lastDay.concat([29])).getDate() == 29) {
        amountDay = 29
    } else if(new Date(lastDay.concat([28])).getDate() == 28) {
        amountDay = 28
    }

    let daysNumber = [];

    for (let index = 0; index < amountDay + (userDay - 1); index++) {
        daysNumber[index] = "";
    }

    for (let index = 0; index < amountDay; index++) {
        userDay != 0  
        ? daysNumber[index + (userDay - 1)] = index + 1
        : daysNumber[index + 6] = index + 1
    }

    let daysArray = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"]
    .concat(daysNumber)

    const setNewDate = (type, direction) => {
        let newDate = [...newUserDate];

        type == "month" 
        ? (direction == "left" 
        ? (newDate[1] == 1 
            ? (newDate[1] = 12, newDate[0] -= 1)
            : newDate[1] -= 1) 
        : (newDate[1] == 12
            ? (newDate[1] = 1, newDate[0] += 1)
            : newDate[1] += 1))
        :
        (direction == "left" 
        ? newDate[0] -= 1 : newDate[0] += 1);

        isSecondDate 
        ? dispatch(stateDispatch2(newDate)) 
        : dispatch(stateDispatch(newDate)) 
    }

    return (
        <div tabIndex="1" 
        className={isMobilFinder 
            ? "date-picker-container mobil-finder" 
            : "date-picker-container"}
        style={{opacity: enabled ? 1 : 0, pointerEvents: enabled ? "all" : "none"}} 
        onBlur={onBlur}
        >
            {!carPage ? <div className="date-picker-container__nav">
                <div className="date-picker-container__nav__month">
                    <span className="icon-arrow"
                    onClick={ ()=> setNewDate("month", "left") }>
                    </span>
                    <span className="month">{month[newUserDate[1] - 1]}</span>
                    <span className="icon-arrow"
                    onClick={ ()=> setNewDate("month", "right") }>
                    </span>
                </div>
                <div className="date-picker-container__nav__year">
                    <span className="icon-arrow"
                    onClick={ ()=> setNewDate("year", "left") }>
                    </span>
                    <span className="year">{newUserDate[0]}</span>
                    <span className="icon-arrow"
                    onClick={ ()=> setNewDate("year", "right") }>
                    </span>
                </div>
            </div> : ""}
            <div className="date-picker-container__calendar">
                {daysArray.map((el, i)=> 
                <DatePickerDay key={i}
                isSecondDate={isSecondDate} index={i} 
                day={el} year={newUserDate[0]} month={newUserDate[1]}
                stateDate={stateDate} stateDate2={stateDate2}
                stateDispatch={stateDispatch} stateDispatch2={stateDispatch2} 
                onBlur={onBlur}
                twoDate={twoDate}
                newUserDate={newUserDate}/> )}
            </div>
        </div>
    )
}

export default DatePicker;