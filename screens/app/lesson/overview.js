import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Text,} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';


import FocusAwareStatusBar from '../../../components/StatusBar';
import { loadFonts } from '../../../libs/fonts';
import { HeaderBackButton } from '@react-navigation/stack';
import { SolidbuttonWithIcon } from '../../../components/button';
import {Empty} from '../../../assets/empty';

const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];
const sections = ['Details', 'Exercises', 'Highlights']

export default function OverviewScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const fontLoaded = loadFonts();
    const {navigate} = navigation;
    const [active, setActive] = useState(0)
    const {width, height} = useSafeAreaInsets();
    const {topic, subject} = route.params;
    const lessons = useSelector(state => state.lessons.lessons?.filter(({topic: topicId}) => topic.id === topicId));

    const detailsActive = (id) => navigate('Detail', {id, lessons});
    const exerciseActive = _ => navigate('', {id});
    
    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: width, paddingTop: height}]}>
            
            <View style={styles.sect}>
               <View style={styles.header}>
                    <View style={styles.lableView}>
                        <Text 
                            style={[styles.headerText, {fontFamily: 'Montserrat_700Bold'}]}
                        >
                            {subject} Lesson
                        </Text>
                    </View>
                    <HeaderBackButton onPress={_ => navigation.goBack()} />
               </View>
               <View style={styles.topicView}>
                    <Text style={styles.topic}>{topic?.title}</Text>
                    <Text style={styles.exercise}>{topic?.exercises?.length || 0} Exercises</Text>
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
                    {active === 0 && <Details data={lessons} onPress={detailsActive} />}
                    {active === 1 && <Exercises data={[]} />}
                    {active === 2 && <Highlights data={[]}  />}
                    
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
        </SafeAreaView>
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
        paddingVertical: 10,
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
        flexGrow: 1,
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
    comSoon: {
        width: '100%',
        height: hp(60),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export function Details({data, onPress}){
    const {colors} = useTheme();
    if (data.length <= 0)
        return (<ComingSoon />);
        
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 300}}>
                {data?.map(({id, title, paragraphs}, index) => (
                <TouchableOpacity 
                    activeOpacity={0.8} key={`${index}`}
                    onPress={_ => onPress(id)}
                >
                    <View style={[styles.listItem, {backgroundColor: colors.card}]}>
                        <View style={styles.numbering}>
                            <Text style={styles.numbers}>{'0'+(index+1)}</Text>
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.subHeader}>{title}</Text>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.body} >
                                {paragraphs[0].body}
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
    const {colors} = useTheme();
    if (data.length <= 0)
        return (<ComingSoon />);

    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 300}}>
                {data?.map(({subHeader}, index) => (<TouchableOpacity 
                    activeOpacity={0.8} key={`${index}`}
                >
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
    const {colors} = useTheme();
    if (data.length <= 0)
        return (<ComingSoon />);
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 300}}>
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

export const ComingSoon = ({}) => {
    const {colors} = useTheme();

    return (
        <View style={styles.comSoon}>
            <SvgXml xml={Empty} width={wp(70)} height={hp(30)} />
            <Text style={styles.body}>Nothing to see here</Text>
        </View>
    )
}