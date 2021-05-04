import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, StyleSheet, Image} from 'react-native';
import {Text, Avatar, withTheme} from 'react-native-elements';
import {useNavigation, useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';

import {CardSquare, CardRect, ComingSoon} from './index';
import { removeBookmark } from '../../store/reducers/subjects';
import { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

export const Bookmarks = ({}) => {
    const {bookmarked} = useSelector(state => state.subjects);
    const {colors} = useTheme();
    const {navigate} = useNavigation();
    const dispatch = useDispatch();

    const onPress = async item => {
        const viewed = await AsyncStorage.getItem('lesson_viewed');

        if(subscription_active || viewed < 3){
            navigate('Overview', {topic: item});
            return;
        }
        setShowModal(true);
    }

    const unbookmark = item => {
        dispatch(removeBookmark({topic: item}));
        showMessage({
            autoHide: true,
            message: "Un-bookmarked",
            description: "Topic has been removed from your bookmark",
            duration: 4000,
            type: 'info',
            hideStatusBar: true,
            icon: 'auto'
        })
    }

    
    const renderItems = ({item, index}) => (
        <CardRect
            {...item}
            fav={true}
            onPress={_ => onPress(item)}
            addBookmark={_ => unbookmark(item)}
        />
    );

    

    return(
        <View style={styles.container}>
            <FlatList
                key={1}
                data={bookmarked}
                keyExtractor={item => item.id+item.title}
                renderItem={renderItems}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={_ => <View style={{width: 16, height: 16}} />}
                contentContainerStyle={{paddingHorizontal: 10, paddingBottom: 120, paddingVertical: 15}}
                ListEmptyComponent={<ComingSoon />}
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
        elevation: 5,
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
        marginBottom: 20,
    },
    toggle: {
        padding: 10
    }
});