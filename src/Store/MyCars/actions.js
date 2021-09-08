import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const onAuthRequest = createAction('ON_AUTH_REQUEST');
export const onAuthSuccess = createAction('ON_AUTH_SUCCESS');
export const onAuthFailure = createAction('ON_AUTH_FAILURE');

export const onAuth = data => {
    return (dispatch, getStore) => {
        dispatch(onAuthRequest());
        fetch("http://localhost:8000/users/auth/access", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
            body: JSON.stringify(data) })
            .then(response => {
            dispatch(onAuthRequest());
            if(!response.ok) {
                dispatch(onAuthFailure(error.WRONG_PASSWORD));
                setTimeout(() => { dispatch(onAuthFailure(false)); }, 2000);
            } else {
                dispatch(onAuthSuccess());
            }
            },
            err => {
                dispatch(onAuthRequest());
                setTimeout(() => { dispatch(onAuthFailure(false)); }, 3000);
                dispatch(onAuthFailure(error.FAILED_TO_FETCH));
            }
            )
        }
    }