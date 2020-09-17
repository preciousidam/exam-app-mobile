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
                name="Instruction"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={TestScreen}
                name="Test"
                options={{
                    title: 'Test'
                }}
            />
        </Navigator>
    )
}