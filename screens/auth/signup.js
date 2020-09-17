import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { AppLoading } from 'expo';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import {loadFonts} from '../../libs/fonts';
import {GradientButton} from '../../components/button';
import {DateInput, OutlinedInput} from '../../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';



export function SignUp({navigation}){
    const fontLoaded = loadFonts();
    const {colors, dark} = useTheme();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState(new Date());
    const [accept, setAccept] = useState(false);

    const onDateChange = (event, selectedDate) => {
        const selDate = selectedDate || date;
        setDate(selDate);
    }

    return (
        fontLoaded ?
            <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
                <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.card}}>
                    <KeyboardAvoidingView 
                        style={{...styles.container, backgroundColor: colors.card}}
                        behavior={Platform.OS === 'ios'? "padding": "position"}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 10}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.header}>
                                <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Create Account,</Typography>
                                <Typography h4 h4Style={styles.h4}>Sign up to get started!</Typography>
                            </View>
                            <OutlinedInput 
                                placeholder="Full Name" 
                                value={email} 
                                onChangeText={({nativeEvent}) =>setEmail(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="name"
                            />
                            <OutlinedInput 
                                placeholder="Email" 
                                value={password} 
                                onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                                style={styles.textInput}
                                keyboardType="email-address"
                                textContentType="emailAddress"
                            />
                            <OutlinedInput 
                                placeholder="Password" 
                                value={password} 
                                onChangeText={({nativeEvent}) => setPassword(nativeEvent.text)}
                                style={styles.textInput}
                                secureTextEntry={true}
                                textContentType="newPassword"
                            />
                            <OutlinedInput 
                                placeholder="Phone" 
                                value={phone} 
                                onChangeText={({nativeEvent}) => setPhone(nativeEvent.text)}
                                style={styles.textInput}
                                textContentType="newPassword"
                                keyboardType='phone-pad'
                                textContentType='telephoneNumber'
                            />

                            
                            <View style={styles.term}>
                                
                                <Text style={{color: colors.text, flexWrap: 'wrap',}}>
                                    By signing up you have agreed to the{" "} 
                                    <Text style={{color: colors.secondary, flexWrap: 'wrap'}}>
                                        terms and 
                                        condition {" "}
                                    </Text> for using this app
                                </Text>
                            </View>
                            
                            <GradientButton text="Sign Up" style={styles.btn} />
                        </View>
                        
                    </KeyboardAvoidingView>
                    
                </ScrollView>
                <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
                <View style={styles.bottom}>
                        <Text style={{color: colors.text,}}>
                            I'm already a user,{" "}   
                            <Text 
                                style={{color: colors.primary}}
                                onPress={e => navigation.navigate('Login')}
                            > 
                                Sign In
                            </Text>
                        </Text>
                    </View>
            </SafeAreaView>
        : <AppLoading />
    )
}

export default withTheme(SignUp);

const styles = StyleSheet.create({
    scroll: {
        flex: 1
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
        paddingBottom: 30,
    },
    term: {
        flexDirection: "row",
    }
})