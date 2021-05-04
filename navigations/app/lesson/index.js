import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import LessonScreen from '../../../screens/app/lesson';
import SubjectScreen from '../../../screens/app/lesson/subjects';
import ListScreen from '../../../screens/app/lesson/list';
import OverviewScreen from '../../../screens/app/lesson/overview';
import DetailScreen from '../../../screens/app/lesson/detail';
import ExercisesScreen  from '../../../screens/app/lesson/exercise';
import BookmarkScreen from '../../../screens/app/lesson/bookmark';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function LessonTabNavigator({navigation}){
    const {Navigator, Screen} = Tab;
    return (
        <Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let iconType;

                    if (route.name === 'Lessons'){
                        
                        iconType = <Ionicons name='ios-home' size={size} color={color} />
                    }else if (route.name === 'Subjects'){
                        iconName = 'subject';
                        iconType = <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                   
                    else if (route.name === 'Bookmarked'){
                        iconType = focused ? <Ionicons name="bookmarks" size={size} color={color} />:
                                                <Ionicons name='bookmarks-outline' size={size} color={color} />;
                    }

                    return iconType;
                }
            })}
        >
            <Screen 
                component={LessonNavigator}
                name="Lessons"
                options={{
                    tabBarLabel: "Home",
                }}
            />
            <Screen 
                component={SubjectNavigator}
                name="Subjects"
                options={{
                    tabBarLabel: "Subjects",
                }}
            />
            <Screen 
                component={BookmarkScreen}
                name="Bookmarked"
                options={{
                    tabBarLabel: "Bookmarks",
                }}
            />
        </Navigator>
    )
}

export function LessonNavigator({navigation}){
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

export function SubjectNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={SubjectScreen}
                name="Subjects"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}

export function OverviewNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={OverviewScreen}
                name="Overview"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}

export default function MainNavigator({navigation}){
    const {Navigator, Screen} = Stack;
    
    return (
        <Navigator>
            <Screen 
                component={LessonTabNavigator}
                name="lessons"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={ListScreen}
                name="List"
                options={{
                    title: 'Lessons',
                }}
            />
            <Screen 
                component={OverviewScreen}
                name="Overview"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={DetailScreen}
                name="Detail"
                options={{
                    title: "Lesson"
                }}
            />
            <Screen 
                component={ExercisesScreen}
                name="Exercise"
                options={{
                    title: "Exercise"
                }}
            />
        </Navigator>
    )
}
