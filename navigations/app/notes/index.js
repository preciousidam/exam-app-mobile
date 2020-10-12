import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import NoteScreen from '../../../screens/app/note';
import CreateNoteScreen from '../../../screens/app/note/create';
import EditNoteScreen from '../../../screens/app/note/edit';

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
            <Screen 
                component={CreateNoteScreen}
                name="Create"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={EditNoteScreen}
                name="Edit"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}