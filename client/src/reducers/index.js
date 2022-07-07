import { combineReducers } from 'redux';
// import authReducer from './authReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer
});

export default rootReducer;
