import fetchCountryData from '../api';
// key for localStorage
// import { normalize } from 'normalizr';
// import * as schema from './schema';
import { FETCH_COUNTRY_REQUEST,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_FAILURE,
    FETCH_COUNTRY_GDP_REQUEST } from '../constants';

export function fetchCountryRequest() {
    return {
        type: FETCH_COUNTRY_REQUEST,
    }
};
//

export function fetchCountrySuccess(response) {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        response
    }
};

export function fetchCountriesFailure(error) {
    return {
        type: FETCH_COUNTRY_FAILURE,
        error
    }
};


export const fetchCountries = () => (dispatch, getState) => {
    console.log("fetchCarnets actions");
    dispatch(fetchCountryRequest());
    fetchCountryData().then(response => {
        console.log(response);

        dispatch(fetchCountrySuccess(response));
    },
    error => {
        dispatch(fetchCountriesFailure(error.message || 'Something went wrong.'));
    });
}
