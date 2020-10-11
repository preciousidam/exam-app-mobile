import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import { AppLoading } from 'expo';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function List({data, onPress}){

    const {colors} = useTheme();
    
    const renderItems = ({item, index}) => (
        <ListItem {...item} onPress={_ => onPress(index)} />
    );

    return(
        <View style={styles.container}>
            <FlatList
                key={1}
                data={data}
                keyExtractor={({title}, index) => title+index}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{ width: '100%', height: 1, backgroundColor: colors.seperator}} />}
            />
        </View>
    )
}

export function ListItem({body, time, read, title, onPress}){
    const {colors} = useTheme();
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={.7}>
            <View style={styles.item}>
                <View style={{flex: 9}}>
                    <Text style={{color: read? colors.highlight: colors.text}}>{title}</Text>
                    <Text 
                        ellipsizeMode='tail' 
                        numberOfLines={1} 
                        style={{color: read? colors.highlight: colors.text}}
                    >
                        {body}
                    </Text>
                </View>
                <Text 
                    style={{
                        paddingVertical: 2,
                        paddingHorizontal: 3,
                        flex: 1,
                        textAlign: "center",
                    }}
                >
                    {time}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
    },
    item: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
});