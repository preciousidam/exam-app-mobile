import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@react-navigation/native';


export const Outlinedbutton = ({text, onPress, style, textStyle}) =>{
    const {colors} = useTheme()
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
            <View style={{...styles.outlined, borderColor: colors.primary, ...style}}>
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export const Solidbutton = ({text, onPress, style, textStyle}) =>{
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container}} activeOpacity={0.8}>
            <View style={{...styles.view, borderRadius: 30, ...style}}>
                <LinearGradient start={[0.7,0.2]} colors={['#f5af19', '#FF9D14',]} style={{...styles.grad, borderRadius: 30}} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </LinearGradient>
            </View>
        </TouchableOpacity>
    )
}

export const GradientButton = ({text, onPress, style, textStyle}) => {

    return (
        <TouchableOpacity onPress={onPress} style={{...styles.container, ...style}} activeOpacity={0.7}>
            <View style={styles.view}>
                <LinearGradient start={[0.7,0.2]} colors={['#f5af19', '#FF9D14']} style={styles.grad} >
                    <Text style={{...styles.text, ...textStyle}}>{text}</Text>
                </LinearGradient>
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
        fontWeight: 'bold',
    },
    view: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    grad: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    outlined: {
        padding: 15,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 30,
    }
})