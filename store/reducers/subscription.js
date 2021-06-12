import { createSlice } from "@reduxjs/toolkit";
import { showMessage } from "react-native-flash-message";
import getLoggedInClient from "../../apiAuth/loggedInClient";

export const PAY_FLOW = {'charge': 'CHARGE CARD', 'validate': 'VALIDATE', 'complete': "COMPLETE"}

export const subSlice = createSlice({
    name: 'subscription',
    initialState: {
        recent: null,
        loading: false,
        current_flow: PAY_FLOW.charge,
        error: null,
        message: null
    },
    reducers: {
        load(state, action){
            const {sub} =  action.payload;
            return {
                ...state,
                recent: sub
            };
        },
        flow(state, action){
            const {flow} = action.payload;
            return {
                ...state,
                current_flow: flow
            };
        },
        loading(state, action){
            const {loading} = action.payload;
            return {
                ...state,
                loading,
            }
        },
        error(state, action){
            const {error, message} = action.payload;
            return {
                ...state,
                error,
                message
            }
        }
    }
});

export const {flow, load, loading, error} = subSlice.actions;

export default subSlice.reducer;

export const fetchSubAsync = id => async dispatch => {
    try{
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.get(`subscriptions/?student=${id}`);
        dispatch(loading({loading: false}));
        if(status === 200){
            dispatch(load({sub: data}));
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

export const chargeAsync = data => async dispatch => {
    try{
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.post(`pay/rave/`, data);
        
        dispatch(loading({loading: false}));
        if(status === 200 || status === 201){
            dispatch(error({error: false, message: data.msg}))
            dispatch(flow({flow: PAY_FLOW.validate}));
            
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

export const validateAsync = data => async dispatch => {
    try{
        
        dispatch(loading({loading: true}));
        const client = await getLoggedInClient();
        const {data, status} = await client.post(`pay/rave/validate/`, data);
        dispatch(loading({loading: false}));
        if(status === 200 || status === 201){
            dispatch(load({sub: data}));
            dispatch(flow({flow: PAY_FLOW.complete}))
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

