import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import { useSelector } from 'react-redux';


import List from '../../../components/list';
import FocusAwareStatusBar from '../../../components/StatusBar';

export default function NotificationScreen({navigation}){

    const notifications = useSelector(state => state.notifications);
    const onPress = val => navigation.navigate('ReadNotifications', {id: val})
    const {colors, dark} = useTheme();

    return (
        <View style={{flex: 1}}>
            <List data={notifications} onPress={onPress} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}