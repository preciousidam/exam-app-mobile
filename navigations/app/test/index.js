import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import InstructionScreen from '../../../screens/app/test';
import TestScreen from '../../../screens/app/test/test';

const Stack = createStackNavigator();

export default function TestNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={InstructionScreen}
                name="instruction"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={TestScreen}
                name="test"
                options={{
                    title: 'Test'
                }}
            />
        </Navigator>
    )
}