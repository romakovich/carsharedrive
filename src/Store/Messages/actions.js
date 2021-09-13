import { createAction } from "@reduxjs/toolkit";
import { callWithToken } from "../../Components/Global/CallApi/chectToken";
import * as error from '../Constants/Errors';
import { updateCar } from "../RentPage/actions";
import { chatBot } from "./config/chatBot";
import { wsSend } from "./config/wsSend";

export const getUsersRequest = createAction('GET_USERS_REQUEST');
export const getUsersSuccess = createAction('GET_USERS_SUCCESS');
export const getUsersFailure = createAction('GET_USERS_FAILURE');

export const getUsers = () => {
    return (dispatch) => {
        dispatch(getUsersRequest());
        callWithToken(`http://localhost:8000/users?mail=${localStorage.getItem("userMail")}`)
            .then(response => {
            dispatch(getUsersRequest());
            if(!response.ok) {
                dispatch(getUsersFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getUsersFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(getUsersSuccess(json))})
                }
            },
            () => {
                dispatch(getUsersRequest());
                setTimeout(() => { dispatch(getUsersFailure(false)); }, 3000);
                dispatch(getUsersFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

export const getChatHistoryRequest = createAction('GET_CHAT_HISTORY_REQUEST');
export const getChatHistorySuccess = createAction('GET_CHAT_HISTORY_SUCCESS');
export const getChatHistoryFailure = createAction('GET_CHAT_HISTORY_FAILURE');  

export const fromUser = createAction('FROM_USER');
export const toUser = createAction('TO_USER');
export const toUserName = createAction('TO_USER_NAME');
export const setChatMessage = createAction('SET_CHAT_MESSAGE');
export const lastTrip = createAction('LAST_TRIP');

export const getChatHistory = (data, name, trip) => {
    return (dispatch) => {
        dispatch(getChatHistoryRequest());
        callWithToken(`http://localhost:8000/messages/chat?fromUser=${localStorage.getItem("userMail")}&toUser=${data}`)
            .then(response => {
            dispatch(getChatHistoryRequest());
            if(!response.ok) {
                dispatch(getChatHistoryFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getChatHistoryFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(getChatHistorySuccess(json))})
                    
                    dispatch(fromUser(localStorage.getItem("userMail")));
                    dispatch(toUser(data));
                    dispatch(toUserName(name));
                    dispatch(lastTrip(trip));
            }
            },
            () => {
                dispatch(getChatHistoryRequest());
                setTimeout(() => { dispatch(getChatHistoryFailure(false)); }, 3000);
                dispatch(getChatHistoryFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

export const updateTripRequest = createAction('UPDATE_TRIP_REQUEST');
export const updateTripSuccess = createAction('UPDATE_TRIP_SUCCESS');
export const updateTripFailure = createAction('UPDATE_TRIP_FAILURE');  

export const updateTrip = (payload, rate, review) => {
    return (dispatch) => {
        dispatch(updateTripRequest());
        callWithToken(`http://localhost:8000/trip/${payload.lastTrip.dateRent}`,
        'PUT',
        payload.chatBot == "setRentOwner" ? {statusStartTalkOwner: true}
                : payload.chatBot == "setRentClient" ? {statusStartRent: true}
                : payload.chatBot == "setRentEnd" ? 
                {
                    statusStartRent: false,
                    statusStartTalkOwner: false,
                    statusStartTalClient: false,

                }
                : payload.chatBot == "rate" ? {
                    rate: rate + 1,
                    review: review,
                    
                }
                : "")
            .then(response => {
            dispatch(updateTripRequest());
            if(!response.ok) {
                dispatch(updateTripFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(updateTripFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    console.log(payload)
                    dispatch(updateTripSuccess(json))
                    dispatch(removeMessage(payload.time));
                    
                    if(payload.chatBot == "setRentOwner") {
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "setRezerv", payload.lastTrip
                        )))
                        dispatch(removeMessage(payload.time));
                        dispatch(createMessage(chatBot(
                            payload.toUser, payload.fromUser, "setRezerv", payload.lastTrip
                        ), 500))
                        dispatch(createMessage(chatBot(
                            payload.toUser, payload.fromUser, "map", payload.lastTrip
                        ), 1000))
                        dispatch(createMessage(chatBot(
                            payload.toUser, payload.fromUser, "setRentClient", payload.lastTrip
                        )))
                    } else if(payload.chatBot == "setRentClient") {
                        dispatch(createMessage(chatBot(
                            payload.toUser, payload.fromUser, "rentStart", payload.lastTrip
                        )))
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "rentStart", payload.lastTrip
                        ), 500))
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "setRentEnd", payload.lastTrip
                        ), 1000))
                        dispatch(removeMessage(payload.time));
                    } else if(payload.chatBot == "setRentEnd") {
                        console.log("end")
                        dispatch(createMessage(chatBot(
                            payload.toUser, payload.fromUser, "rentEnd", payload.lastTrip
                        )))
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "rentEnd", payload.lastTrip
                        ), 500))
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "rate", payload.lastTrip
                        ), 1000))
                        dispatch(removeMessage(false, {
                            chatBot: "map",
                            fromUser: payload.fromUser,
                            toUser: payload.toUser
                        }))
                    } else if(payload.chatBot == "rate") {
                        dispatch(createMessage(chatBot(
                            payload.fromUser, payload.toUser, "rateOk", payload.lastTrip
                        )))
                        dispatch(removeMessage(payload.time));
                        dispatch(updateCar(payload.lastTrip.car._id, {rate: rate}))
                    }
                })
                }
                
            },
            () => {
                dispatch(updateTripRequest());
                setTimeout(() => { dispatch(updateTripFailure(false)); }, 3000);
                dispatch(getChatHistoryFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

export const removeMessageRequest = createAction('REMOVE_MESSAGE_REQUEST');
export const removeMessageSuccess = createAction('REMOVE_MESSAGE_SUCCESS');
export const removeMessageFailure = createAction('REMOVE_MESSAGE_FAILURE');

export const removeMessage = (messageTime, payload) => {
    return (dispatch) => {
        dispatch(removeMessageRequest());
        callWithToken(`http://localhost:8000/messages/${messageTime}`, 'DELETE', payload)
            .then(response => {
            dispatch(removeMessageRequest());
            if(!response.ok) {
                dispatch(removeMessageFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(removeMessageFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => {
                    dispatch(removeMessageSuccess(json))})
                    wsSend();
                }
            },
            () => {
                dispatch(removeMessageRequest());
                setTimeout(() => { dispatch(updateTripFailure(false)); }, 3000);
                dispatch(getChatHistoryFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }

export const createMessageRequest = createAction('CREATE_MESSAGE_REQUEST');
export const createMessageSuccess = createAction('CREATE_MESSAGE_SUCCESS');
export const createMessageFailure = createAction('CREATE_MESSAGE_FAILURE');

export const createMessage = (payload) => {
    
    return (dispatch) => {
        dispatch(createMessageRequest());
        callWithToken(`http://localhost:8000/messages/`, 'POST', payload)
            .then(response => {
            dispatch(createMessageRequest());
            if(!response.ok) {
                dispatch(createMessageFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(createMessageFailure(false)); }, 2000);
                response.json()
                .then(json=>console.log(json))
            } else {
                response.json()
                .then(json => {
                    dispatch(createMessageSuccess(json))});
                    wsSend();
                }
            },
            () => {
                dispatch(createMessageRequest());
                setTimeout(() => { dispatch(createMessageFailure(false)); }, 3000);
                dispatch(createMessageFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    
}

export const updateMessageRequest = createAction('CREATE_MESSAGE_REQUEST');
export const updateMessageSuccess = createAction('CREATE_MESSAGE_SUCCESS');
export const updateMessageFailure = createAction('CREATE_MESSAGE_FAILURE');

export const updateMessage = (messageTime, payload) => {
    return (dispatch) => {
        dispatch(updateMessageRequest());
        callWithToken(`http://localhost:8000/messages/${messageTime}`, 'PUT', payload)
            .then(response => {
            dispatch(updateMessageRequest());
            if(!response.ok) {
                dispatch(updateMessageFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(updateMessageFailure(false)); }, 2000);
                response.json().then(json=>console.log(json))
            } else {
                    dispatch(updateMessageSuccess())}
                    wsSend();
            },
            () => {
                dispatch(createMessageRequest());
                setTimeout(() => { dispatch(updateMessageFailure(false)); }, 3000);
                dispatch(updateMessageFailure(error.FAILED_TO_FETCH));
            }
            )
        }
}