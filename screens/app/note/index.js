import React, { useEffect } from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import List from '../../../components/list';
import {FloatingActionButton} from '../../../components/button';
import FocusAwareStatusBar from '../../../components/StatusBar';
import { useTheme } from '@react-navigation/native';

export default function NoteScreen({navigation}){
    const notes = useSelector(state => state.notes);
    const {colors, dark} = useTheme()
    const onPress = val => navigation.navigate('Edit', {id: val})
    const left = _ => (<TouchableOpacity  
        style={{marginHorizontal: 20}} 
        activeOpacity={0.9}
        onPress={_ => navigation.navigate('Create')}
    >
            <View>
                <Ionicons name='ios-create' size={24} color={colors.text} />
            </View>
        </TouchableOpacity>
    )

    useEffect(() => {
        navigation.setOptions({
            headerRight: _ => left()
        })
    })

    return (
        <View style={{flex: 1}}>
            <List data={notes} onPress={onPress} />
            <FocusAwareStatusBar barStyle={dark? 'light-content': 'dark-content' } backgroundColor={colors.card} />
        </View>
    );
}