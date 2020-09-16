import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text, Avatar, Badge, withTheme, Button, Divider} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '@react-navigation/native';



import Corousel from '../../../components/corousel';
import {SubjectCard} from '../../../components/card';
import {LevelModal} from '../../../components/modal';
import FocusAwareStatusBar from '../../../components/StatusBar';
import {data, practise} from '../../../constants/data';


export function PracticeScreen({navigation}){
    const {colors, dark} = useTheme();
    const [showModal, setShowModal] = useState(true);

    const random = [colors.primary, colors.secondary, colors.notification, colors.facebook];

    const onSubmit = _ => setShowModal(false);

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.innerView}>
                    <Header name={'Ebube'} />
                    <Corousel data={data} />
                    
                    <View style={{...styles.callToAction}}>
                        
                        <Text style={{...styles.callText, color: colors.text}}>
                            Get access to more practice question by 
                            setting up your profile and subscribing.
                        </Text>
                        <Button buttonStyle={{width: 150}} title="Subscribe" />
                    </View>
                    <View style={styles.lastView}>
                        <View style={styles.lHeader}>
                            <Text h4 h4Style={{...styles.h4, color: colors.text}}>Practice Exams</Text>
                            <Text style={{color: colors.secondary}}>View all</Text>
                        </View>
                        {practise.map(({id, examBody, duration, noQuestn, subject, year}, i) => (
                            <SubjectCard
                                key={id}
                                examBody={examBody}
                                id={id}
                                duration={duration}
                                year={year}
                                noQuestn={noQuestn}
                                subject={subject}
                                onPress={_ => console.log(id)}
                                iconColor={random[i%4]}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <LevelModal show={showModal} onSubmit={onSubmit} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </View>
    )
}

export default withTheme(PracticeScreen);


function Header({name}){
    const {colors} = useTheme();
    const notification = true;
    return (
        <View style={styles.header}>
            <View style={styles.headerprofile}>
                <Avatar 
                    rounded 
                    size="medium" 
                    icon={{name: 'person', type: 'ionicons', color: colors.secondary}} 
                    containerStyle={{backgroundColor: colors.primary, marginTop: 10}} 
                />
                <View style={{flexDirection: "column", padding: 10}}>
                    <Text>Hi {name}</Text>
                    <Text h4 h4Style={styles.h4}>Do practice exercise!</Text>
                </View>
            </View>
            <View>
                <Ionicons name='ios-notifications-outline' size={30} color={colors.highlight} />
                {notification && <Badge status='error' containerStyle={{ position: 'absolute', top: 2, right: 1 }} />}
            </View>
            
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    headerprofile: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    h4: {
        fontSize: 20,
    },
    callToAction: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
    },
    callText: {
        textAlign: "center", 
        marginBottom: 20, 
        fontFamily: 'OpenSans_400Regular',
        padding: 5,
    },
    lastView: {
        padding: 20,
    },
    lHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});