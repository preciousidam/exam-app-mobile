import AsyncStorage from "@react-native-community/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import client from '../../apiAuth/tokenClient';
import { showMessage, hideMessage } from "react-native-flash-message";
import { isAvailableAsync, setItemAsync } from "expo-secure-store";
import getLoginClient from "../../apiAuth/loggedInClient";



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isRestoring: true,
        isSignOut: true,
        user: {
            "email": "preciousidam@yahoo.com",
            "first_name": "Precious",
            "last_name": "Idam",
            "phone": "08162300796",
            "pk": 1,
            "profile": {
              "address": "7, furo Ezimora street, Mauwa, Lekki Phase 1",
              "city": "Lekki",
              "country": "Nigeria",
              "dob": "2019-06-04",
              "gender": "Male",
              "guard_one_email": "preciousidam@gmail.com",
              "guard_one_phone": "08162300797",
              "guard_two_email": null,
              "guard_two_phone": null,
              "id": 1,
              "id_number": null,
              "level": 1,
              "level_name": "Senior Secondary",
              "schools": [],
              "state": "Lagos",
            }
        },
        form: {},
        levels: [],
        subscription_active: false,
    },
    reducers: {
        login(state, action){
            const {user} =  action.payload;
            return {
                ...state,
                isSignOut: false,
                isRestoring: false,
                user,
            };
        },
        edit(state, action){
            const form = action.payload;

            return {
                ...state,
                form
            }

        },
        logout(state){
            AsyncStorage.removeItem('harrp-user');
            return {...state, isSignOut: true, user: null};
        },
        restore(state, action){
            const {user} =  action.payload;
            return {
                ...state,
                isRestoring: false,
                user,
            };
        },
        processing(state, action){
            const {loading} = action.payload;
            return {
                ...state, isLoading: loading
            }
        },
        level(state, action){
            const {levels} = action.payload;
            return {...state, levels}
        }
    }
});

export const {login, logout, restore, processing, edit, level} = authSlice.actions;

export default authSlice.reducer;

export const signIn = details => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        const {data, status} = await client.post('auth/login/', {...details});
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            await AsyncStorage.setItem('harrptokenData', JSON.stringify({access_token: data.access_token, refresh_token: data.refresh_token}));
            dispatch(login({user: data.user}));
            let secureStore = await isAvailableAsync();
            if(secureStore){
                setItemAsync('username',details.username);
                setItemAsync('password',details.password);
            }
            AsyncStorage.setItem('harrp-user', JSON.stringify(data.user))
            const pushToken = await AsyncStorage.getItem('harrpPushToken');
            dispatch(savePushToken(data.user.pk, pushToken));
            return
        }
        for (let item in data){
            showMessage({
                type: 'danger',
                message: item.toUpperCase(),
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
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

export const sendVerify = pk => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        const {data, status} = await client.get(`verify/user/${pk}/`);
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            return
        }
        for (let item in data){
            showMessage({
                type: 'danger',
                message: item.toUpperCase(),
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
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

export const verifyEmail = (otp, pk) => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        
        const {data, status} = await client.post(`verify/user/${pk}/`, {otp})
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            AsyncStorage.setItem('harrp-user', JSON.stringify(data.user));
            dispatch(login({user: data.user}));
            return
        }

        if (status === 400){
            for (let item in data){
                showMessage({
                    type: 'danger',
                    message: item.toUpperCase(),
                    description: data[item],
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
            }
        }
        if(status === 500) throw 'Someone happen please check back later or contact support'
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
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

export const refreshToken = refresh => async dispatch => {
    
    try{ 
        const {data, status} = await client.post('auth/token/refresh/', {refresh})
        
        
        if (status === 201 || status === 200 ){
            let token = await AsyncStorage.getItem('harrptokenData');
            token = JSON.parse(token);
            token.access_token = data.access;
            
            await AsyncStorage.setItem('harrptokenData', JSON.stringify(token));
        
            return
        }
        for (let item in data){
            showMessage({
                type: 'danger',
                message: {item},
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        dispatch(processing({loading: false}));
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
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

export const signUp = details => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        
        const {data, status} = await client.post('users/', {...details})
        
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            
            dispatch(signIn({email: data.email, password: details.password, username: data.email}));
            return
        }

        if (status === 400){
            for (let item in data){
                showMessage({
                    type: 'danger',
                    message: item.toUpperCase(),
                    description: data[item][0],
                    icon: 'auto',
                    duration: 3000,
                    hideStatusBar: true,
                })
            }
        }
        if(status === 500) throw 'Someone happen please check back later or contact support'
        
        return
    }catch (err){
        console.log(err)
        dispatch(processing({loading: false}));
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

export const createProfile = (user, form) => async dispatch => {
    
    try{ 
        dispatch(processing({loading: true}));
        
        const {data, status} = await client.post('profile/', {user: user.pk, ...form})
        dispatch(processing({loading: false}));
        
        if (status === 201 || status === 200 ){
            AsyncStorage.setItem('harrp-user', JSON.stringify({...user, profile: data}))
            dispatch(restore({...user, profile: data}));
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
        dispatch(processing({loading: false}));
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

export const savePushToken = (user, token) => async dispatch => {
    const client = await getLoginClient();
    client.defaults.headers.post['Content-type'] = 'application/json';
    try{
        const {data, status} = await client.post(`push-token/save/`, {user,token})
    }
    catch{
        console.log(err)
    }
}

export const changePassword = details => async dispatch => {
    
    const client = await getLoginClient();
    dispatch(processing({loading: true}));
    client.defaults.headers.post['Content-type'] = 'application/json';
    try{
        const {data, status} = await client.post(`auth/password/change/`, details)
        
        dispatch(processing({loading: false}));
        if (status === 200 || status === 201){
            showMessage({
                type: 'success',
                message: data.message,
                duration: 3000,
                icon: 'success',
                hideStatusBar: true,
            })
            dispatch(logout());
            Alert.alert('Notice', 'Password change was succesful, you need to login again with new password');
            return;
        }

        if(status === 401){
            Alert.alert('Token Expired', 'Please login again to continue.')
            dispatch(logout());
            return;
        }

        if(status === 500){
            showMessage({
                type: "danger",
                message: "Something happened cannot process your request at the moment.",
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
            return;
        }
        
        for (let item in data){
            showMessage({
                type: 'danger',
                message: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })
        }
        return;
    }
    catch(err){
        dispatch(processing(false));
        console.error(err)
        showMessage({
            type: 'danger',
            message: "Something happened",
            description: err.message,
            icon: 'auto',
            duration: 3000,
            hideStatusBar: true,
        });
    }
}

export const updateLevelsAsync = _ => async dispatch => {
    try{
        const client = await getLoginClient();
        const {data, status} = await client.get(`levels/`);
        
        if(status === 200){
            dispatch(level({levels: data}));
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