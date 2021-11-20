import React, { useState } from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Modal } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';

import { Solidbutton } from '../components/button';

import {bootstrap} from '../store/app';
import FocusAwareStatusBar from '../components/StatusBar';



export const Agree = ({navigation}) => {
    const {colors, dark} = useTheme();
    const {width, height} = useWindowDimensions();
    const {top, bottom} = useSafeAreaInsets();
    const [showModal, setShowModal] = useState(false);
    const onPressTermPolicy = _ => setShowModal(true);
    const dispatch = useDispatch();
    const onPress = _ => {
        dispatch(bootstrap({terms: true}));
    }



    return (
        <View style={[styles.container, {width, height, paddingTop: top, paddingBottom: bottom+10}]}>
            <View style={styles.first}>
                <Text style={[styles.headerText, {color: colors.primary}]}>Welcome to HARRP app</Text>
                <Text 
                    style={[styles.text, {color: colors.text}]}
                >
                    Lorem ipsum dolor sit amet, 
                    consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt 
                    ut labore et dolore magna aliqua.
                </Text>
            </View>
            <View style={styles.second}>
                <Text
                    style={[styles.terms, {color: colors.text}]}
                >
                    To continue, read and agree to the
                    <Text style={styles.inner} onPress={() => onPressTermPolicy('Terms')}> Terms of Service </Text>
                    and <Text style={styles.inner} onPress={() => onPressTermPolicy('Policy')}> Policy Notice</Text>
                </Text>
                <Solidbutton 
                    text="Agree" 
                    style={styles.button}
                    onPress={onPress}
                />
            </View>
            <Modal
                visible={showModal}
                onRequestClose={_ => setShowModal(false)}
                transparent={false}
            >
                <View>
                    <Text>Terms and Policy</Text>
                </View>
            </Modal>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content'} backgroundColor={colors.background} />
        </View>
    );
}

export default Agree;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        alignItems: "center",
        justifyContent: "space-between",
    },
    first: {
        paddingTop: 100,
    },
    second: {
        width: '100%'
    },
    headerText: {
        fontFamily: 'Montserrat_400Regular',
        textAlign: "center",
        fontSize: 30,
        marginBottom: 20,
    },
    text:{
        fontFamily: 'Montserrat_400Regular',
        textAlign: "center",
        fontSize: 16,
    },
    terms: {
        fontFamily: 'OpenSans_400Regular',
        marginBottom: 20,
    },
    inner: {
        fontFamily: 'OpenSans_700Bold',
        textDecorationLine: 'underline'
    },
    button: {
        
    }
})