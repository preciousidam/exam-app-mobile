import React, { useEffect, useState } from 'react';
import {KeyboardAvoidingView, Text, View, StyleSheet, ScrollView, Platform, StatusBar } from 'react-native';
import { Text as Typography, Divider } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


import {Solidbutton} from '../../components/button';
import { OutlinedInput} from '../../components/input';
import { OutlinedDatePicker } from '../../components/input/datepicker';
import {DynamicPicker, DynamicPickerIOS} from '../../components/input/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { NoticeModal } from '../../components/modal';
//import { createProfile, edit, updateLevelsAsync } from '../../store/auth';
import {ActInd} from '../../components/activityIndicator';
import extraColors from '../../constants/custom-colors';

const createProfile = (value, ano) => {

}

const edit = (value) => {

}

const updateLevelsAsync = () => {

}

const Picker = Platform.OS === 'ios' ? DynamicPickerIOS: DynamicPicker;
const NIGERIA_STATE = ['Abia',
'Abuja',
'Adamawa',
'Akwa Ibom',
'Anambra',
'Bauchi','Bayelsa',
'Benue','Borno',
'Cross River','Delta',
'Ebonyi','Edo',
'Ekiti','Enugu',
'Gombe','Imo',
'Jigawa','Kaduna',
'Kano','Katsina',
'Kebbi','Kogi',
'Kwara','Lagos',
'Nasarawa','Niger',
'Ogun','Ondo',
'Osun','Oyo',
'Plateau','Rivers',
'Sokoto','Taraba',
'Yobe','Zamfara']

export function CreateProfile({navigation}){
    
    const {colors, dark} = useTheme();
    const [show, setShow] = useState(false);
    const {form, levels} = useSelector(state => state.auth);
    const [level, setLevel] = useState();
    const dispatch = useDispatch();

    const onLevelChange = (itemValue) => {
        const level = levels.find(({title}) => title == itemValue);
        setLevel(itemValue);
        dispatch(edit({...form, level:level?.id}));
    }
    const onSchoolChange = (itemValue) => dispatch(edit({...form, school: itemValue}));
    const onGenderChange = (itemValue) => dispatch(edit({...form, gender: itemValue}));
    const onPress = () => navigation.navigate('profile-cont')
    
    useEffect(() => {
        setShow(true);
        dispatch(updateLevelsAsync());
    }, [])


    return (
        
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.background}}>
                <KeyboardAvoidingView 
                    style={{...styles.container, backgroundColor: colors.background}}
                    behavior={Platform.OS === 'ios'? "padding": "padding"}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100: 100}
                >
                    <View style={styles.centeredView}>
                        <View>
                            <Typography h4 h4Style={[styles.h4, {color: extraColors.info}]}>Please provide the details below if applicable</Typography>
                        </View>
                        <Text style={[styles.help, {color: colors.text}]}>Date of Birth</Text>
                        <OutlinedDatePicker
                            placeholder="YYYY-MM-DD"
                            style={styles.picker}
                            value={form?.dob || new Date()}
                            onChangeText={value => dispatch(edit({...form, dob: value}))}
                        />
                        <Picker 
                            value={form?.gender}
                            onValueChange={onGenderChange}
                            style={styles.picker}
                            pickerStyle={{color: colors.text}}
                            options={['Select Gender', 'Male', 'Female']}
                        />
                        {/*<Picker 
                            value={form?.school}
                            onValueChange={onSchoolChange}
                            style={styles.picker}
                            pickerStyle={{color: '#000'}}
                            options={['Select School', 'Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge','Lekki British School', 'Penny Internation colledge', 'Dowen Colledge', 'Children International colledge']}
                        />*/}
                        <Picker 
                            value={level}
                            onValueChange={onLevelChange}
                            style={styles.picker}
                            pickerStyle={{color: '#000'}}
                            options={['Select level',...levels?.map(({title}) => title)]}
                        />
                        <OutlinedInput 
                            placeholder="Matric no / Exam No/ Registration No" 
                            value={form?.matricNo} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, id_number: nativeEvent.text}))}
                            style={styles.textInput}
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                        />

                        
                        
                        <Solidbutton 
                            text="Continue" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                    
                </KeyboardAvoidingView>
                
            </ScrollView>
            <NoticeModal show={show} onSubmit={() => setShow(false)} />
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </SafeAreaView>
    )
}

export function CreateProfileCont({navigation}){
    
    const {colors, dark} = useTheme();
    
    const {form} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    
    const onCountryChange = (itemValue) => dispatch(edit({...form, country: itemValue}));
    const onStateChange = (itemValue) => dispatch(edit({...form, state: itemValue}));
    const onPress = () => navigation.navigate('guardian');
    

    return (
        
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
            <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.background}}>
                <KeyboardAvoidingView 
                    style={{...styles.container, backgroundColor: colors.background}}
                    behavior="padding"
                    keyboardVerticalOffset={100}
                >
                    <View style={styles.centeredView}>
                        
                        <OutlinedInput 
                            placeholder="Address" 
                            value={form?.address} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, address: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="fullStreetAddress"
                        />
                        <OutlinedInput 
                            placeholder="City" 
                            value={form?.city} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, city: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="addressCity"
                        />

                        <Picker 
                            value={form?.country}
                            onValueChange={onCountryChange}
                            style={styles.picker}
                            pickerStyle={{color: '#000'}}
                            options={['Select Country', 'Nigeria', 'Ghana', 'Togo', 'Benin']}
                        />

                        <Picker 
                            placeholder="State" 
                            value={form?.state} 
                            onValueChange={onStateChange} 
                            style={styles.picker}
                            pickerStyle={{color: '#000'}}
                            options={form?.country === 'Nigeria'? NIGERIA_STATE: ['Select State']}
                        />
                        
                        <Solidbutton
                            text="Continue" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                    
                </KeyboardAvoidingView>
                
            </ScrollView>
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </SafeAreaView>
    )
}

export function AddGuardiansDetail(props){
    
    const {colors, dark} = useTheme();
    
    const {form, user, isLoading} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const onPress = () => dispatch(createProfile(user,form));

    return (
        
        <SafeAreaView style={{flex: 1, backgroundColor: colors.card}}>
            <ScrollView contentContainerStyle={{...styles.scroll, backgroundColor: colors.background}}>
                <KeyboardAvoidingView 
                    style={{...styles.container, backgroundColor: colors.background}}
                    behavior="padding"
                    keyboardVerticalOffset={100}
                >
                    <View style={styles.centeredView}>
                        <Text style={{color: colors.text}}>Guardian 1</Text>
                        <Divider  />
                        <OutlinedInput 
                            placeholder="email address" 
                            value={form?.guard_one_email} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, guard_one_email: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                        <OutlinedInput 
                            placeholder="phone number" 
                            value={form?.guard_one_phone} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, guard_one_phone: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                        />
                        <Text style={{color: colors.text}}>Guardian 2</Text>
                        <Divider  />
                        <OutlinedInput 
                            placeholder="email address" 
                            value={form?.guard_two_email} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, guard_two_email: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                        <OutlinedInput 
                            placeholder="phone number" 
                            value={form?.guard_two_phone} 
                            onChangeText={({nativeEvent}) => dispatch(edit({...form, guard_two_phone: nativeEvent.text}))} 
                            style={styles.textInput}
                            textContentType="telephoneNumber"
                            keyboardType="phone-pad"
                        />
                        
                        <Solidbutton
                            text="Continue" 
                            style={styles.btn}
                            onPress={onPress}
                        />
                    </View>
                    
                </KeyboardAvoidingView>
                
            </ScrollView>
            <ActInd status={isLoading} />
            <StatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </SafeAreaView>
       
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
        paddingTop: hp(1),
        paddingHorizontal: wp(0.5),
        paddingBottom: hp(2),
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    h3: {
        fontFamily: 'Montserrat_700Bold',
    },
    h4: {
        color: '#8d8d8d',
        fontSize: wp(3.2),
        marginBottom: hp(1.2),
        fontFamily: "Montserrat_400Regular"
    },
    centeredView: {
        justifyContent: "center",
        paddingTop: 10,
        paddingHorizontal: wp(2),
    },
    textInput: {
        marginVertical: hp(1.3),
        paddingHorizontal: wp('3%')
    },
    btn: {
        marginTop: hp(3),
    },
    picker: {
        marginVertical: hp(1.3),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp(.5)
    },
    help: {
        fontSize: wp(3),
    },
})