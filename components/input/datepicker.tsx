import React, {createRef, useEffect, useState} from 'react';
import {TextInput, View, StyleSheet, TouchableOpacity, Text, Platform} from 'react-native';
import { useTheme } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export interface IProps {
    help?: string,
    onChangeText: (value:string) => void,
    style?: object | object[],
    placeholder?: string,
    contProps?: object,
    inputStyle?: object | object[],
    value?: string,
    icon?: JSX.Element
};

const date = new Date();

export const OutlinedDatePicker: React.FC<IProps & Record<string,any>> = ({style, icon, help, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const [borderColor, setBorderColor] = useState('#c6c6c6')
    

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        onChangeText(moment(currentDate).format('YYYY-MM-DD'));
    };
    
    
    

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor, padding: 5,}}
        >   
            <TouchableOpacity onPress={_ => setShow(true)}>
                <View style={styles.icon}>
                    <Ionicons name="md-calendar" size={wp('4.5%')} color={colors.text} />
                </View>
            </TouchableOpacity>
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={moment(value).format('YYYY-MM-DD')} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChangeText={onChangeText}
                blurOnSubmit={true}
                editable={false}
                {...rest} 
            />
            
            {show && <DateTimePicker
                testID="dateTimePicker"
                value={new Date(value)}
                mode="date"
                display="default"
                onChange={onChange}
            />}
        </View>
    )
}

export const OutlinedTimePicker = ({style, icon, help, contProps, inputStyle, onChangeText, value, ...rest}) => {
    
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    const [show, setShow] = useState(false);
    useEffect(() => {
        if(focused) setBorderColor(colors.primary)
        else setBorderColor('#c6c6c6');
    }, [focused])

    const [borderColor, setBorderColor] = useState('#c6c6c6')
    

    const onFocus = _ => setFocused(true);
    const onBlur = _ => setFocused(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        onChangeText(moment(currentDate).format('LT'));
      };
    
    
    

    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style, borderColor, padding: 5,}}
        >   
            <TouchableOpacity onPress={_ => setShow(true)}>
                <View style={styles.icon}>
                    <Ionicons name="time" size={wp('4.5%')} color={colors.text} />
                </View>
            </TouchableOpacity>
            <TextInput 
                onFocus={onFocus} 
                onBlur={onBlur} 
                value={moment(value).format('LT')} 
                style={{...styles.input, color: colors.text, ...inputStyle}} 
                onChange={onChangeText}
                blurOnSubmit={true}
                editable={false}
                {...rest} 
            />
            
            {show && <DateTimePicker
                testID="dateTimePicker"
                value={new Date(value)}
                mode="time"
                display="default"
                onChange={onChange}
            />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderRadius: wp(2),
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontFamily: 'Montserrat_400Regular',
        width: '100%',
        height: hp('5.7%'),
        fontSize: wp("3.3%"),
    },
    icon: {
        borderRightWidth: 1,
        borderRightColor: '#c6c6c6',
        paddingHorizontal: wp("2.6%"),
        marginRight: wp("2.5%")
    }
})