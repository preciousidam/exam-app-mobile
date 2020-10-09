import React from 'react';
import {Text, View} from 'react-native';

export default function NoteScreen({navigation}){
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: 'white'}}>
                You have reached Note page
            </Text>
        </View>
    );
}