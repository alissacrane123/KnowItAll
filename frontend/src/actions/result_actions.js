import * as ResultAPIUtil from '../util/result_api_util';
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';

export const RECEIVE_RESULTS = "RECEIVE_RESULTS";
export const CLEAR_RESULTS = "RECEIVE_RESULTS";


export const receiveResults = results => ({
  type: RECEIVE_RESULTS,
  results
});

export const clearResults = () => {
  return {
    type: CLEAR_RESULTS
  }
}

export const fetchResults = (query) => dispatch => {
  return axios.get(`api/search/${query}`)
  .then(results => {
    // console.log(results)
    dispatch(receiveResults(results));
  })
  .catch(err => console.log(err, 'did not make it to search'))
}