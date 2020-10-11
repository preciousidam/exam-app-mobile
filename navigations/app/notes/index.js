import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NoteScreen from '../../../screens/app/note';

const Stack = createStackNavigator();

export default function NoteNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={NoteScreen}
                name="Notes"
                options={{
                    title: 'Notes',
                }}
            />
        </Navigator>
    )
}