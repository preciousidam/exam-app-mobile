import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import {AppLoading} from 'expo';
import {Text, Badge, SearchBar} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';


import FocusAwareStatusBar from '../../../components/StatusBar';
import { loadFonts } from '../../../libs/fonts';
import { HeaderBackButton } from '@react-navigation/stack';
import { SolidbuttonWithIcon } from '../../../components/button';

const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];
const sections = ['Details', 'Exercises', 'Highlights']

export default function OverviewScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const fontLoaded = loadFonts();
    const {navigate} = navigation;
    const [active, setActive] = useState(0)
    const {width, height} = useSafeAreaInsets();
    const {id} = route.params;
    const lesson = useSelector(state => state.lessons.find(({id: lessonId}) => id === lessonId));

    const detailsActive = startFrom => navigate('Detail', {id, startFrom});
    const exerciseActive = _ => navigate('', {id});
    
    return (
        fontLoaded ? <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingTop: height}]}>
            
            <View style={styles.sect}>
               <View style={styles.header}>
                    <View style={styles.lableView}>
                        <Text 
                            style={[styles.headerText, {fontFamily: 'Montserrat_700Bold'}]}
                        >
                            {lesson?.subject} Lesson
                        </Text>
                    </View>
                    <HeaderBackButton onPress={_ => navigation.goBack()} />
               </View>
               <View style={styles.topicView}>
                    <Text style={styles.topic}>{lesson?.topic}</Text>
                    <Text style={styles.exercise}>{lesson?.noExercise} Exercises</Text>
               </View>
               <View style={styles.tab}>
                    {sections.map((x,i) => (
                        <TouchableOpacity key={i} onPress={_ => setActive(i)}>
                            <View style={[styles.tabBar, {backgroundColor: i == active? colors.primary: 'transparent'}]}>
                                <Text style={styles.tabBarLabel}>{x}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
               </View>
               <View style={styles.content}>
                    {active === 0 && <Details data={lesson?.details} onPress={detailsActive} />}
                    {active === 1 && <Exercises data={lesson?.details} />}
                    {active === 2 && <Highlights data={lesson?.highlights}  />}
               </View>
               {active !== 2 && <View style={styles.start}>
                    <SolidbuttonWithIcon 
                        text='Start'
                        icon={<MaterialCommunityIcons name='arrow-right' size={16} color='#ffffff' />}
                        onPress={active === 0? _ => detailsActive(0) : exerciseActive}
                    />
                </View>}
            </View>
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.background} />
        </SafeAreaView>: <AppLoading />
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    sect: {
        flex: 1,
        height: '100%',
        paddingBottom: 10,
    },  
    tab: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tabBar: {
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'transparent',
        paddingHorizontal: 20,
    },
    tabBarLabel: {
       fontFamily: 'OpenSans_700Bold',
    },
    header: {
        paddingVertical: 20,
        alignItems: "center",
        flexDirection: "row",
    },
    lableView: {
        alignSelf: "center", 
        justifyContent: "center", 
        width: '100%', 
        position: "absolute"
    },
    headerText: {
        fontSize: 16,
        flex: 8,
        textAlign: "center"
    },
    topicView: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    }, 
    topic: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 30,
        marginBottom: 10,
        textAlign: "center",
    },
    exercise: {
        fontFamily: 'OpenSans_400Regular',
        fontSize: 16,
    },
    content: {
        paddingHorizontal: 20,
    },
    listItem: {
        padding: 10,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: "center",
        elevation: 5,
    },
    subHeader: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
    },
    numbering: {
        marginRight: 10,
        backgroundColor: '#c6c6c6',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    listContent: {
        flex: 9,
    },
    body: {
        fontFamily: 'OpenSans_400Regular',
    },
    numbers: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
    },
    start: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: 20,
    },
    innerView: {
        flexGrow: 1
    },
    highlightsItem: {
        padding: 15,
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        flexDirection: 'column',
        justifyContent: "space-around",
        alignItems: "flex-start",
        elevation: 5,
    },
    titleView: {
        width: '100%', 
        flexDirection: "row", 
        justifyContent: 'space-between',
        alignItems: "center",
    },
});

export function Details({data, onPress}){
    const {colors} = useTheme();
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{}}>
                {data?.map(({subHeader, body}, index) => (
                <TouchableOpacity 
                    activeOpacity={0.8} key={`${index}`}
                    onPress={_ => onPress(index)}
                >
                    <View style={[styles.listItem, {backgroundColor: colors.card}]}>
                        <View style={styles.numbering}>
                            <Text style={styles.numbers}>{'0'+(index+1)}</Text>
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.subHeader}>{subHeader}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.body} >
                                {body}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export function Exercises({data}){
    const {colors} = useTheme()
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{}}>
                {data?.map(({subHeader}, index) => (<TouchableOpacity activeOpacity={0.8} key={`${index}`}>
                    <View style={[styles.listItem, {backgroundColor: colors.card}]}>
                        <View style={styles.numbering}>
                            <Text style={styles.numbers}>{'0'+(index+1)}</Text>
                        </View>
                        <View style={styles.listContent}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.subHeader}>{subHeader}</Text>
                            <Text style={styles.body} >
                                5 Points
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export function Highlights({data}){
    const {colors} = useTheme()
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingBottom: 300}}>
                {data?.map(({section, paragraphs, color, time}, index) => (<TouchableOpacity activeOpacity={0.8} key={`${index}`}>
                    <View style={[styles.highlightsItem, {backgroundColor: colors.card}]}>
                        <View style={styles.titleView}>
                            <Text style={styles.subHeader}>{section}</Text>
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <Text style={styles.body}>{time}</Text>
                                <View style={{backgroundColor: colors[color], width: 15, height: 15}}></View>
                            </View>
                        </View>
                        <View style={{}}>
                            <Text style={styles.body}>{paragraphs[0]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}