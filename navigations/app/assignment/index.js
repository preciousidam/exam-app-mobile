import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AssignmentScreen from '../../../screens/app/assignment';

const Stack = createStackNavigator();

export default function AssignmentNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={AssignmentScreen}
                name="Assignments"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}