import React, {useState} from 'react';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { CardForm } from './form';
import FocusAwareStatusBar from '../../StatusBar';
import { PAY_FLOW } from '../../../store/subscription';


export const PaymentFormModal = ({show, close, pay, plan}) => {

    const {colors, dark} = useTheme();


    return (
        <Modal
            visible={show}
            animationType='slide'
            transparent={true}
            onRequestClose={close}
        >
            {PAY_FLOW.charge &&<CardForm 
                platform="Flutterwave"
                amount={plan?.price - (plan?.price * plan?.discount)}
            />}
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        padding: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(1,1,1, 0.2)'
    },
    container: {
        borderRadius: wp(2),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
    },
    image: {
        width: 300,
        height: 200,
        marginVertical: 10,
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 10,
        color: '#121212'
    },
    text: {
        fontFamily: 'OpenSans_400Regular',
        textAlign: 'center',
        color: '#121212',
        fontSize: wp(3.5)
    },
    button: {
        marginVertical: 20,
        backgroundColor: '#333'
    },
    highlight: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp(3.5),
        alignSelf: "center",
        textAlign: 'center'
    },
    lottie: {
        width: 250,
        height: 150,
    },
    lottieCont: {
        position: 'relative', 
        width: 300, 
        height: 200, 
        justifyContent: "center", 
        alignItems: "center",
    }, 
    icon: {
        marginVertical: 20,
    }
})