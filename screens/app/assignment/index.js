import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';


import AssignmentList from '../../../components/assignments';
import FocusAwareStatusBar from '../../../components/StatusBar';

export default function AssignmentScreen({navigation}){
    const {assignments} = useSelector(state => state.assignments);
    const {colors, dark} = useTheme();
    return (
        <View style={{flex: 1, paddingHorizontal: 20}}>
            <AssignmentList data={assignments} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}