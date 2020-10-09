import React from 'react';
import {Text, View} from 'react-native';

export default function AssignmentScreen({navigation}){
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: 'white'}}>
                You have reached assignment page
            </Text>
        </View>
    );
}