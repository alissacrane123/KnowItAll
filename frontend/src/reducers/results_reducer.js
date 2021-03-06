import { RECEIVE_RESULTS, CLEAR_RESULTS } from '../actions/result_actions';

const ResultsReducer = (state = { all: {} }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_RESULTS:
      newState.all = action.results.data;
      return newState;
    case CLEAR_RESULTS:
      newState.all = [];
      return newState;
    default:
      return state;
  }
};

export default ResultsReducer;