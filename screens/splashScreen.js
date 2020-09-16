import React from 'react';
import {Text, StatusBar, View, StyleSheet} from 'react-native';
import { withTheme } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { AppLoading } from 'expo';
import { Button } from 'react-native-elements';

import {loadFonts} from '../libs/fonts';


export function SplashScreen({theme}){
    const {colors, dark} = useTheme();

    const fontLoaded = loadFonts();

    return (
        fontLoaded ? (<View style={{...styles.container, backgroundColor: colors.primary}}>
            <Text style={{...styles.text, color: theme.colors.white}}>EXAM PMP</Text>
            <Text style={{...styles.subText, bottom: 40, color: theme.colors.white}}>From</Text>
            <Text style={{...styles.subText, color: theme.colors.white, fontFamily: "OpenSans_700Bold"}}> TODD Gabriels</Text>
            <StatusBar barStyle={dark? 'dark-content': 'light-content'} backgroundColor={colors.primary} />
        </View>): <AppLoading />
    );
}

export default withTheme(SplashScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },

    subText: {
        position: "absolute",
        bottom: 20,
    }
})