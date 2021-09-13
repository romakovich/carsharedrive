import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTrip, setCarPage } from '../../Store/CarPage/actions';
import Header from '../Global/Header/Header';
import SuccessRegistrationRent from './SuccessRegistrationRent';
import { Link } from 'react-router-dom';
import { setAvailableCar, setAvailableCar2 } from '../../Store/Global/actions';
import InputMenu from '../Global/InputMenu/InputMenu';
import { setFormatDate } from '../RentPage/SetFormatDate';
import { useForm  } from 'react-hook-form';
import Step2Item from '../NewCar/Step2Item';
import step2Service from '../NewCar/step2Service.json';
import { getDaysBetweenDates } from './scripts/getDaysBetweenDates';

export const RegistrationRent = ({
    
}) => {

    const carPage = useSelector(state => state.CarPage.carPage);

    let pageId = window.location.search.slice(1);

    const dispatch = useDispatch();
    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);
    
    const warning = useSelector(state => state.CarPage.warning);
    const successRent = useSelector(state => state.CarPage.successRent);

    const [tripPlan, setTripPlan] = useState("Хочу покататься");
    const { register } = useForm({
        mode: 'onTouched',
    });

    useEffect(()=>{
        dispatch(setCarPage(pageId));
    },[])

    const carOptions = useSelector(state => state.NewCar.step2Forms);
    const [carOptionsCount, setCarOptionsCount] = useState(0);

    useEffect(()=>{
        setCarOptionsCount(carOptions.reduce((a,b)=> a + b));
    },[carOptions, availableCar, availableCar2])

    if(!carPage[0]) return (<div><Header/></div>)
    if(successRent) return <SuccessRegistrationRent />
    return (<>
        <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
        <Header/>
        <div className="registration-rent__container">
            <div className="back-page-arrow">
                <span className="icon-back"></span>
                <span>Назад</span>
                <Link to={`car-page?${pageId}`}></Link>
            </div>
            <h2>Оформление аренды</h2>
            <h3>Состав заказа</h3>
            <div className="wrapper">
                <div className="registration-rent__container-order">

                    <div className="wrapper">
                        <img src={carPage[0].photosCars[0]}></img>
                        <div className="car-info">
                            <div>
                                <span style={{color: "#F2C94C"}}>★</span> {`${carPage[0].rating}`} <span>{`(${carPage[0].ratingCount})`}</span>
                            </div> 
                            <div>{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</div>
                            <div>{`${carPage[0].price} ₽ в сутки`}</div>
                        </div>

                    </div>

                </div>
            </div>
            <h3>Информация о поездке</h3>
                <div className="registration-rent__container-trip">
                    <div>
                        <span>Период аренды</span>
                        <InputMenu
                            name="date" value={`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                            ref={register({ required: true })} id="rent-date"
                            datePicker stateDate={availableCar} stateDate2={availableCar2} 
                            stateDispatch={setAvailableCar} stateDispatch2={setAvailableCar2}  
                        />
                    </div>
                    <div>
                        <span>Планы на поездку</span>
                        <textarea rows="8" value={tripPlan} onChange={e=>setTripPlan(e.target.value)}
                        placeholder="Опишите свои планы на поездку для вледельца автомобиля"> 
                        </textarea>
                    </div>
            </div>
            <h3 className="h3-options">Дополнительные услуги</h3>
            <div className="registration-rent__container-options">
                {carPage[0].options.map((el,i)=>{
                    if(carPage[0].options[i + 14] == "true") {
                        return <Step2Item key={i} index={i+14} service
                        text={step2Service.Services[i].service} 
                        description={step2Service.Services[i].description} 
                        />
                    }
                    
                })}
            </div>
            <div className="registration-rent__container-check">
                <div className="registration-rent__container-check-rect">
                    <h4>Ваш чек</h4>
                    <div className="wrapper">
                        <div className="registration-rent__container-check-left">
                            <div>Стоимость аренды</div>
                            <div>{`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}</div>
                            <div>Доп. услуги</div>
                            <div>Комиссия сервиса</div>
                        </div>
                        <div className="registration-rent__container-check-right">
                            <div>{getDaysBetweenDates(availableCar, availableCar2)*carPage[0].price} ₽</div>
                            <div style={{textDecoration: "line-through"}}>
                                {getDaysBetweenDates(availableCar, availableCar2)*carPage[0].price + carPage[0].price} ₽
                            </div>
                            <div>{carOptionsCount*1000} ₽</div>
                            <div>1000 ₽</div>
                        </div>
                    </div>
                    <div className="registration-rent__container-check-rect-strip"></div>
                    <div className="wrapper wrapper-price">
                        <div>К оплате</div>
                        <div>
                            {getDaysBetweenDates(availableCar, availableCar2)*carPage[0].price + 1000 + carOptionsCount * 1000} ₽
                        </div>
                    </div>
                </div>
                </div>
            <div className="submit-block">
                <div className="submit-block-rect"></div>
                <div className="button-wrapper">
                <button type="submit"
                onClick={()=>{
                    dispatch(createTrip(
                        getDaysBetweenDates(availableCar, availableCar2)*carPage[0].price + 1000 + carOptionsCount * 1000,
                        tripPlan
                    ))
                }}>Перейти к оплате</button>
                <div className="cssload-container">
                    {/* <div className={buttonLoad 
                        ? "cssload-zenith animate" : "cssload-zenith"}>
                    </div> */}
                    </div>
                </div>
            </div>

    </div>
      
    </>)
}
