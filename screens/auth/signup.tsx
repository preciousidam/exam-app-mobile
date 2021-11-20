import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons} from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { showMessage } from 'react-native-flash-message';
import { Pressable } from 'react-native';
import { isAvailableAsync, setItemAsync } from "expo-secure-store";


import {Solidbutton} from '../../components/button';
import { EmailOutlinedInputWithIcon, OutlinedInputWithIcon, PasswordOutlinedInputWithIcon } from '../../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import { isValidEmail, isValidPassword } from '../../utility';
import { Data, setCredential } from '../../store/auth';
import { useDispatch } from 'react-redux';
import { ActInd } from '../../components/activityIndicator';
import extraColors from '../../constants/custom-colors';
import {useRegisterMutation, useLoginMutation, LoginRequest} from '../../store/auth/api';




export function SignUp({navigation}){
    const {colors, dark} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState(new Date());
    const [fullname, setFullname] = useState('');
    const dispatch = useDispatch();
    const [register, {isError, isLoading: isRLoading, isSuccess}] = useRegisterMutation();
    const [login, {isLoading}] = useLoginMutation();

    const onDateChange = (event, selectedDate) => {
        const selDate = selectedDate || date;
        setDate(selDate);
    }

    const onLogin = async (detail: LoginRequest) => {
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

    const onPress = async () => {
        
        if (!isValidEmail(email)){
            showMessage({
                message: 'Invalid',
                description: "Invalid Email",
                duration: 3000,
                hideStatusBar: false,
                type: 'warning',
                icon: 'warning',
            })
            return
        }

        if (!isValidPassword(password)){
            showMessage({
                message: 'Invalid',
                description: "Password must contain atleast one digit and special character",
                duration: 3000,
                hideStatusBar: false,
                type: 'warning',
                icon: 'warning',
            })
            return
        }
        try {
            const user: Data = await register({
                email: email.toLowerCase(),
                password, 
                phone, 
                last_name: fullname.split(' ')[0],
                first_name: fullname.split(' ')[1],
                is_student: true,
            }).unwrap();

            if(isError){
                throw user;
            }
            else if( isSuccess){
                onLogin({username: email, password})
            }
        }
        catch (error){
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
            <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.card}}>
                <KeyboardAvoidingView 
                    style={{...styles.container, backgroundColor: colors.card}}
                    behavior={Platform.OS === 'ios'? "padding": "position"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? hp(50): hp(10)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.header}>
                            <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Create Account,</Typography>
                            <Typography h4 h4Style={styles.h4}>Sign up to get started!</Typography>
                        </View>
                        <OutlinedInputWithIcon 
                            icon={<MaterialIcons name="person-outline" color={colors.primary} size={24} />}
                            placeholder="Full Name" 
                            value={fullname} 
                            onChangeText={({nativeEvent}) =>setFullname(nativeEvent.text)} 
                            style={styles.textInput}
                            textContentType="name"
                        />
                        <EmailOutlinedInputWithIcon
                            icon={<MaterialIcons name="mail-outline" color={colors.primary} size={24} />}
                            value={email} 
                            onChangeText={({nativeEvent}) => setEmail(nativeEvent.text.toLowerCase())}
                            style={styles.textInput}
                        />
                        <PasswordOutlinedInputWithIcon
                            icon={<MaterialIcons name="lock-outline" color={colors.primary} size={24} />}
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={styles.textInput}
                        />
                        <OutlinedInputWithIcon
                            icon={<MaterialIcons name="phone" color={colors.primary} size={24} />}
                            placeholder="Phone" 
                            value={phone} 
                            onChangeText={({nativeEvent}) => setPhone(nativeEvent.text)}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                        />

                        
                        <View style={styles.term}>
                            
                            <Text style={{color: colors.text, flexWrap: 'wrap', fontSize: wp('3%'), fontFamily: 'OpenSans_400Regular',}}>
                                By signing up you have agreed to the{" "} 
                                <Text style={{color: extraColors.secondary, flexWrap: 'wrap'}}>
                                    terms and 
                                    condition {" "}
                                </Text> for using this app
                            </Text>
                        </View>
                        
                        <Solidbutton
                            text="Sign Up" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                    
                </KeyboardAvoidingView>
                
            </ScrollView>
            <ActInd status={isLoading || isLoading} />
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />

            <Pressable onPress={e => navigation.navigate('Login')}>
                <View style={styles.bottom}>
                        <Text style={[styles.link, {color: colors.text,}]}>
                            I'm already a user,  
                            <Text style={{color: colors.primary}}> Sign In</Text>
                        </Text>
                </View>
            </Pressable>
        </SafeAreaView>
       
    )
}

export default withTheme(SignUp);

const styles = StyleSheet.create({
    scroll: {
        flex: 1
    },
    container: {
        flex: 1,
        width: wp('100%'),
        height: hp('100%'),
        paddingTop: hp('2%'),
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('3%'),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: hp('6%'),
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
    term: {
        flexDirection: "row",
        fontSize: wp('3.2%')
    }
})