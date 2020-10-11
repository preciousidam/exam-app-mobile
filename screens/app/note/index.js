import React from 'react';
import {Text, View} from 'react-native';
import { useSelector } from 'react-redux';

import List from '../../../components/list';

export default function NoteScreen({navigation}){
    const notifications = useSelector(state => state.notifications);
    const onPress = val => navigation.navigate('ReadNotifications', {id: val})

    return (
        <View style={{flex: 1}}>
            <List data={notifications} onPress={onPress} />
        </View>
    );
}