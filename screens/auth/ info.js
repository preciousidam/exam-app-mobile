import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Text as Typography, Divider } from 'react-native-elements';
import { AppLoading } from 'expo';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

import {loadFonts} from '../../libs/fonts';
import {GradientButton} from '../../components/button';
import {DateInput, OutlinedInput} from '../../components/input';
import {DynamicPicker, LevelPicker, DynamicPickerIOS} from '../../components/input/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { signIn } from '../../store/reducers/auth';



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
    const onPress = e => navigation.navigate('profile-cont');
    const DynaPicker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;

    return (
        fontLoaded ?
            <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
                <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.card}}>
                    <KeyboardAvoidingView 
                        style={{...styles.container, backgroundColor: colors.card}}
                        behavior={Platform.OS === 'ios'? "padding": "padding"}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 100}
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
                                keyboardType='phone-pad'
                            />
                            <DynaPicker 
                                value={gender}
                                onValueChange={onGenderChange}
                                style={styles.picker}
                                pickerStyle={{color: colors.text}}
                                options={['Select Gender', 'male', 'female']}
                            />
                            <DynaPicker 
                                value={school}
                                onValueChange={onSchoolChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge']}
                            />
                            <DynaPicker 
                                value={school}
                                onValueChange={onLevelChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['Select Level', 'Senior secondary', 'Junior secondary']}
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

export function CreateProfileCont({navigation}){
    const fontLoaded = loadFonts();
    const {colors, dark} = useTheme();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');

    
    const onCountryChange = (itemValue) => setCountry(itemValue);
    const onPress = e => navigation.navigate('guardian');
    const DynaPicker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;

    return (
        fontLoaded ?
            <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
                <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.card}}>
                    <KeyboardAvoidingView 
                        style={{...styles.container, backgroundColor: colors.card}}
                        behavior="padding"
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.header}>
                                <Typography h4 h4Style={styles.h4}>Please provide the details below if applicable</Typography>
                            </View>
                            <OutlinedInput 
                                placeholder="Address" 
                                value={address} 
                                onChangeText={({nativeEvent}) =>setAddress(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="fullStreetAddress"
                            />
                            <OutlinedInput 
                                placeholder="City" 
                                value={city} 
                                onChangeText={({nativeEvent}) =>setCity(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="addressCity"
                            />
                            <OutlinedInput 
                                placeholder="State" 
                                value={state} 
                                onChangeText={({nativeEvent}) =>setState(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="addressState"
                            />
                            <DynaPicker 
                                value={country}
                                onValueChange={onCountryChange}
                                style={styles.picker}
                                pickerStyle={{color: '#000'}}
                                options={['Select Country', 'Nigeria', 'Ghana', 'Togo', 'Benin']}
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

export function AddGuardiansDetail(props){
    const fontLoaded = loadFonts();
    const {colors, dark} = useTheme();
    const [g1Email, setG1Email] = useState('');
    const [g2Email, setG2Email] = useState('');
    const [g1Phone, setG1Phone] = useState('');
    const [g2Phone, setG2Phone] = useState('');
    const dispatch = useDispatch();
    
    const onPress = e => dispatch(signIn({name: 'Ebubechukwu', email: 'preciousidam@gmail.com'}));

    return (
        fontLoaded ?
            <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
                <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.card}}>
                    <KeyboardAvoidingView 
                        style={{...styles.container, backgroundColor: colors.card}}
                        behavior="padding"
                        keyboardVerticalOffset={100}
                    >
                        <View style={styles.centeredView}>
                            <Text style={{color: colors.text}}>Guardian 1</Text>
                            <Divider  />
                            <OutlinedInput 
                                placeholder="email address" 
                                value={g1Email} 
                                onChangeText={({nativeEvent}) =>setG1Email(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                            <OutlinedInput 
                                placeholder="phone number" 
                                value={g1Phone} 
                                onChangeText={({nativeEvent}) =>setG1Phone(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                            />
                            <Text style={{color: colors.text}}>Guardian 2</Text>
                            <Divider  />
                            <OutlinedInput 
                                placeholder="email address" 
                                value={g2Email} 
                                onChangeText={({nativeEvent}) =>setG2Email(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="emailAddress"
                                keyboardType="email-address"
                            />
                            <OutlinedInput 
                                placeholder="phone number" 
                                value={g2Phone} 
                                onChangeText={({nativeEvent}) =>setG2Phone(nativeEvent.text)} 
                                style={styles.textInput}
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
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

export const ScreenOne = withTheme(CreateProfile);
export const ScreenTwo = withTheme(CreateProfileCont);
export const ScreenThree = withTheme(AddGuardiansDetail);

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
        paddingHorizontal: 15,
    },
    textInput: {
        marginVertical: 20,
    },
    btn: {
        marginTop: 50,
    },
    picker: {
        marginVertical: 20
    },
})