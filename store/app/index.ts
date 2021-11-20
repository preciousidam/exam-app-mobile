import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import client from '../../apiAuth/guestClient';


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        terms: null,
        processing: false,
        error: false,
        isRestoring: true
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
        },
        restore(state, action){
            const {user} =  action.payload;
            return {
                ...state,
                isRestoring: false,
                user,
            };
        }
    }
});

export const {terms, processing, error, restore} = appSlice.actions;

export default appSlice.reducer;

export const bootstrap = payload => async dispatch => {
    
    try{
        dispatch(terms({terms: payload.terms === undefined? null : true})),
        AsyncStorage.setItem('apps', JSON.stringify({terms: payload.terms === undefined? null : true}));
    }catch{
        
    }
}

export const useSelectTerms = (state: RootState) => state.app.terms;
export const useSelectProcessing = (state: RootState) => state.app.processing;
export const useSelectIsRestoring = (state: RootState) => state.app.isRestoring;
export const useSelectError  = (state: RootState) => state.app.error;

