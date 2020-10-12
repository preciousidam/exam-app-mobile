import { combineReducers } from 'redux';
import authReducer from './auth';
import notificationReducer from './notification';
import lessonReducer from './lesson';
import subjectReducer from './subjects';
import assignmentReducer from './assignment';
import noteReducer from './note';

export default combineReducers({
    auth: authReducer,
    notifications: notificationReducer,
    lessons: lessonReducer,
    subjects: subjectReducer,
    assignments: assignmentReducer,
    notes: noteReducer,
});