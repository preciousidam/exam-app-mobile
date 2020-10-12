import { createSlice } from "@reduxjs/toolkit";
import {notes} from '../../constants/data';


export const noteSlice = createSlice({
    name: 'note',
    initialState: notes,
    reducers: {
        update(state, action){
            const {notes} =  action.payload;
            return [
                ...state,
                ...notes
            ];
        },
    }
});

export const {update} = noteSlice.actions;

export default noteSlice.reducer;

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