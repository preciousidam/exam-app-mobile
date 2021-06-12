import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Text,} from 'react-native-elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SafeAreaView, useSafeAreaInsets, EdgeInsets} from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import styled from '@emotion/native';


import FocusAwareStatusBar from '../../../components/StatusBar';
import { loadFonts } from '../../../libs/fonts';
import { HeaderBackButton } from '@react-navigation/stack';
import { SolidbuttonWithIcon } from '../../../components/button';
import {Empty} from '../../../assets/empty';
import { Modal } from 'react-native';
import { updateViewed } from '../../../store/reducers/subjects';
import extraColors from '../../../constants/custom-colors';
import { Highlights as HighL, ISelected } from './interfaces';

const colorBack = ['color-primary', 'color-success', 'color-info', 'color-warning', 'color-danger', ];
const sections = ['Details', 'Exercises', 'Highlights']

const ClassLabel = styled.Text({
    paddingHorizontal: 15,
    fontSize: 11,
    borderRadius: 5,
    position: 'absolute',
    right: 10,
    fontFamily: 'OpenSans_700Bold',
    color: '#fff',
});

export default function OverviewScreen({navigation, route}){
    const {colors, dark} = useTheme();
    const {navigate} = navigation;
    const [active, setActive] = useState<number>(0)
    const insets:EdgeInsets = useSafeAreaInsets();
    const {topic} = route.params;
    const dispatch = useDispatch();
   

    const detailsActive = async (id?:number) => {
        dispatch(updateViewed({id: topic?.id}));
        navigate('Detail', {lID: id||topic?.lessons[0]?.id, lessons: topic?.lessons, topic: topic?.id});
    }
    const exerciseActive = () => {
        navigate('Exercise', {exercises: topic?.exercises });
    }
    
    return (
        <SafeAreaView style={[styles.container, {paddingHorizontal: insets.left, paddingTop: insets.top}]}>
            
            <View style={styles.sect}>
               <View style={styles.header}>
                    <View style={styles.lableView}>
                        <Text 
                            style={[styles.headerText, {fontFamily: 'Montserrat_700Bold'}]}
                        >
                            {topic?.subject_title} Lesson
                        </Text>
                    </View>
                    <HeaderBackButton onPress={() => navigation.goBack()} />
               </View>
               <View style={styles.topicView}>
                    <Text style={styles.topic}>{topic?.title}</Text>
                    <Text style={styles.exercise}>{topic?.exercises?.length} Exercises</Text>
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
                    {active === 0 && <Details data={topic?.lessons} onPress={detailsActive} />}
                    {active === 1 && <Exercises data={topic?.exercises}  />}
                    {active === 2 && <Highlights data={topic?.adminnote_notes}  />}
                    
               </View>
               {active === 0 && topic?.lessons?.length > 0 && <View style={styles.start}>
                    <SolidbuttonWithIcon 
                        text='Start Lessons'
                        icon={<MaterialCommunityIcons name='arrow-right' size={16} color='#ffffff' />}
                        onPress={() => detailsActive()}
                    />
                </View>}
                {active === 1 && topic?.exercises?.length > 0 && <View style={styles.start}>
                    <SolidbuttonWithIcon 
                        text='Start Exercises'
                        icon={<MaterialCommunityIcons name='arrow-right' size={16} color='#ffffff' />}
                        onPress={exerciseActive}
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
    }
});

export function Details({data, onPress}){
   
    const {colors} = useTheme();
    
    if (data.length <= 0)
        return (<ComingSoon />);

    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 300}}>
                {data?.map(({id, title, paragraphs, class_name}, index) => (
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
                            <ClassLabel style={{backgroundColor: extraColors.secondary}}>
                                {class_name}
                            </ClassLabel>
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
                {data?.map(({question, score}, index) => (<TouchableOpacity 
                    activeOpacity={1} key={`${index}`}
                >
                    <View style={[styles.listItem, {backgroundColor: colors.card}]}>
                        <View style={styles.numbering}>
                            <Text style={styles.numbers}>{'0'+(index+1)}</Text>
                        </View>
                        <View style={styles.listContent}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.subHeader}>{question}</Text>
                            <Text style={styles.body} >
                                {score} Points
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}


export function Highlights({data}: HighL){
    const {colors} = useTheme();
    const [selected, setSelected] = useState<ISelected>();
    const [show, setShow] = useState(false);

    const onPress = text => {
        setSelected(text);
        setShow(true);
    }

    if (data.length <= 0)
        return (<ComingSoon />);
    return(
        <View style={styles.innerView}>
            <ScrollView contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 300}}>
                {data?.map(({title, body}, index) => (<TouchableOpacity activeOpacity={0.8} key={`${index}`} onPress={_ => onPress({body, title})}>
                    <View style={[styles.highlightsItem, {backgroundColor: colors.card}]}>
                        <View style={styles.titleView}>
                            <Text style={styles.subHeader}>{title}</Text>
                            <View style={{alignItems: "center", justifyContent: "center"}}>
                                <View style={{backgroundColor: extraColors.info, width: 15, height: 15}}></View>
                            </View>
                        </View>
                        <View style={{}}>
                            <Text style={styles.body}>{body}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                ))}
            </ScrollView>
            <Modal
                visible={show}
                onRequestClose={() => setShow(false)}
                transparent={false}
                presentationStyle="overFullScreen"
            >
                <View >
                    <View style={styles.noteHead}>
                        <Text style={styles.noteTitle}>{selected.title}</Text>
                        <Text onPress={_ => setShow(false)}>
                            <Ionicons name="ios-close" size={24} color="#a3a3a3" />
                        </Text>
                    </View>
                    <Text style={{padding: 15}}>{selected.body}</Text>
                </View>
            </Modal>
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