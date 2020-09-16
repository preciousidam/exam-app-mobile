import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { AppLoading } from 'expo';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import {loadFonts} from '../../libs/fonts';
import {GradientButton} from '../../components/button';
import {OutlinedInput} from '../../components/input';



export function SignIn({navigation, route}){
    const {signIn} = route.params;
    const fontLoaded = loadFonts();
    const {colors, dark} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onPress = e => signIn({ type: 'SIGN_IN', token: email });

    return (
        fontLoaded ? 
            <ScrollView contentContainerStyle={styles.scroll}>
                <KeyboardAvoidingView style={{...styles.container, backgroundColor: colors.card}}>
                    <View style={styles.centeredView}>
                        <View style={styles.header}>
                            <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Welcome,</Typography>
                            <Typography h4 h4Style={styles.h4}>Sign in to continue!</Typography>
                        </View>
                        <OutlinedInput 
                            placeholder="Email" 
                            value={email} 
                            onChangeText={({nativeEvent}) =>setEmail(nativeEvent.text)} 
                            style={styles.textInput}
                            textContentType='emailAddress'
                            keyboardType="email-address"
                        />
                        <OutlinedInput 
                            placeholder="Password" 
                            value={password} 
                            onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                            style={styles.textInput} 
                            textContentType='password'
                            secureTextEntry={true}
                        />
                        <Text style={{...styles.reset, color: colors.text}} >Forgot Password</Text>
                        <GradientButton 
                            text="Login" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                    <View style={styles.bottom}>
                        <Text style={{color: colors.text}}>
                            I'm a new user,{" "}  
                            <Text 
                                style={{color: colors.primary}}
                                onPress={e => navigation.navigate('signUp')}
                            > 
                                Create Account
                            </Text>
                        </Text>
                    </View>
                </KeyboardAvoidingView>
                <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
            </ScrollView>
        : <AppLoading />
    )
}

export default withTheme(SignIn);

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 40,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    header: {
        marginBottom: 70,
    },
    h3: {
        fontFamily: 'Montserrat_700Bold',
    },
    h4: {
        color: '#8d8d8d',
        fontSize: 24,
    },
    centeredView: {
        justifyContent: "center",
        paddingTop: 60,
    },
    textInput: {
        marginVertical: 10,
    },
    reset: {
        alignSelf: "flex-end",
        fontFamily: 'OpenSans_400Regular',
    },
    btn: {
        marginTop: 50,
    },
    bottom: {
        alignItems: "center",
        justifyContent: 'center',
    },
})