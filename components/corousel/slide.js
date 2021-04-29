import React, {useState, useEffect} from 'react';
import {View, Image, FlatList, StyleSheet, ImageBackground, Text } from 'react-native';
import {useTheme} from '@react-navigation/native';


export default function Slider({data}){
    
    const renderItems = ({item, index}) => (
        <Card key={index} image={item}/>
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={data}
                keyExtractor={(item,i) => `${JSON.stringify({i})}`}
                renderItem={renderItems}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{padding: 20}}
            />
        </View>
    )
}


function Card({image}){
    const {colors} = useTheme();
    
    return (
        <View style={styles.view}>
            <Image 
                source={{uri: image?.image}}
                resizeMode='cover'
                resizeMethod='scale'
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    view: {
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
        elevation: 10,
    },
    image: {
        flex: 1,
        width: 300,
        height: 220,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    }
});

