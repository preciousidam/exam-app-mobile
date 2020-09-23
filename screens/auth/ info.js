import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Text as Typography } from 'react-native-elements';
import { AppLoading } from 'expo';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import {loadFonts} from '../../libs/fonts';
import {GradientButton} from '../../components/button';
import {DateInput, OutlinedInput} from '../../components/input';
import {DynamicPicker, LevelPicker, DynamicPickerIOS} from '../../components/input/picker';
import { SafeAreaView } from 'react-native-safe-area-context';



export function CreateProfile({navigation}){
    const fontLoaded = loadFonts();
    const {colors, dark} = useTheme();
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('Select Gender');
    const [school, setSchool] = useState('Select School');
    const [level, setLevel] = useState('Select Level');
    const [matricNo, setMatricNo] = useState('');

    const onLevelChange = (itemValue) => setLevel(itemValue);
    const onSchoolChange = (itemValue) => setSchool(itemValue);
    const onGenderChange = (itemValue) => setGender(itemValue);
    const onPress = e => navigation.navigate('Verify');
    const DynaPicker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;

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
                                <Typography h4 h4Style={[styles.h4, {color: colors['color-info-500']}]}>Please provide the details below if applicable</Typography>
                            </View>
                            <OutlinedInput 
                                placeholder="DOB eg 02/02/2020" 
                                value={dob} 
                                onChangeText={({nativeEvent}) =>setDOB(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="name"
                                keyboardType='numeric'
                            />
                            <DynaPicker 
                                value={gender}
                                onValueChange={onGenderChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['male', 'female']}
                            />
                            <DynaPicker 
                                value={school}
                                onValueChange={onSchoolChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge']}
                            />
                            <DynaPicker 
                                value={level}
                                onValueChange={onLevelChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['Senior Secondary', 'Junior Secondary']}
                            />
                            <OutlinedInput 
                                placeholder="Matric no / Exam No/ Registration No" 
                                value={matricNo} 
                                onChangeText={({nativeEvent}) => setMatricNo(nativeEvent.text)}
                                style={styles.textInput}
                                textContentType="newPassword"
                                keyboardType='phone-pad'
                                textContentType='telephoneNumber'
                            />

                            
                            
                            <GradientButton 
                                text="Continue" 
                                style={styles.btn}
                                onPress={onPress}
                            />
                        </View>
                        
                    </KeyboardAvoidingView>
                    
                </ScrollView>
                <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
            </SafeAreaView>
        : <AppLoading />
    )
}

export default withTheme(CreateProfile);

const styles = StyleSheet.create({
    scroll: {
        flex: 1
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 40,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    h3: {
        fontFamily: 'Montserrat_700Bold',
    },
    h4: {
        color: '#8d8d8d',
        fontSize: 18,
        marginBottom: 20,
    },
    centeredView: {
        justifyContent: "center",
        paddingTop: 10,
    },
    textInput: {
        marginVertical: 10,
    },
    btn: {
        marginTop: 50,
    },
    picker: {
        marginTop: 20,
    },
})