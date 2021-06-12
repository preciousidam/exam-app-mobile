import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import {GradientButton} from '../../components/button';
import {OutlinedInput} from '../../components/input';



export function ResetPassword({navigation, route}){
    const {signIn} = route.params;
    const {colors, dark} = useTheme();
    const [email, setEmail] = useState('');

    const onPress = e => signIn({ type: 'SIGN_IN', token: email });

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <KeyboardAvoidingView style={{...styles.container, backgroundColor: colors.card}}>
                <View style={styles.centeredView}>
                    <View style={styles.header}>
                        <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Forgot Password,</Typography>
                        <Typography h4 h4Style={styles.h4}>Sign in to continue!</Typography>
                    </View>
                    <OutlinedInput 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={({nativeEvent: {text}}) =>setEmail(text)} 
                        style={styles.textInput}
                        textContentType='emailAddress'
                        keyboardType="email-address"
                    />

                    <GradientButton 
                        text="Reset" 
                        style={styles.btn}
                        onPress={onPress}
                    />
                </View>
                
            </KeyboardAvoidingView>
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </ScrollView>
    )
}

export default withTheme(ResetPassword);

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
})