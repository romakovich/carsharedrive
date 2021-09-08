import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondDate } from '../../../Store/RentPage/actions';

const DatePickerDay = ({ day, month, year
    , index
    , onBlur
    , stateDispatch, stateDispatch2
, stateDate, stateDate2, twoDate,
 }) => {

    
    let [dayReserve, setDayReserve] = useState(false);
    /*Второе состояние - пофиксить конечную дату*/
    let [dayReserveFixed, setDayReserveFixed] = useState(false);

    const carPage = useSelector(state => state.CarPage.carPage);

    useEffect(()=> {
        const setCalendarReserve = () => {
            if(!/car-page/.test(location.href)) return;
            let trips = [...carPage[0].trips];
            trips.map(trip=>{
                let startRent = new Date(trip.startRent),
                    endRent = new Date(trip.endRent);
                
                if(startRent <= new Date([year, month, day])
                && endRent >= new Date([year, month, day])) {
                    setDayReserve(true);
                }
                
                let endRentFixed = endRent.setDate(endRent.getDate()+1);
                if(startRent <= new Date([year, month, day])
                && endRentFixed >= new Date([year, month, day])) {
                    setDayReserveFixed(true);
                }
            })
        }
        setCalendarReserve();
    },[carPage])
    
    //setDayReserve(true)

    const dispatch = useDispatch();
    const isSecondDate = useSelector(state => state.RentPage.isSecondDate);

    const [dayActive, setDayActive] = useState(false);
    const setDay = () => {
        !dayActive && setDayActive(true);
        let newDate = isSecondDate ? [...stateDate2] : [...stateDate];
        newDate[2] = day;
        
        if(!twoDate) return (dispatch(stateDispatch(newDate)), onBlur());
        
        isSecondDate 
        ? (dispatch(stateDispatch2(newDate))
        ,onBlur() 
        ,dispatch(setSecondDate(false)
        ))
        : (dispatch(stateDispatch(newDate))
        , dispatch(setSecondDate(true)
        ))
    };

    return (
        <div className={
            new Date([year, month,day]) > new Date(stateDate) 
            && new Date([year, month,day]) < new Date(stateDate2) && !dayReserve
            ? "marking-date interval"
            : "marking-date"
        }
        style={{
            background: 
            (
                stateDate[2] == day 
                && stateDate[0] == year 
                && stateDate[1] == month
                && twoDate && !dayReserve
                ? "linear-gradient(to left, #DFECEB 50%, white 50% )" 
            : (stateDate2[2] == day 
                && stateDate2[0] == year 
                && stateDate2[1] == month 
                && twoDate && !dayReserveFixed
                ? "linear-gradient(to right, #DFECEB 50%, white 50% )" : ""))
        }}>
            <div onMouseDown={()=> {index >= 7 && day!="" ? setDay() : ""
            }}

            className={
                (stateDate[2] == day && stateDate[0] == year && stateDate[1] == month 
                && !dayReserve) 
                || 
                (stateDate2[2] == day && stateDate2[0] == year && stateDate2[1] == month
                && !dayReserveFixed) 
            ? "active" : ""}>
                    <span className={index > 7 ? (dayReserve ? "reserve" : "") : "interval"}
                    style={{color: index < 7 && "#B1B1B1"
                    , cursor: index < 7 ? "auto" : "pointer"
                    }}>
                        {day}
                    </span>
            </div>
        </div>
    )
}

export default DatePickerDay;