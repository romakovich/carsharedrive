import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from '../Global/Datepicker/DatePicker';
import Header from '../Global/Header/Header';
import { step2Options } from '../NewCar/step2Options';
import iconSlideShow from '../../Assets/img/Rent-page/slideShow.svg';
import { setFormatName } from './scripts/setFormatName';
import { changePhoto } from './scripts/changePhoto';
import { setDateName } from './scripts/setDateName';
import CarPageReview from './CarPageReview';

export const CarPage = ({
    warning, setCarPage,
    carPage, buttonLoad,
}) => {

    useEffect(()=>{
        setCarPage(window.location.search.slice(1));
    },[])



    const setCarsRent = () => {
        let carRentId = `registration-rent?${carPage[0]._id}`;
        return carRentId;
    }

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);

    const availableCarNext = [...availableCar];
    availableCarNext[1]+=1;

    const [isSlideShow, setSlideShow] = useState(false);
    const [photoNumber, setPhotoNumber] = useState(1);

    const areMonthsSame = new Date(availableCar).getMonth() == new Date(availableCar2).getMonth();

    if(!carPage[0]) return (<div><Header/></div>)
    return (<>
    <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
    <Header />

    <div className="car-page__container">
        <div className="back-page-arrow">
            <span className="icon-back"></span>
            <span>Назад</span>
            <Link to="rent-page"></Link>
        </div>
        <div className="photo__container">
            <div className="wrapper">
                <div className="main">
                    <img src={carPage[0].photosCars[0]} 
                    onClick={()=>{
                        setPhotoNumber(1)
                        setSlideShow(true)}}/>
                    <div className="main-icon" onClick={()=>setSlideShow(true)}>
                        <img src={iconSlideShow}></img>
                    </div>
                </div>
                {carPage[0].photosCars.length > 1 ? 
                <div className="mini">
                    <div>
                        <img src={carPage[0].photosCars[1]} 
                        onClick={()=>{
                            setPhotoNumber(2)
                            setSlideShow(true)}}></img>
                    </div>
                    {carPage[0].photosCars.length > 2 
                    ? <div>
                        <img src={carPage[0].photosCars[2]} 
                        onClick={()=>{
                            setPhotoNumber(3)
                            setSlideShow(true)}}></img>
                        {carPage[0].photosCars.length > 3 
                        ? <div className="mini-plus"
                        onClick={()=>setSlideShow(true)}>
                            + ещё {carPage[0].photosCars.length - 3} фото
                        </div> 
                        : ""}
                    </div> : ""}
                    
                </div> : ""}
            </div>
        </div>
        <h2 className="h2-mobil">{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</h2>
        <div className="owner__container">
            <h2>{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</h2>
            <div 
            className={carPage[0].owner.mail == localStorage.getItem("userMail")
            ? "owner__container-rect you"
            : "owner__container-rect"}>
                <img className="owner__container-rect-photo"
                src={`${carPage[0].owner.imgAvatar}`}></img>
                <div className="owner__container-rect-name">{setFormatName(carPage[0].owner.name)}
                    <div>
                        {carPage[0].owner.mail == localStorage.getItem("userMail") 
                        ? "Это вы" 
                        : "Владелец"}
                    </div>
                </div>
                {carPage[0].owner.mail == localStorage.getItem("userMail") 
                ? "" 
                : <Link className="user-page-link" to={`user-page?${carPage[0].owner.mail}`}>Посмотреть профиль</Link>}
            </div>  
        </div>
         <div className="price__container">
            <div className="price__container-item">{`${carPage[0].price} ₽/сут.`}
                <p>обычная аренда</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price3} ₽/сут.`}
                <p>при аренде на 3 дня</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price5} ₽/сут.`}
                <p>при аренде более 5 дней</p>
            </div>
        </div>
        <h3 className="h3-charact">Характеристики</h3>
        <h3 className="h3-mobil">Характеристики</h3>
        <div className="characteristics__container">
            <div className="characteristics__container-keys">
                <div>Год выпуска</div>
                <div>Двигатель</div>
                <div>Трансмиссия</div>
                <div>Привод</div>
                <div>Пробег</div>
            </div>
            <div className="characteristics__container-props">
                <div>{carPage[0].year}</div>
                <div>{`${carPage[0].volume} л / ${carPage[0].power} л.с. / ${carPage[0].engine}`}</div>
                <div>{carPage[0].transmission}</div>
                <div>{carPage[0].driveUnit}</div>
                <div>{`${carPage[0].mileage} км`}</div>
            </div>
        </div>
        <div className="submit-block-rect"></div>
        <h3>Опции</h3>
        <div className="options__container">
            {carPage[0].options.map((el, i)=> {
                return (
                    el == "true" 
                    ? <div className={`icon-newCar${i}`} key={i}>
                        <span>{step2Options[i]}</span>
                    </div>
                    : ""
                )
            })}
        </div>
        <div className="submit-block-rect"></div>
        <h3>Доступность</h3>
        <div className="calendar__container">
            <div className="calendar__container-date">{setDateName(availableCar)}
                <DatePicker enabled="true" twoDate carPage
                stateDate={availableCar} stateDate2={availableCar2}
                />
            </div>
{           !areMonthsSame ? 
            <div className="calendar__container-date">{setDateName(availableCar2, areMonthsSame)}
            <DatePicker enabled="true" twoDate={true} forceSecondDate carPage
                stateDate={availableCar} stateDate2={availableCar2}
                />
            </div> : ""}
        </div>
        <div className="submit-block-rect"></div>
        <h3>Отзывы</h3>
        <div className="rating">
            <span style={{color: "#F2C94C"}}>★</span> {carPage[0].rating} <span style={{color: "#8D8B99"}}>
                {` (отзывов: ${carPage[0].ratingCount})`}
            </span>
        </div>
        <div className="reviews">
            {carPage[0].trips.map((trip, i)=>{
                if(trip.review) return <CarPageReview trip={trip} key={i}/>
            })}
        </div>
        <div className="submit-block-rect last"></div>
        <div className="button-wrapper">
            {carPage[0].owner.mail == localStorage.getItem("userMail") 
            ? ""
            : <Link to={setCarsRent()}></Link>}
            <button type="submit"
            onClick={()=>{
                carPage[0].owner.mail == localStorage.getItem("userMail") 
                ? console.log("Редактирование") 
                : console.log("Переход к аренде") 
                }}>
            {buttonLoad ? " " 
            : (carPage[0].owner.mail == localStorage.getItem("userMail") 
            ? "Редактировать"
            : "Арендовать")}
            </button>
            <div className="cssload-container">
                <div className={buttonLoad 
                    ? "cssload-zenith animate" : "cssload-zenith"}>
                </div>
            </div>
            </div>
    </div>
    <div className={isSlideShow ? "slide-show__container" : "slide-show__container is-disable"}>
        <div className="slide-show__container-number">{`${photoNumber} из ${carPage[0].photosCars.length} фото`}</div>
        <div className="slide-show__container-frame">
            <div className="icon-arrow arrow-1" 
            onClick={()=>changePhoto("left", carPage, setPhotoNumber, photoNumber) }>
            </div>
            <img src={carPage[0].photosCars[photoNumber-1]}
             ></img>
            <div className="icon-arrow arrow-2" 
            onClick={()=>changePhoto("right", carPage, setPhotoNumber, photoNumber)}>
            </div>
        </div>
        <div className="slide-show__container-close" onClick={()=>setSlideShow(false)}>×</div>
        </div>
    </>)

}
