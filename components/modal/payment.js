import React, {useState} from 'react';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Solidbutton, SolidbuttonNoGradient} from '../button';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';


export const PaymentModal = ({show, close, pay}) => {

    const {colors} = useTheme();


    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.overlay}>
                <LinearGradient start={[0.6,0.4]} colors={['#f5af19', '#FF9D14',]}  style={[styles.container]}>
                    <Text style={[styles.icon]}><Ionicons name="ios-warning" size={50} color={colors.secondary} /></Text>
                    <Text h4 h4Style={[styles.h4, {color: colors.text}]} >Update Payment</Text>
                    <Text style={[styles.text, {color: colors.text}]}>You dont have an active subscription.</Text>
                    
                    <Text style={{...styles.highlight, color: colors.secondary}}>To have unlimited access to lesson and practice question please update your payment plan.</Text>
                    <SolidbuttonNoGradient  
                        text="Update Payment" 
                        style={styles.button} 
                        onPress={pay}
                    />
                    <TouchableOpacity onPress={close}>
                        <Text 
                            style={[styles.text, {color: colors.text, marginBottom: 20, fontFamily: "Montserrat_700Bold"}]}
                            onPress={close}
                        >
                            Not Right Now
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            
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