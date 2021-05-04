import React, {useState} from 'react';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {loadFonts} from '../../libs/fonts';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Solidbutton} from '../button';


export function NoticeModal({show, onSubmit}){
    const {colors} = useTheme();
    const fontLoaded = loadFonts();
    const [level, setLevel] = useState('Junior Secondary');


    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Image source={require('../../assets/welcome.png')} style={styles.image} />
                    <Text h4 h4Style={styles.h4} >Welcome to HARRP</Text>
                    <Text style={styles.text}>Please take a moment to update your profile.</Text>
                    
                    <Text style={{...styles.highlight, color: colors.secondary}}>You can edit the details any time in profile </Text>
                    <Solidbutton onPress={onSubmit} text="Continue" style={styles.button} />
                </View>
            </View>
            
        </Modal>
    );
}

export function CompletedModal({show, close, children}){
    
    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={false}
            onRequestClose={close}
        >
            {children}   
        </Modal>
    );
}

export function InfoModal({show, close, children}){
    const {colors} = useTheme();
    const fontLoaded = loadFonts();
    const [level, setLevel] = useState('Junior Secondary');


    return (
        <Modal
            visible={show}
            animationType='fade'
            transparent={true}
            onRequestClose={close}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {children}
                </View>
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
        backgroundColor: 'rgba(1,1,1, 0.4)'
    },
    container: {
        borderRadius: wp(2),
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 20,
        backgroundColor: '#ffffff',
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
        textAlign: 'center',
        color: '#121212',
        fontSize: wp(3.2)
    },
    button: {
        marginVertical: 20,
    },
    highlight: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: wp('3%'),
        alignSelf: "center"
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
    }
})