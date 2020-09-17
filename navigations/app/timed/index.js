import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TimedScreen from '../../../screens/app/timedScreen';

const Stack = createStackNavigator();

export default function TimedNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={TimedScreen}
                name="Timed"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}