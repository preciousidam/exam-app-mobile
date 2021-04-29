import { createSlice } from "@reduxjs/toolkit";
import { showMessage, hideMessage } from "react-native-flash-message";

import getLoggedInClient from "../../apiAuth/loggedInClient";


export const lessonSlice = createSlice({
    name: 'lessons',
    initialState: {
        lessons: [],
        loading: false,
    },
    reducers: {
        update(state, action){
            const {lessons} =  action.payload;
            return {
                ...state,
                lessons
            };
        },
        loading(state, action){
            const {loading} = action.payload;
            return {
                ...state,
                loading,
            }
        }
    }
});

export const {update, loading} = lessonSlice.actions;

export default lessonSlice.reducer;

export const updateLessonsAsync = _ => async dispatch => {
    try{
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.get('lessons/');
        dispatch(loading({loading: false}));
        if(status === 200){
            console.log(data)
            dispatch(update({lessons: data}));
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