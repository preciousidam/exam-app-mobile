import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../../../screens/app/profile';

const Stack = createStackNavigator();

export default function ProfileNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={ProfileScreen}
                name="profile"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}