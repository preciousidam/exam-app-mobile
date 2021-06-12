import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';


import FocusAwareStatusBar from '../../../components/StatusBar';
import Slider from '../../../components/corousel/slide';
import { FloatingActionButton } from '../../../components/button';
import CreateNoteModal from '../../../components/modal/note';

export default function DetailScreen({navigation, route}) {
    const {colors, dark} = useTheme();
    const {lID, lessons, topic} = route.params;
    const [id, setID] = useState(lID);
    const details = lessons?.find(({id: lessonId}) => id === lessonId);
    const [fav, setFav] = useState(false);
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        navigation.setOptions({
            title: details?.title,
            headerRight: _ => (<TouchableOpacity onPress={ _ => setFav(prev => addfav(!prev))}>
                    <View style={styles.fav}>
                        <Ionicon 
                            name="bookmarks"
                            size={22} 
                            color={colors.notification} 
                        />
                    </View>
                </TouchableOpacity>)
        });
    }, [id]);

    const getNext = _ => {
        const currentIndex = lessons?.findIndex(({id: lId}) => id === lId  );
        
        if (currentIndex == lessons.length - 1) return undefined;
        const next = lessons[currentIndex+1];
        
        return next;
    }

    const addfav = val => {
        setFav(val)
    }

    const getPrev = _ => {
        const currentIndex = lessons?.findIndex(({id: lId}) => id === lId  );
       
        if (currentIndex == 0) return undefined;
        const prev = lessons[currentIndex-1];
        
        return prev;
    }

    const onPress = current => setID(current);

    return (
        <View style={{flex: 1, height: '100%', backgroundColor: dark? colors.background: colors.card}}>
            <ScrollView>
                <View>
                    <Image 
                        source={{uri: details?.feature_image}}
                        style={styles.image}
                        resizeMode='cover'
                        resizeMethod='scale'
                    />
                    <View style={styles.body}>
                        <Text 
                            style={[styles.subHeader, {fontFamily: 'Montserrat_700Bold'}]}
                        >
                            {details?.title}
                        </Text>
                        {details?.paragraphs?.map(({id, heading, body, images}, i) => (
                            <View key={id}>
                                <View  style={styles.paragraphs}>
                                    <Text 
                                        style={[styles.subtitle, {color: colors.text, fontFamily: 'Montserrat_700Bold'}]}
                                    >
                                        {heading}
                                    </Text>
                                    <Text 
                                        style={[styles.sectBody, {color: colors.text, fontFamily: 'OpenSans_400Regular'}]}
                                    >
                                        {body}
                                    </Text>
                                
                                </View>
                                
                                <Slider data={images} />
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
                <BottomNav  prev={getPrev()} next={getNext()} onPress={onPress} />
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
            <CreateNoteModal show={showModal} close={_ => setShowModal(false)} topic={topic} />
        </View>
    )
}

export function BottomNav({onPress, prev, next}){
    const {colors} = useTheme()
   
    return(
        <View style={styles.bottomNav}>
            <TouchableOpacity onPress={_ => onPress(prev?.id)} style={{width: '48%', alignItems: "flex-start"}}>
                {prev && <View style={styles.navView}>
                    <View style={[styles.pointer, {backgroundColor: colors.secondary}]}>
                        <MaterialCommunityIcons name='arrow-left' size={16} color='#ffffff' />
                    </View>
                    <Text 
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={[styles.label, {fontFamily: 'Montserrat_700Bold', color: colors.text}]}
                    >
                        {prev?.title}
                    </Text>
                </View>}
            </TouchableOpacity>
            <View style={{width: 1, height: '100%', backgroundColor: '#d8d8d8'}}>

            </View>
            <TouchableOpacity onPress={_ => onPress(next.id)} style={{width: '48%', alignItems: "flex-end"}}>
                {next && <View style={styles.navView}>
                    <Text 
                        numberOfLines={2}
                        ellipsizeMode='tail'
                        style={[styles.label, {fontFamily: 'Montserrat_700Bold', color: colors.text}]}
                    >
                        {next?.title}
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
        minWidth: '100%',
        minHeight: 50,
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