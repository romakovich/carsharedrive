import { createReducer } from "@reduxjs/toolkit";

import { defaultState } from './defaultState';
import * as actions from './actions';

export const Messages = createReducer( defaultState, {
    [actions.getUsersSuccess]: (state, action) => { state.users = action.payload; },
    [actions.getChatHistorySuccess]: (state, action) => { state.chatMessage = action.payload; },
    
    [actions.setChatMessage]: (state, action) => { state.chatMessage = action.payload; },

    [actions.fromUser]: (state, action) => { state.fromUser = action.payload; },
    [actions.toUser]: (state, action) => { state.toUser = action.payload; },
    [actions.toUserName]: (state, action) => { state.toUserName = action.payload; },
    [actions.lastTrip]: (state, action) => { state.lastTrip = action.payload; },
})