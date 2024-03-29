import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { showMessage, hideMessage } from "react-native-flash-message";
import { isAvailableAsync, setItemAsync } from "expo-secure-store";

import {Solidbutton} from '../../components/button';
import {EmailOutlinedInputWithIcon, PasswordOutlinedInputWithIcon} from '../../components/input';
import { ActInd } from '../../components/activityIndicator';
import { Pressable } from 'react-native';
import type {LoginRequest} from '../../store/auth/api';
import {useLoginMutation} from '../../store/auth/api';
import {setCredential} from '../../store/auth';



export function SignIn({navigation, route}){
    const {colors, dark} = useTheme();
    const [detail, setDetail] = useState<LoginRequest>({} as LoginRequest)
    const dispatch = useDispatch();
    const [login, {isLoading}] = useLoginMutation();

    const onPress = async () => {
        try {
            const {data} = await login(detail).unwrap();
            let secureStore = await isAvailableAsync();
            if(secureStore){
                setItemAsync('username',detail.username);
                setItemAsync('password',detail.password);
            }
            dispatch(setCredential(data));
        }catch(error){
            console.log(error);
            /*showMessage({
                type: 'danger',
                message: item.toUpperCase(),
                description: data[item],
                icon: 'auto',
                duration: 3000,
                hideStatusBar: true,
            })*/
        }
    }

    return (
        
        <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
            <ScrollView contentContainerStyle={[styles.scroll, {backgroundColor: colors.card}]}>
                <KeyboardAvoidingView 
                    style={{...styles.container, backgroundColor: colors.card}}
                    behavior={Platform.OS === 'ios'? "padding": "position"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.header}>
                            <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Welcome,</Typography>
                            <Typography h4 h4Style={styles.h4}>Sign in to continue!</Typography>
                        </View>
                        <EmailOutlinedInputWithIcon 
                            value={detail.username} 
                            onChangeText={({nativeEvent}) => setDetail(prev => ({...prev, username: nativeEvent.text.toLowerCase()}))} 
                            style={styles.textInput}
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={wp("5%")} />}
                        />
                        <PasswordOutlinedInputWithIcon
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            value={detail.password} 
                            onChangeText={({nativeEvent}) => setDetail(prev => ({...prev, password: nativeEvent.text.toLowerCase()}))}
                            style={styles.textInput}  
                        />
                        <Text 
                            style={{...styles.reset, color: colors.text}} 
                            onPress={_ => navigation.navigate('Reset')} 
                        >
                            Forgot Password
                        </Text>
                        <Solidbutton 
                            text="Login" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                </KeyboardAvoidingView>
                
                <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
            </ScrollView>
            <Pressable onPress={e => navigation.navigate('Register')}>
                <View style={styles.bottom}>
                    <Text style={[styles.link, {color: colors.text}]}>
                        I'm a new user, 
                        <Text style={{color: colors.primary}}>  Create Account</Text>
                    </Text>
                </View>
            </Pressable>
            <ActInd status={isLoading} />
        </SafeAreaView>
    )
}

export default withTheme(SignIn);

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        paddingTop: hp('11%'),
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('6%'),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: hp('10%'),
    },
    h3: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: wp('7%'),
    },
    h4: {
        color: '#8d8d8d',
        fontSize: wp('5%'),
    },
    centeredView: {
        justifyContent: "center",
        paddingTop: hp('8%'),
    },
    textInput: {
        marginVertical: hp('1.3%'),
    },
    reset: {
        alignSelf: "flex-end",
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp('3.3%')
    },
    btn: {
        marginTop: hp('6%'),
    },
    link: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp("3%"),
    },
    bottom: {
        alignItems: "center",
        justifyContent: 'center',
        paddingBottom: hp('4%'),
    },
})