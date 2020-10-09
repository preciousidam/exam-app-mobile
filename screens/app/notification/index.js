import React from 'react';
import {Text, View} from 'react-native';

export default function NotificationScreen({navigation}){
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color: 'white'}}>
                You have reached notification page
            </Text>
        </View>
    );
}