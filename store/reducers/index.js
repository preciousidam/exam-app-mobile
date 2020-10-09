import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationReducer from './notification';

export default combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
});