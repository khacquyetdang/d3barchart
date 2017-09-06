import { FETCH_COUNTRY_REQUEST, FETCH_COUNTRY_SUCCESS } from '../constants.js';

import {combineReducers} from 'redux';



export function countries(state = [], action) {

    switch (action.type) {
        case FETCH_COUNTRY_SUCCESS: {
            return action.response[1];
        }
        default: {
            return state;
        }
    }
};

export function isCountriesFetching (state = false, action) {
    switch (action.type) {
        case FETCH_COUNTRY_REQUEST: {
            return true;
        }
        default: {
            return state;
        }
    }
}

const appReducer = combineReducers({
    countries,
    isCountriesFetching,
});


export default appReducer
