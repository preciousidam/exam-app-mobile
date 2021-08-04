import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';


import {Solidbutton} from '../../components/button';
import {verify} from '../../assets/verify';
import { useDispatch, useSelector } from 'react-redux';
import { sendVerify, verifyEmail } from '../../store/reducers/auth';
import { ActInd } from '../../components/activityIndicator';


const CELL_COUNT = 6;

export function VerifyPhone({navigation}){
    const {colors, dark} = useTheme();
    const [value, setValue] = useState('');
    const {navigate} = navigation;
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT})
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
    const dispatch = useDispatch();
    const {user, isLoading} = useSelector(state => state.auth);

    const onPress = () => {
        dispatch(verifyEmail(value, user?.pk));
    }

    useEffect(() => {
        dispatch(sendVerify(user?.pk));
    },[])

    return (
        <ScrollView contentContainerStyle={styles.scroll}>
            <KeyboardAvoidingView style={{...styles.container, backgroundColor: colors.card}}>
                <View style={styles.centeredView}>
                    <View style={styles.header}>
                        <Typography h3 h3Style={{...styles.h3, color: colors.text}}>Verify Number</Typography>
                    </View>
                    <SvgXml xml={verify} width={150} height={100} />
                    <Typography 
                        style={{textAlign: "center", marginVertical: 30, width: 250}}
                    >
                        Please enter the six digit code we sent to your email.
                    </Typography>

                    <CodeField 
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol,isFocused}) => (
                            <Text
                            key={index}
                            style={[styles.cell, isFocused && {borderColor: colors.primary}]}
                            onLayout={getCellOnLayoutHandler(index)}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                            
                            </Text>
                        )}
                    />

                    <Solidbutton
                        text="Verify" 
                        style={styles.btn}
                        onPress={onPress}
                    />
                </View>
                
            </KeyboardAvoidingView>
            <ActInd status={isLoading} />
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </ScrollView>
    )
}

export default withTheme(VerifyPhone);

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
        marginBottom: 40,
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
        alignItems: 'center',
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
    codeFieldRoot: {
        marginTop: 20
    },
    cell: {
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderRadius: 10,
        marginHorizontal: 5,
        borderColor: '#00000030',
        textAlign: 'center',
        
    },
    focusCell: {
        borderColor: '#000',
    },
    
})