import { createAction } from "@reduxjs/toolkit";
import { callWithToken } from "../../Components/Global/CallApi/chectToken";
import { getGeo } from "../config/getGeo";
import * as error from '../Constants/Errors';

export const setStep = createAction('SET_STEP');

export const setStep1FormsRequest = createAction('SET_STEP1_FORMS_REQUEST');
export const setStep1FormsSuccess = createAction('SET_STEP1_FORMS_SUCCESS');
export const setStep1FormsFailure = createAction('SET_STEP1_FORMS_FAILURE');
export const setStep1Forms = data => {
    return (dispatch, getStore) => {
        
        dispatch(setStep1FormsRequest());
        callWithToken("http://localhost:8000/rent-car/step1", 'POST', data)
            .then(response => {
            dispatch(setStep1FormsRequest());
            if(!response.ok) {
                dispatch(setStep1FormsFailure(error.CODE_401_CAR));
                setTimeout(() => { dispatch(setStep1FormsFailure(false)); }, 2000);
                response.json().then(json=>console.log(json))             
            } else {
                dispatch(setStep1FormsSuccess(data));
            }
            },
            err => {
                dispatch(setStep1FormsRequest());
                setTimeout(() => { dispatch(setStep1FormsFailure(false)); }, 3000);
                dispatch(setStep1FormsFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }


export const setStep2Forms = createAction('SET_STEP2_FORMS');
export const setPhotosCars = createAction('SET_PHOTOS_CARS');
export const setPhotosCarsDocs = createAction('SET_PHOTOS_CARS_DOCS');

export const createCarRequest = createAction('CREATE_CAR_REQUEST');
export const createCarFailure = createAction('CREATE_CAR_FAILURE');
export const createCarSuccess = createAction('CREATE_CAR_SUCCESS');

export const createCar = () => {
    return async (dispatch, getStore) => {
        let fullUserData = {...getStore().NewCar.step1Forms};
        fullUserData.options = getStore().NewCar.step2Forms;

        fullUserData.owner = localStorage.getItem("userMail");
        fullUserData.geo = await getGeo(getStore().NewCar.step1Forms.city);

        const formData = new FormData();
        for(let key in fullUserData) {
            formData.append(key, fullUserData[key]);
        }
        
        Object.values(getStore().NewCar.photosCarsDocs).map(el => {
            formData.append('imgDoc', el);
        })
        Object.values(getStore().NewCar.photosCars).map(el => {
            formData.append('imgCar', el);
        })
        
        dispatch(createCarRequest());
        callWithToken("http://localhost:8000/rent-car/create", 'POST', formData, true)
            .then(response => {
            dispatch(createCarRequest());
            if(!response.ok) {
                dispatch(createCarFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(createCarFailure(false)); }, 2000);
                response.json().then(error=>console.log(error))
            } else {
                response.json()
                .then(json=>{
                    dispatch(createCarSuccess());
                    fetch(`http://www.mapquestapi.com/geocoding/v1/reverse?key=POAiebt1jWMb0N9ej4rfYaRfXVGoBjsz&location=${json.geo[0]},${json.geo[1]}&includeRoadMetadata=true&includeNearestIntersection=true`)
                    .then(response=>{
                        response.json()
                        .then(location=> {
                            console.log(json._id)
                            fetch(`http://localhost:8000/rent-car/${json._id}`, {
                                method: 'PUT',   
                                headers: { 'Content-Type': 'application/json', }, 
                                body:  JSON.stringify({street: location.results[0].locations[0].street}) })
                                .then(response=>{
                                    if(!response.ok) {
                                        response.json().then(json=>console.log(json))
                                    }
                                })
                        })
                        })

                })
                           
            }
            },
            err => {
                dispatch(createCarRequest());
                setTimeout(() => { dispatch(createCarFailure(false)); }, 3000);
                dispatch(createCarFailure(error.FAILED_TO_FETCH));
                
            }
            )
        }
    }