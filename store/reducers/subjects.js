import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { showMessage, hideMessage } from "react-native-flash-message";

import getLoggedInClient from "../../apiAuth/loggedInClient";


export const subjectSlice = createSlice({
    name: 'subjects',
    initialState: {
        subjects: [],
        bookmarked: [],
        viewed: [],
    },
    reducers: {
        update(state, action){
            const {subjects} =  action.payload;
            return {
                ...state,
                subjects
            };
        },
        addBookmark(state, action){
            const {topic} = action.payload;
            const bookmarked = [...state.bookmarked.filter(({id}) => id !== topic?.id), topic];
            AsyncStorage.setItem("harrpBookmark", JSON.stringify(bookmarked));
            return {
                ...state,
                bookmarked
            }
        },
        removeBookmark(state, action){
            const {topic} = action.payload;
            const bookmarked = state.bookmarked.filter(({id}) => id !== topic.id);
            AsyncStorage.setItem("harrpBookmark", JSON.stringify(bookmarked));
            return {
                ...state,
                bookmarked
            }
        },
        loadBookmark(state, action){
            const {bookmarked} = action.payload;
            
            return {
                ...state,
                bookmarked
            }
        },
        updateViewed(state, action){
            const {id} = action.payload;
            let list = state.viewed.filter(x => x !== id);
            list.push(id);
            AsyncStorage.setItem('lessons_viewed', JSON.stringify(list));
            return {...state, viewed: [...list]};
            
        },
        loadViewed(state, action){
            const {topics} = action.payload;
            
            return {
                ...state,
                viewed: topics,
            }
        }
    }
});

export const {update, addBookmark, removeBookmark, loadBookmark, loadViewed, updateViewed} = subjectSlice.actions;

export default subjectSlice.reducer;

export const updateSubjectsAsync = level => async dispatch => {
    try{
        const client = await getLoggedInClient();
        const {data, status} = await client.get(`subjects/?level=${level}`);

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

export const getBookmarkAsync = _ => async dispatch => {
    const bookmarked = await AsyncStorage.getItem('harrpBookmark');
    
    if (bookmarked){
        dispatch(loadBookmark({bookmarked: JSON.parse(bookmarked)}))
    }
}

export const getViewedAsync = _ => async dispatch => {
    const topics = await AsyncStorage.getItem('lessons_viewed');
    
    if (topics){
        dispatch(loadViewed({topics: JSON.parse(topics)}))
    }
}