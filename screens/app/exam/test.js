import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {withTheme, Text, Divider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FocusAwareStatusBar from '../../../components/StatusBar';
import {Solidbutton, Outlinedbutton} from '../../../components/button';
import {Question} from '../../../components/question';
import {CompletedModal} from '../../../components/modal';

export function MainTest({navigation}){
    const {colors, dark} = useTheme();
    const [qNo, setQNo] = useState(0);
    const [showModal, setShowModal] = useState(false);
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <HeaderButtonRight onNotePress={_ => Alert.alert('taking note')} />
          ),
        });
      }, [navigation]);

    return (
        <View style={{...styles.container}}>
            <View style={{...styles.header, backgroundColor: colors.card}}>
                <View style={styles.info}>
                    <Text style={styles.headerText}>No Question</Text>
                    <Text style={styles.headerText}>50</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.headerText}>Attempted</Text>
                    <Text style={styles.headerText}>25</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.headerText}>Time</Text>
                    <CountDown styles={styles.headerText} duration={60} />
                </View>
            </View>
            <Question number={qNo} />
            <View style={{...styles.footer, backgroundColor: colors.card}}>
                <View style={styles.buttonCont}>
                    <Outlinedbutton 
                        text="Previous" 
                        onPress={_ => qNo > 0 && setQNo(prev => prev - 1)}
                        style={styles.button}
                        textStyle={{color: colors.text}}
                    />
                </View>
                <View style={styles.buttonCont}>
                    <Solidbutton 
                        text="Continue" 
                        onPress={_ => qNo < 49 && setQNo(prev => prev + 1)}
                        style={styles.button}
                    />
                </View>
            </View>
            <CompletedModal 
                show={showModal} 
                onPress={() => {
                    setShowModal(false)
                    navigation.navigate('home')
                }} 
            />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

export default withTheme(MainTest);

export function CountDown({duration, styles}){
    const {colors, dark} = useTheme();
    const [min, setMin] = useState(duration - 1);
    const [sec, setSec] = useState(59);
    const ref = useRef(true);

    const startCount = async _ => {
        setInterval(() => {
            if(ref.current)
                setSec(prev => prev -  1)
        }, 1000);
    }

    useEffect(() => {
        if (sec < 0 && ref.current)
            setMin(prev => prev - 1);
    }, [sec]);

    useEffect(() => { 
        if(ref.current)
            setSec(59);
    }, [min]);

    useEffect(() => {
        startCount();
        return () => {
            ref.current = false;
            clearInterval(startCount);
        }
    },[])

    return (
        <Text 
            style={{...styles, color: min < 10 ? colors.notification: colors.secondary}}
        >
            {`${min}:${('0'+sec).slice(-2)}`}
        </Text>)
}

export function HeaderButtonRight({onNotePress}){
    const {colors} = useTheme();
    return (
        <View style={styles.headerRight} >
            <TouchableWithoutFeedback onPress={onNotePress} style={styles.headerButton}>
                <MaterialCommunityIcons name='file-document-edit-outline' color={colors.text} size={24} onPress={onNotePress} />
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    header: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center"
    },
    info: {
        justifyContent: "center",
        alignItems: "center"
    },
    h4: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 18,
    },
    headerText: {
        fontFamily: "OpenSans_700Bold"
    },
    body: {
        padding: 20,
    },
    card: {
        width: '100%',
        borderRadius: 10,
        padding: 20,
        elevation: 15
    },
    questn: {
        fontSize: 16,
        lineHeight: 24,
        fontFamily: 'OpenSans_400Regular',
    },
    footer: {
        position: "absolute",
        bottom: 0,
        padding: 20,
        width: '100%',
        left: 0,
        right: 0,
        alignItems: "center",
        flexDirection: "row",
        maxWidth: '100%'
    },
    buttonCont: {
        flexDirection: "row", 
        width: '50%', 
        flex: 1, 
        paddingHorizontal: 10,
    },
    button: {
        width: '100%',
        flexDirection: 'row'
    },
    headerRight: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: "center",
    },
    headerButton: {
        marginHorizontal: 10,
    }
});