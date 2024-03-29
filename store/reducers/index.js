import { combineReducers } from 'redux';
import appReducer from '../app';
import authReducer from '../auth';
import notificationReducer from './notification';
import lessonReducer from '../lesson';
import subjectReducer from './subjects';
import assignmentReducer from './assignment';
import noteReducer from './note';
import subReducer from '../subscription';

export default {
    notifications: notificationReducer,
    lessons: lessonReducer,
    subjects: subjectReducer,
    assignments: assignmentReducer,
    notes: noteReducer,
    subscription: subReducer,
};