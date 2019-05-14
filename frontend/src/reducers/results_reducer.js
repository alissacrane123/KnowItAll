import { RECEIVE_RESULTS, CLEAR_RESULTS } from '../actions/result_actions';

const ResultsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_RESULTS:
      newState.all = action.results.data;
      return newState;
    case CLEAR_RESULTS:
      return [];
    default:
      return state;
  }
};

export default ResultsReducer;