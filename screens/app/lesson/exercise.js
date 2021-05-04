import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {View, StyleSheet, ScrollView, Alert, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {withTheme, Text, Divider} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FocusAwareStatusBar from '../../../components/StatusBar';
import {Solidbutton, Outlinedbutton} from '../../../components/button';
import {Question} from '../../../components/question';
import {CompletedModal, InfoModal} from '../../../components/modal';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function ExercisesScreen({navigation, route}){
    const {exercises} = route?.params;
    const {colors, dark} = useTheme();
    const [qNo, setQNo] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [attempted, setAttempted] = useState({});
    
    

    const onSelect = value => setAttempted(prev => ({...prev, [qNo]: value}))
    const onSubmit = _ => {
        if (Object.keys(attempted).length === exercises.length)
            setShowModal(true);
    }
    

    return (
        <View style={{...styles.container}}>
            <View style={{...styles.header, backgroundColor: colors.card}}>
                <View style={styles.info}>
                    <Text style={styles.headerText}>No Question</Text>
                    <Text style={styles.headerText}>{exercises?.length}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.headerText}>Attempted</Text>
                    <Text style={styles.headerText}>{Object.keys(attempted).length}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.headerText}>Time</Text>
                    <Text>-</Text>
                </View>
            </View>

            <Question 
                question={exercises[qNo]} 
                number={qNo} 
                selected={attempted[qNo]}
                onSelect={onSelect}
            />

            <View style={{...styles.footer, backgroundColor: colors.card}}>
                <View style={styles.buttonCont}>
                    <Outlinedbutton 
                        text="Previous" 
                        onPress={_ => qNo > 0 && setQNo(prev => prev - 1)}
                        style={styles.button}
                        textStyle={{color: colors.primary}}
                    />
                </View>
                <View style={styles.buttonCont}>
                    <Solidbutton 
                        text={qNo < (exercises.length -1)?"Continue": "Submit" }
                        onPress={
                            qNo < (exercises.length -1) ?
                            _ => setQNo(prev => prev + 1): 
                            onSubmit
                        }
                             
                        style={styles.button}
                    />
                </View>
            </View>
            
            <CompletedModal 
                show={showModal} 
                close={() => {
                    setShowModal(false);
                    navigation.goBack();
                }}
            >
                <View>
                    <View style={styles.noteHead}>
                        <Text style={styles.noteTitle}>Summary</Text>
                        <Text style={styles.notePress} onPress={() => {
                            setShowModal(false);
                            navigation.goBack();
                        }}
                    >
                            <Ionicons name="ios-close" size={24} color="#a3a3a3" />
                        </Text>
                    </View>
                    <View>
                        {Object.entries(attempted)?.map((attempt, index) => (
                            <Result
                                key={index}
                                passed={exercises[index].answer === attempt[1]}
                                ans={exercises[index].answer}
                                pt={exercises[index].score}
                                qNo={index+1}
                            />
                        ))}
                    </View>
                </View>
            </CompletedModal>
    
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    )
}

const Result = ({passed, ans, pt, qNo}) => {
    const {colors} = useTheme();
    
    return (
        <View style={styles.result}>
            <Text style={styles.icon}>
                {!passed? <MaterialIcons name="cancel" size={40} color={colors.danger} />:
                    <Ionicons name="checkmark-circle" size={40} color={colors.success} />}
            </Text>
            <View style={styles.other}>
                <Text style={{fontFamily: "Montserrat_700Bold"}}>Question {qNo}</Text>
                <Text style={{fontFamily: "OpenSans_400Regular"}}>Answer: {ans}</Text>
            </View>
        </View>
    );
}



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
    },
    noteHead: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        elevation: 10,
        shadowColor: '#000',
        backgroundColor: '#fff'
    },
    noteTitle: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    result: {
        padding: 15,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "#c6c6c6",
        alignItems: 'center'
    },
    icon: {
        marginRight: 15,
    }
});

