import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LessonScreen from '../../../screens/app/lesson';

const Stack = createStackNavigator();

export default function LessonNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={LessonScreen}
                name="Lessons"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}