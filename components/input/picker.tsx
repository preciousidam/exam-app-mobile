import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useActionSheet} from '@expo/react-native-action-sheet';
import { useTheme } from '@react-navigation/native';
import { ItemValue } from '@react-native-community/picker/typings/Picker';



const {Item} = Picker;

const levels = ['Junior Secondary', 'Senior Secondary']

export interface IProps {
    value?: string,
    icon?: JSX.Element,
    style?: object | object[],
    placeholder?: string,
    contProps?: object,
    inputStyle?: object | object[],
    onValueChange: (value: ItemValue, index?: number) => void,
}

export const LevelPicker: React.FC<IProps & Record<string,any>> = ({style, contProps, pickerStyle, onValueChange, value, ...rest}) => {
    
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


export const DynamicPicker: React.FC<IProps & Record<string,any>> = ({style, contProps, pickerStyle, onValueChange, options, value, ...rest}) => {
    
    const {colors} = useTheme();
    
    return (
        <View 
            {...contProps} 
            style={{...styles.container, ...style}}
        >
            <Picker 
                selectedValue={value} 
                style={{...styles.input, ...pickerStyle, color: colors.text}} 
                onValueChange={onValueChange}
                {...rest}
            >
                {options.map((x,i) => <Item label={x} key={i} value={x} />)}
            </Picker>
        </View>
    )
}

export const DynamicPickerIOS: React.FC<IProps & Record<string,any>> = ({style, contProps, pickerStyle, onValueChange, options, value, ...rest}) => {
    
    const {colors} = useTheme();
    const sheetOptions = [...options, 'cancel'];
    const { showActionSheetWithOptions } = useActionSheet();
    const showSheet = _ => showActionSheetWithOptions(
        {
            options: sheetOptions,
            cancelButtonIndex: sheetOptions.length - 1,
        },
        index => {
            if(index === sheetOptions.length - 1) return
            onValueChange(sheetOptions[index]);
        }
    );
    
    return (
        <TouchableWithoutFeedback onPress={showSheet}>
            <View
                {...contProps} 
                style={{...styles.container, ...style}}
            >
                <Text
                    style={{...styles.input, color: colors.text, ...pickerStyle, padding: 15}}  
                    {...rest} 
                >
                    {value}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}



const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#c6c6c6',
        borderRadius: 10,
    },
    input: {
        fontFamily: 'Montserrat_700Bold',
        width: '100%'
    }
})