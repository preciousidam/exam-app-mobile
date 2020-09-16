import React, {useState} from 'react';
import {View, Modal, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-elements';
import {useTheme} from '@react-navigation/native';
import {loadFonts} from '../../libs/fonts';
import {AppLoading} from 'expo';
import LottieView from 'lottie-react-native';

import {Solidbutton} from '../button';
import {LevelPicker} from '../input/picker';

export function LevelModal({show, onSubmit}){
    const {colors} = useTheme();
    const fontLoaded = loadFonts();
    const [level, setLevel] = useState('Junior Secondary');

    const onValueChange = (itemValue) => setLevel(itemValue);
    const submit = _ => {
        //setvalue
        onSubmit()
    }

    return (
        fontLoaded ? <Modal
            visible={show}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Image source={require('../../assets/welcome.png')} style={styles.image} />
                    <Text h4 h4Style={styles.h4} >Welcome to Exam PMP</Text>
                    <Text style={styles.text}>Update your level before starting the next step</Text>
                    <LevelPicker 
                        value={level}
                        onValueChange={onValueChange}
                        style={styles.picker}
                        pickerStyle={{color: '#000'}}
                    />
                    <Text style={{...styles.highlight, color: colors.secondary}}>You can make changes in profile </Text>
                    <Solidbutton onPress={submit} text="Continue" style={styles.button} />
                </View>
            </View>
            
        </Modal>: <AppLoading />
    );
}

export function CompletedModal({show, onPress}){
    const {colors} = useTheme();
    const fontLoaded = loadFonts();
    
    const cont = _ => {
        onPress()
    }

    return (
        fontLoaded ? <Modal
            visible={show}
            animationType='fade'
            transparent={true}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.lottieCont}>
                        <Image 
                            style={{...styles.image, position: 'absolute'}}
                            source={require('../../assets/confetti.gif')}
                        />
                        <LottieView
                            source={require('../../assets/success.json')} 
                            style={styles.lottie}
                            autoPlay
                            loop={false} 
                        />
                    </View>
                    
                    <Text h4 h4Style={styles.h4} >Thanks for completing</Text>
                    <Text style={styles.text}>you score will be saved and you can view them later.</Text>
                    
                    <Solidbutton onPress={cont} text="Continue" style={styles.button} />
                </View>
            </View>
            
        </Modal>: <AppLoading />
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        padding: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(1,1,1, 0.3)'
    },
    container: {
        borderRadius: 10,
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
        color: '#121212'
    },
    button: {
        marginVertical: 20,
    },
    picker: {
        marginTop: 20,
    },
    highlight: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 12,
        alignSelf: "flex-start"
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