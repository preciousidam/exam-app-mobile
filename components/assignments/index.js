import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, SectionList} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import { AppLoading } from 'expo';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {CardSquare, CardRect} from '../lesson';

export default function List({data}){
    console.log
   
    const {colors} = useTheme();
    
    const renderItems = ({item, index}) => (
        <CardRect
            {...item}
            onPress={_ => setActive(index)}
        />
    );

    const renderHeader = ({section: {title}}) => {
        console.log(title)
    return (<View style={styles.header} >
        <Text style={styles.h4}>{title}</Text>
    </View>)};

    return(
        <View style={styles.container}>
           <SectionList
                key={1}
                sections={data}
                keyExtractor={(item,index) => item+index}
                renderItem={renderItems}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                SectionSeparatorComponent={_ => <View style={{width: 16, height: 10}} />}
                renderSectionHeader={renderHeader}
            />
        </View>
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
        fontFamily: 'Montserrat_700Bold',
        fontSize: 16,
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
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginVertical: 10,
    },
    toggle: {
        padding: 10
    }
});