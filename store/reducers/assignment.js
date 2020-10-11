import { createSlice } from "@reduxjs/toolkit";
import {assignments} from '../../constants/data';


export const assignmentSlice = createSlice({
    name: 'lessons',
    initialState: {assignments},
    reducers: {
        update(state, action){
            const {assignment} =  action.payload;
            return {
                ...state,
                assignment
            };
        },
    }
});

export const {update} = assignmentSlice.actions;

export default assignmentSlice.reducer;

export const updateAsync = details => async dispatch => {
    try{
        ///perform login async task
        setTimeout(
            () => dispatch(update({user: details})),
            3000
        );
        AsyncStorage.setItem('user', JSON.stringify(details));
    }catch{

    }
}