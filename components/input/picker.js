import React, {createRef, useEffect, useState} from 'react';
import {Picker, View, StyleSheet} from 'react-native';
import { useTheme } from '@react-navigation/native';

const {Item} = Picker;

const levels = ['Junior Secondary', 'Senior Secondary']

export const LevelPicker = ({style, contProps, pickerStyle, onValueChange, value, ...rest}) => {
    
    const {colors} = useTheme();
    
    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style}}
        >
            <Picker 
                selectedValue={value} 
                style={{...styles.input, color: colors.text, ...pickerStyle}} 
                onValueChange={onValueChange}
                {...rest} 
            >
                {levels.map((x,i) => <Item label={x} key={i} value={x} />)}
            </Picker>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderRadius: 10,
    },
    input: {
        fontFamily: 'Montserrat_700Bold',
        width: '100%'
    }
})