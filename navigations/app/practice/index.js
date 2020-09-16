import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PracticeScreen from '../../../screens/app/practiceScreen';

const Stack = createStackNavigator();

export default function PracticeNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={PracticeScreen}
                name="practice"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}