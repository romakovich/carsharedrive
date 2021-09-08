import { createAction } from "@reduxjs/toolkit";
import * as error from '../Constants/Errors';

export const closeLogin = createAction('LOGIN_OPEN_OR_CLOSE');
export const setFormForSend = createAction('SET_FORM_FOR_SEND');
export const setLoginButtonActive = createAction('CHANGE_LOGIN_BUTTON_ACTIVITY');

export const onAuthRequest = createAction('ON_AUTH_REQUEST');
export const onAuthSuccess = createAction('ON_AUTH_SUCCESS');
export const onAuthFailure = createAction('ON_AUTH_FAILURE');

export const setAuth = createAction("SET_AUTH");
import jwtDecode from 'jwt-decode';
import { getName } from "../config/getName";

export const onAuth = data => {
    return dispatch => {
        dispatch(onAuthRequest());
        fetch("http://localhost:8000/users/auth/access", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
         body: JSON.stringify(data) })
         .then(response => {
             dispatch(onAuthRequest())
             if(!response.ok) {
                 if(response.status == 400) {
                    dispatch(onAuthFailure(error.WRONG_EMAIL));
                    setTimeout(() => { dispatch(onAuthFailure(false)); }, 2000);
                 } else if(response.status == 401) {
                    dispatch(onAuthFailure(error.WRONG_PASSWORD));
                    setTimeout(() => { dispatch(onAuthFailure(false)); }, 2000);
                 }
             } else {
                 return response.json()
                 .then(json => {
                    dispatch(onAuthSuccess());
                    localStorage.setItem("accessToken", json.accessToken);
                    localStorage.setItem("refreshToken", json.refreshToken);
                    localStorage.setItem("userMail", jwtDecode(json.accessToken).mail);

                    dispatch(setAuth(jwtDecode(json.accessToken).mail))
                    getName();
                 })
             }
         },
         err => {
             dispatch(onAuthRequest());
             console.log(err);
             setTimeout(() => { dispatch(onAuthFailure(false)); }, 3000);
             dispatch(onAuthFailure(error.FAILED_TO_FETCH))
         })
    }
}

export const onForgetPassRequest = createAction('ON_FORGET_PASS_REQUEST');
export const onForgetPassSuccess = createAction('ON_FORGET_PASS_SUCCESS');
export const onForgetPassFailure = createAction('ON_FORGET_PASS_FAILURE');
export const onForgetPass = data => {
    
    return dispatch => {
        dispatch(onForgetPassRequest());
        fetch("http://localhost:8000/users/auth/pass-recovery", {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
         body: JSON.stringify(data) })
         .then(response => {
            dispatch(onForgetPassRequest())
            if(!response.ok) {
                if(response.status == 400) {
                    dispatch(onForgetPassFailure(error.WRONG_EMAIL));
                    setTimeout(() => { dispatch(onForgetPassFailure(false)); }, 2000);
                }
            } else {
                dispatch(onForgetPassSuccess());
            }
        },
        err => {
            dispatch(onForgetPassRequest());
            console.log(err);
            dispatch(onForgetPassFailure(error.FAILED_TO_FETCH))
            setTimeout(() => { dispatch(onForgetPassFailure(false)); }, 3000);
        })
    }
}

export const onResetPassRequest = createAction('ON_RESET_PASS_REQUEST');
export const onResetPassSuccess = createAction('ON_RESET_PASS_SUCCESS');
export const onResetPassFailure = createAction('ON_RESET_PASS_FAILURE');
export const onResetPass = data => {
    return dispatch => {
        dispatch(onResetPassRequest());
        
        fetch(`http://localhost:8000/users/auth/pass-reset${document.location.search}`, {
            method: 'POST',  
            headers: { 'Content-Type': 'application/json', },  
         body: JSON.stringify(data) })
         .then(response => {
            dispatch(onResetPassRequest())
            if(!response.ok) {
                if(response.status == 400) {
                    dispatch(onResetPassFailure(error.WRONG_EMAIL));
                    setTimeout(() => { dispatch(onResetPassFailure(false)); }, 3000);
                    return;
                }
                return response.text()
                .then(textError => {
                    if(textError == error.DIFFERENT_RESPONSES) {
                        dispatch(onResetPassFailure(error.DIFFERENT_RESPONSES));
                        setTimeout(() => { dispatch(onResetPassFailure(false)); }, 3000);
                    } else if(textError == error.ITS_OLD_PASSWORD) {
                        dispatch(onResetPassFailure(error.ITS_OLD_PASSWORD));
                        setTimeout(() => { dispatch(onResetPassFailure(false)); }, 3000);
                    }
                })
            } else {
                dispatch(onResetPassSuccess());
                return response.json()
                .then(json => {
                   dispatch(onAuthSuccess());
                   localStorage.setItem("accessToken", json.accessToken);
                   localStorage.setItem("refreshToken", json.refreshToken);
                   localStorage.setItem("userMail", jwtDecode(json.accessToken).mail);

                   dispatch(setAuth(jwtDecode(json.accessToken).mail))
                   getName();
                })
            }
        },
        err => {
            dispatch(onResetPassRequest());
            console.log(err);
            dispatch(onResetPassFailure(error.FAILED_TO_FETCH))
            setTimeout(() => { dispatch(onResetPassFailure(false)); }, 3000);
        })
    }
}