import { createSlice } from "@reduxjs/toolkit";


export const subjectSlice = createSlice({
    name: 'subjects',
    initialState: ['English', 'Mathematics', 'Economics', 'Geography', 'Accounting', 'Physics', 'Chemistry'],
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