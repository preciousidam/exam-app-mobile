import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Image, StatusBar} from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';


import { setCredential } from '../store/auth';
import {bootstrap} from '../store/app';

import { loadFonts } from '../libs/fonts';
import { withTheme } from 'react-native-elements';
import { useLoginMutation } from '../store/auth/api';
import { useAppDispatch, useAppSelector } from '../store/hooks';


export function SplashScreen({theme}){
    const {colors, dark} = useTheme();
    const [login, {isSuccess, isError}] = useLoginMutation();

    const dispatch = useAppDispatch();

    const fontLoaded = loadFonts();

    const LoginApp = async () => {
        try {
            const data = await login({username: "preciousidam@yahoo.com", password: "testPassword01"}).unwrap();
            console.log(data)
            if(data){
                dispatch(setCredential({
                    ...data,
                    isLoading: false,
                }))
            }
        }
        catch(err){
            console.log(err)
        }
    }

    const setup = async () => {
        LoginApp();
        //const user = await AsyncStorage.getItem('@harrp-user');
        const app = await AsyncStorage.getItem('apps');
        // dispatch(signIn({username: "preciousidam@yahoo.com", password: "testPassword01"}))
        //console.log(JSON.parse(user));
        dispatch(bootstrap(JSON.parse(app)));
        //dispatch(restore({user: JSON.parse(user)}));
        //dispatch(restore({user: null}));
    }

    useEffect(() => {
        setup();
    },[])

    return (
        fontLoaded && (<View style={{...styles.container, backgroundColor: colors.primary}}>
            <Text style={{...styles.text, color: theme.colors.white}}>HARRP</Text>
            <Text style={{...styles.subText, bottom: 40, color: theme.colors.white}}>From</Text>
            <Text style={{...styles.subText, color: theme.colors.white, fontFamily: "OpenSans_700Bold"}}> TODD Gabriels</Text>
            <StatusBar barStyle={dark? 'dark-content': 'light-content'} backgroundColor={colors.primary} />
        </View>)
    );
}

export default withTheme(SplashScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },

    subText: {
        position: "absolute",
        bottom: 20,
    }
})