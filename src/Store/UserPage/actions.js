import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const getUserRequest = createAction('GET_USER_REQUEST');
export const getUserSuccess = createAction('GET_USER_SUCCESS');
export const getUserFailure = createAction('GET_USER_FAILURE');

export const getUser = mail => {
    console.log(mail)
    return (dispatch, getStore) => {
        dispatch(getUserRequest());
        fetch(`http://localhost:8000/users/${mail}`)
            .then(response => {
            dispatch(getUserRequest());
            if(!response.ok) {
                dispatch(getUserFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(getUserFailure(false)); }, 2000);
            } else {
                response.json()
                .then(json => dispatch(getUserSuccess(json)))
                
            }
            },
            err => {
                dispatch(getUserRequest());
                setTimeout(() => { dispatch(getUserFailure(false)); }, 3000);
                dispatch(getUserFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }