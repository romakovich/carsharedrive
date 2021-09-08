import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const UserPage = createReducer( defaultState, {
    [actions.getUserSuccess]: (state, action) => { state.userPage = action.payload; },
})