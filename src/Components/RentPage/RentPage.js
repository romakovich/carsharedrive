import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import RentPageCar from '../../Containers/RentPage/RentPageCar';

import { useForm  } from 'react-hook-form';
import InputMenu from '../Global/InputMenu/InputMenu';
import { setAvailableCar, setAvailableCar2 } from '../../Store/Global/actions';
import { useSelector, useDispatch } from 'react-redux';
import { setFormatDate } from './SetFormatDate';
import iconMap from '../../Assets/img/Rent-page/icon-map.svg';
import iconLupa from '../../Assets/img/Rent-page/icon-lupa.svg';

import { YMaps, Map, Placemark } from "react-yandex-maps";
import { yandexMarker } from './yandexMarker';

export const RentPage = ({carsList
    , setCarsList, sortCarsList,
    firstCarLocation
    ,}) => {

    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    let [isFinder, setFinder] = useState(false);
    let [isMapOpen, setMapOpen] = useState(false);
    let [isMobilFinder, setMobilFinder] = useState(false);

    let [sort, setSort] = useState("price");
    
    const mapState = React.useMemo(() => ({ center: firstCarLocation, zoom: 13 }), [
        firstCarLocation,
    ]);
    
    const windowHeight = window.screen.height;

    const onSubmit = () => {
        new Date(availableCar) > new Date(availableCar2) ? dispatch(setAvailableCar2(availableCar)) : "";
        sortCarsList(setCarsList
            , {
                city: getValues().city,
                category: getValues().category,
                startRent: availableCar,
                endRent: availableCar2,
                sort: sort
            });                          
        setFinder(true);
        setMobilFinder(false)
    }

    useEffect(() => {
        sortCarsList(setCarsList
            , {
                city: getValues().city,
                category: getValues().category,
                startRent: availableCar,
                endRent: availableCar2,
                sort: sort
            });  

        fetch('http://localhost:8000/rent-car/start')
        .then(date => date.json()
        .then(json => {
            json.forEach(el=>{
                carsCity.push(el.city);
                carsCategory.push(el.category); 
            });
            
            setCarsCity([...new Set(carsCity)]);
            setCarsCategory([...new Set(carsCategory)]);
          
        }))
    }, []);

    const dispatch = useDispatch();
    const { register, getValues } = useForm({
        mode: 'onTouched',
    });

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);

    const finderHeading = useSelector(state => state.RentPage.finderHeading)

    return (
        <>
        <Header />
        <div className={isFinder ? "rent-page is-finder" : "rent-page" }>
            <div className={isMapOpen ? "rent-page-container finder" : "rent-page-container"}>
                {!isFinder && <h2>Арендуйте автомобиль</h2>}
                <form className={isFinder ? "rent-page-container__filter finder" : "rent-page-container__filter"} 
                onSubmit={e => e.preventDefault()}>
                    <div className="input-wrapper" style={{
                        position: isMobilFinder && "fixed",
                        width: isMobilFinder && "calc(90% - 12.5px)"
                    }}>
                        {isFinder && !isMobilFinder
                        ? <InputMenu allFilter 
                        onClick={()=>setMobilFinder(true)}
                        value={`${getValues().city} / ${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                        name="all" label="Поиск" idFilterAll="rent-all"
                        ref={register({ required: true })}
                        />
                        : ""}

                        <InputMenu list={carsCity} defaultValue="Санкт-Петербург" 
                        name="city" label="Местоположение" id="rent-city"
                        ref={register({ required: true })} cityFinder
                        isFinder={isFinder} isMobilFinder={isMobilFinder}
                        />

                        <InputMenu 
                        name="date" label="Период аренды" value={`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                        ref={register({ required: true })} id="rent-date"
                        datePicker stateDate={availableCar} stateDate2={availableCar2} 
                        stateDispatch={setAvailableCar} stateDispatch2={setAvailableCar2}
                        isFinder={isFinder} isMobilFinder={isMobilFinder}
                        />
                        
                        <InputMenu list={carsCategory} defaultValue="Легковая" 
                        name="category" label="Категория" category id="rent-category"
                        ref={register({ required: true })}
                        isFinder={isFinder} isMobilFinder={isMobilFinder}
                        />
                    </div>
                    <div className={isMapOpen ? "button-wrapper is-map" : (isFinder && !isMobilFinder ? "button-wrapper is-finder" : "button-wrapper")} 
                    style={{position: isMobilFinder && "fixed", top: isMobilFinder && "88%", width: isMobilFinder && "calc(90% - 12.5px)"}}
                    >
                        <button 
                        onClick={onSubmit}>{!isMapOpen ? "Найти "
                    : <img src={ iconLupa } ></img>
                    }</button>
                    </div>
                </form>
                {!isFinder 
                ? <span className="rent-page-recommend">Рекомендуем поблизости</span>
                : <div className="rent-page-container__sort">
                <div className="wrapper">
                    <button className={sort == "price" ? "active" : ""} onClick={()=>setSort("price")}>{sort == "price" ? "Цена ▲" : "Любая цена"}</button>
                    <button className={sort == "transmission" ? "active" : ""} onClick={()=>setSort("transmission")}>Любые КПП</button>
                    <button className={sort == "driveUnit" ? "active" : ""} onClick={()=>setSort("driveUnit")}>Любой привод</button>
                    <button className={sort == "engine" ? "active" : ""} onClick={()=>setSort("engine")}>Любые двигатели</button>
                </div>
                <div className="map-wrapper"
                onClick={()=> {
                    isMapOpen ? setMapOpen(false) : setMapOpen(true);
                    }}>
                    
                    {!isMapOpen && <> 
                    <img src={iconMap} /> 
                    <span className="open-map">Показать карту</span> </>}
                </div>
                
            </div>}

                <div className={isFinder ? "rent-page-container__cars finder" : "rent-page-container__cars"}>
                    {carsList.map((el, i) => {
                        return <RentPageCar key={i} index={i} 
                        isFinder={isFinder}
                        isMapOpen={isMapOpen}/>
                    })}
                </div>
            </div>
            
            {isMapOpen ? 
                <div className="yandex__map" 
                style={{ height: windowHeight, width: "100%", position: "sticky", top: "0"
                , display: "flex", flexDirection: "column" }}>
                    <div className="yandex__map-cancel"
                    onClick={()=>setMapOpen(false)}>×</div>
                    <YMaps >
                        <Map width="100%" height="100%"
                        state={mapState}
                        modules={[
                            "layout.ImageWithContent", 
                            'geoObject.addon.balloon', 
                            'geoObject.addon.hint',
                        ]}>
                            {carsList.map((el, i) => {
                                return <Placemark key={i} 
                                geometry={el.geo} 
                                properties={yandexMarker(el)}
                                options={{
                                    preset: 'islands#grayStretchyIcon',
                                }}/>
                            })}
                        </Map>
                    </YMaps> 
            </div>
           : ""}
        </div>
        <Footer />

            <div className={isMobilFinder 
                ? "mobil-finder__container" 
                : "mobil-finder__container is-disable"}>
                <div className="mobil-finder__container-wrapper">
                    <div className="mobil-finder__container-text">{finderHeading}</div>
                </div>
                <div className="mobil-finder__container-close"
                        onClick={()=>setMobilFinder(false)}
                    >×</div>

            </div>
        </>
    )
}
