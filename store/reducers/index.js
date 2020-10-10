import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationReducer from './notification';
import lessonReducer from './lesson';
import subjectReducer from './subjects';

export default combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
    lessons: lessonReducer,
    subjects: subjectReducer,
});