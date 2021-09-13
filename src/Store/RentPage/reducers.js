import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const RentPage = createReducer( defaultState, {
    [actions.setSecondDate]: (state, action) => { state.isSecondDate = action.payload; },
    [actions.setCarsList]: (state, action) => { state.carsList = action.payload; },
    [actions.setCarsCategory]: (state, action) => { state.carsCategory = action.payload; },
    [actions.setCarsCity]: (state, action) => { state.carsCity = action.payload; },

    [actions.setFirstCarLocation]: (state, action) => { state.firstCarLocation = action.payload },

    [actions.sortCarsListRequest]: (state) => {
        state.buttonLoad = state.buttonLoad ? false : true
    },
    [actions.setFinderHeading]: (state, action) => { state.finderHeading = action.payload },

    
})