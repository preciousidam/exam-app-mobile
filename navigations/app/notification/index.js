import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NotificationScreen from '../../../screens/app/notification';

const Stack = createStackNavigator();

export default function NoteNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={NotificationScreen}
                name="Notifications"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}