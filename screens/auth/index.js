import React from 'react';
import {Image, Text, View, StatusBar, StyleSheet} from 'react-native';
import { AppLoading } from 'expo';

import {loadFonts} from '../../libs/fonts';
import {UseFlatButton, UseRoundedButton } from '../../components/Buttons';


export default function AuthOptionScreen({navigation}){

    const fontLoaded = loadFonts();

    
    if(fontLoaded){
        return(
            (
                <View>
                    <Text> Auth Options</Text>
                </View>
            )
        );
    }else{
        return(<AppLoading />)
    }
}

