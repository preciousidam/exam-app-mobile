import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import client from '../../apiAuth/guestClient';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        terms: null,
        processing: false,
        error: false,
    },
    reducers: {
        terms(state, action){
            
            const {terms} =  action.payload;
            return {
                ...state,
                terms: terms === undefined? null : terms,
            };
        },
        processing(state, action){
            const process = action.payload;
            return {
                ...state,
                processing: process,
            }
        },
        error(state, action){
            const error = action.payload;
            return {
                ...state,
                error, 
                processing: false,
            }
        }
    }
});

export const {terms, products, processing, error} = appSlice.actions;

export default appSlice.reducer;

export const bootstrap = payload => async dispatch => {
    
    try{
        dispatch(terms({terms: payload.terms === undefined? null : true})),
        AsyncStorage.setItem('apps', JSON.stringify({terms: payload.terms === undefined? null : true}));
    }catch{
        
    }
}


