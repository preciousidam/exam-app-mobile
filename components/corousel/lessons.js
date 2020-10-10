import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import { AppLoading } from 'expo';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {loadFonts} from '../../libs/fonts';


function Corousel({data}){
    const [active, setActive] = useState(0);
    
    const renderItems = ({item, index}) => (
        <Card 
            {...item}
            onPress={_ => setActive(index)}
        />
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: 20}}
            />
        </View>
    )
}

export default withTheme(Corousel);

function Card({topic, clipart, noExercise,  onPress}){

    const fontLoaded = loadFonts();
    const {colors} = useTheme();
    const [fav, setFav] = useState(false);
    
    return (
        fontLoaded ? <TouchableOpacity onPress={onPress} activeOpacity={0.8} >
            <View style={{...styles.card, backgroundColor: colors.card}}>
                <Image source={clipart} style={styles.image} resizeMethod='resize' resizeMode='contain' />
                <View style={styles.wrap}>
                    <Text numberOfLines={1} tail style={styles.text}>{topic}</Text>
                    <View style={styles.favCont}>
                        <View>
                            <Text>{noExercise} Exercises</Text>
                        </View>
                        <TouchableOpacity onPress={e => setFav(!fav)}>
                            <View style={[styles.fav,{backgroundColor: fav? colors.notification: "transparent"}]}>
                                <Ionicons 
                                    name="ios-heart" 
                                    size={16} 
                                    color={fav? colors.card: colors.highlight} 
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>: <AppLoading />
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    card: {
        borderRadius: 10,
        width: 160,
        paddingTop: 10,
    },
    h4: {
        fontFamily: 'OpenSans_700Bold',
        fontSize: 20,
    },
    text: {
        fontFamily: 'Montserrat_700Bold',
        fontSize: 14,
    },
    wrap: {
        padding: 15,
    },
    image: {
        width: 160,
        height: 100,
    },
    fav: {
        width: 40,
        height: 40,
        padding: 5,
        borderColor: '#e8e8e8',
        borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    favCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    }
});

