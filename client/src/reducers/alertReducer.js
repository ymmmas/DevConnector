import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // return array with play and the new alert
    case SET_ALERT:
      return [...state, payload];
    // filter though and return all alerts except the ones matches the payload
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
