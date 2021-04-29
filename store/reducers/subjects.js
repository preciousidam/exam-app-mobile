import { createSlice } from "@reduxjs/toolkit";
import { showMessage, hideMessage } from "react-native-flash-message";

import getLoggedInClient from "../../apiAuth/loggedInClient";


export const subjectSlice = createSlice({
    name: 'subjects',
    initialState: {
        subjects: []
    },
    reducers: {
        update(state, action){
            const {subjects} =  action.payload;
            return {
                ...state,
                subjects
            };
        },
    }
});

export const {update} = subjectSlice.actions;

export default subjectSlice.reducer;

export const updateSubjectsAsync = details => async dispatch => {
    try{
        const client = await getLoggedInClient();
        const {data, status} = await client.get('subjects/');

        if(status === 200){
            dispatch(update({subjects: data}));
            return
        }

        if (status === 400){
            for (let item in data){
                showMessage({
                    type: 'danger',
                    message: item.toUpperCase(),
                    description: data[item][0],
                    icon: 'auto',
                    duration: 7000,
                    hideStatusBar: true,
                })
            }
        }
        if(status === 500) throw 'Someone happen please check back later or contact support'
        
        return
    }catch (err){
        console.log(err)
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        })
    }
}