import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {loadFonts} from '../../libs/fonts';
import { useSelector } from 'react-redux';


export const Subjects = ({}) => {
    const {subjects} = useSelector(state => state.subjects);
    const {navigate} = useNavigation();
    const {colors} = useTheme();

    const renderItems = ({item: {title, topics, id},index}) => (
        <TouchableOpacity onPress={_ => navigate('List', {title, id})} activeOpacity={.9}>
            <View
                style={[styles.card, {backgroundColor: colors.card}]}
            >
                <Text style={{fontFamily: 'Montserrat_700Bold', color: colors.secondary}}>{title}</Text>
                <Text style={{fontFamily: 'OpenSans_400Regular'}}>{topics?.length} Topics</Text>
            </View>
        </TouchableOpacity>
    );

    return(
        <View style={styles.container}>
            <FlatList 
                data={subjects}
                keyExtractor={item => item.id+item.title}
                renderItem={renderItems}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16,}} />}
                contentContainerStyle={{paddingHorizontal: 10, paddingVertical: 10}}
                ListEmptyComponent={<Text>This list is loading</Text>}
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
        paddingVertical: 10,
        elevation: 5,
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
    imageRect: {
        width: 100,
        height: 50,
        flex: 2,
        marginRight: 5,
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
    card: {
        padding: 10,
        width: wp(42.5),
        height: hp(10),
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 5,
    }
});

