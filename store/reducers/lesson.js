import { createSlice } from "@reduxjs/toolkit";
import {lessons} from '../../constants/data';


export const lessonSlice = createSlice({
    name: 'lessons',
    initialState: {lessons},
    reducers: {
        update(state, action){
            const {lessons} =  action.payload;
            return {
                ...state,
                lessons
            };
        },
    }
});

export const {update} = lessonSlice.actions;

export default lessonSlice.reducer;

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