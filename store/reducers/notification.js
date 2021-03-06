import { createSlice } from "@reduxjs/toolkit";
import {notifications} from '../../constants/data';


export const notificationSlice = createSlice({
    name: 'notification',
    initialState: notifications,
    reducers: {
        update(state, action){
            const {notifications} =  action.payload;
            return [
                ...state,
                ...notifications
            ];
        },
    }
});

export const {update} = notificationSlice.actions;

export default notificationSlice.reducer;

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