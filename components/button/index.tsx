import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface IProps {
    text: string,
    style?: object | object[],
    textStyle?: object | object[],
    onPress: () => void,
    icon?: JSX.Element
}
export const Outlinedbutton = ({text, onPress, style, textStyle}: IProps) =>{
    const {colors} = useTheme()
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
            <View style={{...styles.outlined, borderColor: colors.primary, ...style}}>
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const Solidbutton = ({text, onPress, style, textStyle}: IProps) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
                <LinearGradient start={[0.7,0.2]} colors={['#f5af19', '#FF9D14',]} style={[{...styles.grad, borderRadius: wp('2%')},style]} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </LinearGradient>
        </TouchableOpacity>
    )
}

export const SolidbuttonNoGradient = ({text, onPress, style, textStyle}: IProps) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
                <View style={[{...styles.grad, borderRadius: wp('2%')}, style]} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </View>
        </TouchableOpacity>
    )
}

export const SolidbuttonWithIcon = ({text, onPress, style, textStyle, icon}: IProps) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
                <LinearGradient start={[0.7,0.2]} colors={['#f5af19', '#FF9D14',]} style={[{...styles.grad, borderRadius: 25},style]} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                    <View style={styles.icon}>{icon}</View>
                </LinearGradient>
        </TouchableOpacity>
    )
}


export const FloatingActionButton = ({icon, onPress, style}) => {
    const {colors} = useTheme();
    return (
        <TouchableOpacity 
            onPress={onPress} 
            activeOpacity={0.8} 
            style={[{position: "absolute", bottom: 30, right: 30, zIndex: 100}, style]}
        >
            <View style={[styles.actionBtn, {backgroundColor: colors.primary}]}>
                {icon}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        color: '#ffffff',
        fontSize: wp("3.5%")
    },
    grad: {
        width: '100%',
        padding: wp("3.5%"),
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: wp('2%'),
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "row"
    },
    outlined: {
        padding: wp("3.5%"),
        borderWidth: 1,
        borderColor: 'transparent',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: wp('2%'),
    },
    actionBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        padding: 20,
        elevation: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        position: "absolute",
        right: 8,
        backgroundColor: '#000000',
        padding: wp("2.5%"),
        borderWidth: 1,
        borderRadius: wp("5%"),
    },
})