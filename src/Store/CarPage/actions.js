import { createAction } from "@reduxjs/toolkit";
import { callWithToken } from "../../Components/Global/CallApi/chectToken";
import * as error from '../Constants/Errors';
import { createMessage } from "../Messages/actions";
import { chatBot } from "../Messages/config/chatBot";

export const setCarPageRequest = createAction('SET_CAR_PAGE_REQUEST');
export const setCarPageSuccess = createAction('SET_CAR_PAGE_SUCCESS');
export const setCarPageFailure = createAction('SET_CAR_PAGE_FAILURE');

export const setCarPage = id => {
    return (dispatch) => {
        dispatch(setCarPageRequest(true));
        callWithToken(`http://localhost:8000/rent-car/car-page/${id}`)
            .then(response => {
            dispatch(setCarPageRequest(false));
            if(!response.ok) {
                dispatch(setCarPageFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(setCarPageFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json=>{ 
                    dispatch(setCarPageSuccess(json));
                })
            }
        })
    }
}

export const createTripRequest = createAction('CREATE_TRIP_REQUEST');
export const createTripSuccess = createAction('CREATE_TRIP_SUCCESS');
export const createTripFailure = createAction('CREATE_TRIP_FAILURE');

export const createTrip = (sumPrice, tripPlan) => {
    return (dispatch, getStore) => {
        let days = (new Date(getStore().global.availableCar2) - new Date(getStore().global.availableCar)) / (8.64e+7),
        client = localStorage.getItem("userMail"),
        toUser = getStore().CarPage.carPage[0].owner.mail
        dispatch(createTripRequest(true));
        callWithToken(`http://localhost:8000/trip`, 'POST', 
        {
            client,
            license: getStore().CarPage.carPage[0].license,
            startRent: getStore().global.availableCar,
            endRent: getStore().global.availableCar2,
            days,
            price: sumPrice,
            comment: "Планирую посетить Санкт-Петербург, покататься по городу, съездить в Выборг и Петергоф.",
            optionsDelivery: getStore().CarPage.carPage[0].options[15],
            optionsBabyChair: getStore().CarPage.carPage[0].options[14],
            optionsEndRentAnywhere: getStore().CarPage.carPage[0].options[16],
            optionsEndRentAnywhere: getStore().CarPage.carPage[0].options[17],
            statusStartTalkClient: true,
            statusStartTalkOwner: false,
            statusStartRent: false,
            rate: null
        })
            .then(response => {
            dispatch(createTripRequest(false));
            if(!response.ok) {
                dispatch(createTripFailure(error.CODE_401_DATE));
                setTimeout(() => { dispatch(createTripFailure(false)); }, 2000);
                response.json()
                .then(json=>console.log(json));
            } else {
                response.json()
                .then(json=>{
                    dispatch(createTripSuccess());
                    dispatch(createMessage(    {
                        time: Date.now(),
                        fromUser: client,
                        toUser: toUser,
                        message: tripPlan,
                        isRead: false,
                        emoji: [],
                        chatBot: false,
                        lastTrip: json
                    }))
                    dispatch(createMessage(chatBot(
                        client, toUser, "setRentOwner", json
                    )))
                });

            }
        },
            err => {
                dispatch(createTripRequest());
                setTimeout(() => { dispatch(createTripFailure(false)); }, 3000);
                
                dispatch(createTripFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

    export const updateTripRequest = createAction('UPDATE_TRIP_REQUEST');
    export const updateTripSuccess = createAction('UPDATE_TRIP_SUCCESS');
    export const updateTripFailure = createAction('UPDATE_TRIP_FAILURE');

    export const updateTrip = (data) => {
        console.log('updateStart')
        return (dispatch, getStore) => {
            
            dispatch(updateTripRequest(true));
            callWithToken(`http://localhost:8000/rent-car/trip`, 'PUT', data)
                .then(response => {
                dispatch(updateTripRequest(false));
                if(!response.ok) {
                    dispatch(createTripFailure(error.WRONG_PASSWORD));
                    setTimeout(() => { dispatch(updateTripFailure(false)); }, 2000);
                    response.json()
                    .then(json=>console.log(json));
                } else {
                    dispatch(updateTripSuccess())
                    dispatch(createMessage(chatBot(

                    )))
                }
            },
                err => {
                    dispatch(updateTripRequest());
                    setTimeout(() => { dispatch(updateTripFailure(false)); }, 3000);
                    
                    dispatch(updateTripFailure(error.FAILED_TO_FETCH));
                }
                )
            }
        }

export const setSuccessRent = createAction('SET_SUCCESS_RENT');
