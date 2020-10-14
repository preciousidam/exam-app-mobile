import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';


import FocusAwareStatusBar from '../../../components/StatusBar';
import { paragraphs } from '../../../constants/data';
import Slider from '../../../components/corousel/slide';
import { FloatingActionButton } from '../../../components/button';
import CreateNoteModal from '../../../components/modal/note';

export default function DetailScreen({navigation, route}) {
    const {colors, dark} = useTheme();
    const {id, startFrom} = route.params;
    const {details} = useSelector(state => state.lessons.find(({id: lessonId}) => id === lessonId));
    const [start, setStart] = useState(startFrom);
    const [section, setSection] = useState({});
    const [fav, setFav] = useState(false);
    const [showModal, setShowModal] = useState(false);


    useEffect(() =>{
        setSection(details[start]);
    }, [section,start]);

    useEffect(() => {
        navigation.setOptions({
            title: section.subHeader,
            headerRight: _ => (<TouchableOpacity onPress={ _ => setFav(prev => addfav(!prev))}>
                    <View style={styles.fav}>
                        {fav === true ? <Ionicon 
                            name='ios-heart' 
                            size={30} 
                            color={colors.notification} 
                        />:
                        <Ionicon 
                            name='ios-heart-empty'
                            size={30} 
                            color={colors.notification} 
                        />}
                    </View>
                </TouchableOpacity>)
        });
    }, [start, section]);

    const getNext = _ => {
        const next = details[start+1] || {};
        return {index: start+1, text: next?.subHeader};
    }

    const addfav = val => {
        console.log(val);
        setFav(val)
    }

    const getPrev = _ => {
        const prev = details[start-1] || {};
        return {index: start-1, text: prev?.subHeader};
    }

    const onPress = inc => {
        if (inc === 'next') setStart(prev => prev + 1);
        else if(inc === 'prev') setStart(prev => prev -1);
    }

    return (
        <View style={{flex: 1, height: '100%', backgroundColor: dark? colors.background: colors.card}}>
            <ScrollView>
                <View>
                    <Image 
                        source={require('../../../assets/hero/plant3.jpg')}
                        style={styles.image}
                        resizeMode='cover'
                        resizeMethod='scale'
                    />
                    <View style={styles.body}>
                        <Text 
                            style={[styles.subHeader, {fontFamily: 'Montserrat_700Bold'}]}
                        >
                            {section.subHeader}
                        </Text>
                        {paragraphs.map(({id, header, body}, i) => (
                            <View key={i}>
                                <View  style={styles.paragraphs}>
                                    <Text 
                                        style={[styles.subtitle, {color: colors.text, fontFamily: 'Montserrat_700Bold'}]}
                                    >
                                        {header}
                                    </Text>
                                    <Text 
                                        style={[styles.sectBody, {color: colors.text, fontFamily: 'OpenSans_400Regular'}]}
                                    >
                                        {body}
                                    </Text>
                                
                                </View>
                                <Slider data={[require('../../../assets/hero/plant.webp'), require('../../../assets/hero/plant2.jpeg'), require('../../../assets/hero/plant3.jpg'),]} />
                            </View>
                        ))}
                        <Text 
                            style={{color: colors.highlights, textAlign: "center", backgroundColor: colors. highlights}}
                        >
                            Brought to you by Todd Gabriels
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={[{backgroundColor: colors.card}, styles.bottomBar]}>
                <BottomNav last={details.length - 1} prev={getPrev()} next={getNext()} onPress={onPress} />
            </View>
            <FocusAwareStatusBar 
                barStyle={dark? 'light-content': 'dark-content' } 
                backgroundColor={colors.card} 
            />
            <FloatingActionButton 
                icon={<Ionicon name='ios-create' 
                size={24} color='#ffffff' 
                />}
                onPress={_ => setShowModal(true)}
                style={{bottom: 80}}
            />
            <CreateNoteModal show={showModal} close={_ => setShowModal(false)} />
        </View>
    )
}

export function BottomNav({onPress, prev, next, last}){
    const {colors} = useTheme()
    
    return(
        <View style={styles.bottomNav}>
            <TouchableOpacity onPress={_ => onPress('prev')} style={{width: '48%', alignItems: "flex-start"}}>
                {prev?.index >= 0 && <View style={styles.navView}>
                    <View style={[styles.pointer, {backgroundColor: colors.secondary}]}>
                        <MaterialCommunityIcons name='arrow-left' size={16} color='#ffffff' />
                    </View>
                    <Text 
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={[styles.label, {fontFamily: 'Montserrat_700Bold', color: colors.text}]}
                    >
                        {prev?.text}
                    </Text>
                </View>}
            </TouchableOpacity>
            <View style={{width: 1, height: '100%', backgroundColor: '#d8d8d8'}}>

            </View>
            <TouchableOpacity onPress={_ => onPress('next')} style={{width: '48%', alignItems: "flex-end"}}>
                {next?.index <= last && <View style={styles.navView}>
                    <Text 
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={[styles.label, {fontFamily: 'Montserrat_700Bold', color: colors.text}]}
                    >
                        {next?.text}
                    </Text>
                    <View style={[styles.pointer, {backgroundColor: colors.secondary}]}>
                        <MaterialCommunityIcons name='arrow-right' size={16} color='#ffffff' />
                    </View>
                </View>}
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    webview: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    bottomBar: {
        padding: 10,
        position: "absolute",
        bottom: 0,
        elevation: 20,
        shadowColor: '#000000'
    },
    bottomNav: {
        width: '100%',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    pointer: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'transparent',
        flex: 1.2,
    },
    navView: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    label: {
        marginHorizontal: 10,
        flex: 8.8,
    },
    image: {
        height: 220,
        width: '100%',
    },
    body: {
        paddingBottom: 100,
    },
    subHeader: {
        fontSize: 24,
        margin: 20,
        marginBottom: 15
    },
    paragraphs: {
        marginVertical: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    sectBody: {
        textAlign: "justify",
        fontSize: 16,
    },
    fav: {
        marginHorizontal: 20,
    }
});