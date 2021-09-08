import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from 'react-router-dom';
import './styles/base.scss';
import thunk from 'redux-thunk';
import App from "./Components/app";
import rootReducer from './Store/reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

const middlewares = [
    thunk,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    
    composeEnhancers(
        applyMiddleware(...middlewares)
    ));

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    </Provider>, 
document.getElementById("root"));