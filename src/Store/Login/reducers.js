import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';


export const login = createReducer( defaultState, {
    [actions.closeLogin]: (state, action) => { state.loginIsClose = action.payload; },
    [actions.setFormForSend]: (state, action) => { state.isFormForSend = action.payload; },
    [actions.setButtonActive]: (state, action) => { state.buttonActive = action.payload; },
//Авторизация
    [actions.onAuthRequest]: (state) => { 
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.onAuthSuccess]: (state) => { 
        state.loginIsClose = true;
        state.errorServer = false;
        
    },
    [actions.onAuthFailure]: (state, action) => { 
        state.errorServer = action.payload;
    },
    [actions.setAuth] : (state, action) => {
        state.isAuth = action.payload;
    },
//Запрос на спецссылку
    [actions.onForgetPassRequest]: (state) => { 
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.onForgetPassSuccess]: (state) => { 
        state.isFormMailSent = true;
        state.isFormForSend = false;
        state.errorServer = false;
    },
    [actions.onForgetPassFailure]: (state, action) => { 
        state.errorServer = action.payload;
    },
//Сброс пароля
    [actions.onResetPassRequest]: (state) => { 
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.onResetPassSuccess]: (state) => { 
        state.resetPassSuccess = true;
        state.buttonLoad = false;
    },
    [actions.onResetPassFailure]: (state, action) => { 
        state.errorServer = action.payload;
    },
})

