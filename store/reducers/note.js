import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import getLoggedInClient from "../../apiAuth/loggedInClient";


export const noteSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        loading: false,
    },
    reducers: {
        load(state, action){
            const {notes} =  action.payload;
            return {
                ...state,
                notes
            };
        },
        new_note(state, action){
            const {note} =  action.payload;
            return {
                ...state,
                notes: [note, ...state.notes]
            };
        },
        update(state, action){
            const {note} =  action.payload;
            let notes = [note, ...state.notes.filter(({id}) => note.id !== id)]
            return {
                ...state,
                notes
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

export const {update, new_note, load, loading} = noteSlice.actions;

export default noteSlice.reducer;

export const fetchNotesAsync = id => async dispatch => {
    try{
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.get(`personal-notes/?student=${id}`);
        dispatch(loading({loading: false}));
        if(status === 200){
            dispatch(load({notes: data}));
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
        if(status === 500) throw 'Something happen please check back later or contact support'
        
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

export const newNoteAsync = note => async dispatch => {
    try{
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.post(`personal-notes/`, note);
        console.log(data)
        dispatch(loading({loading: false}));
        if(status === 200 || status === 201){
            dispatch(new_note({note: data}));
            showMessage({
                type: 'success',
                message: "Note Saved",
                description: "Note was saved successfully",
                icon: 'auto',
                duration: 7000,
                hideStatusBar: true,
            })
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
        if(status === 500) throw 'Something happen please check back later or contact support'
        
        return
    }catch (err){
        console.log(err)
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 7000,
            hideStatusBar: true,
        })
    }
}

export const editNoteAsync = note => async dispatch => {
    try{
        
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.put(`personal-notes/${note?.id}/`, note);
        dispatch(loading({loading: false}));
        if(status === 200 || status === 201){
            dispatch(update({note: data}));
            showMessage({
                type: 'success',
                message: "Note Saved",
                description: "Note was saved successfully",
                icon: 'auto',
                duration: 7000,
                hideStatusBar: true,
            })
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
        if(status === 500) throw 'Something happen please check back later or contact support'
        
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

