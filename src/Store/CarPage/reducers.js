import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const CarPage = createReducer( defaultState, {
    [actions.setCarPageSuccess]: (state, action) => { 
        state.carPage = action.payload; 
        state.isSuccess = true;
    },
    [actions.setCarPageRequest]: (state, action) => { 
        state.buttonLoad = action.payload
    },
    [actions.createTripSuccess]: (state, action) => { 
        state.trip = action.payload,
        state.successRent = true
    },
    [actions.createTripFailure]: (state, action) => { 
        state.warning = action.payload;
    },
    [actions.updateTripSuccess]: (state, action) => { 
        state.trip = action.payload
    },
    [actions.setSuccessRent]: (state, action) => {
        state.successRent = action.payload;
    }
})