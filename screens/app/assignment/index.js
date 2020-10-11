import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';


import AssignmentList from '../../../components/assignments';

export default function AssignmentScreen({navigation}){
    const {assignments} = useSelector(state => state.assignments);
    return (
        <View style={{flex: 1, paddingHorizontal: 20}}>
            <AssignmentList data={assignments} />
        </View>
    );
}