import React, { useEffect } from 'react';
import {Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';


export default function ReadNotificationScreen({navigation, route}){
    const {id} = route.params;
    const {colors} = useTheme()
    const {body, time, title} = useSelector(state => state.notifications.find((item,index) => index===id));
    useEffect(() => {
        navigation.setOptions({
            title,
        })
    });
    console.log(body)
    return (
        <View style={{flex: 1, padding: 20}}>
            <View style={{backgroundColor: colors.card, padding: 20}}>
                <Text 
                    style={{
                        color: colors.text, 
                        textAlign: "justify", 
                        lineHeight: 30, 
                        fontFamily: 'OpenSans_400Regular'
                    }}
                >
                    {body}
                </Text>
            </View>
        </View>
    );
}