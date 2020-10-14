import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LessonScreen from '../../../screens/app/lesson';
import SubjectScreen from '../../../screens/app/lesson/subjects';
import ListScreen from '../../../screens/app/lesson/list';
import OverviewScreen from '../../../screens/app/lesson/overview';
import DetailScreen from '../../../screens/app/lesson/detail';

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
                        
                        iconType = <Ionicon name='ios-home' size={size} color={color} />
                    }else if (route.name === 'Subjects'){
                        iconName = 'md-bookmarks';
                        iconType = <Ionicon name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'History'){
                        iconName = 'history';
                        iconType = <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Profile'){
                        iconType = (<Avatar 
                            rounded 
                            size="small" 
                            icon={{name: 'person', type: 'ionicons', color: colors.secondary}} 
                            containerStyle={{backgroundColor: colors.primary, width: 25, height: 25}}
                        />);
                    }
                    else if (route.name === 'Favourite'){
                        iconType = focused ? <Ionicon name='ios-heart' size={size} color={color} />:
                                                <Ionicon name='ios-heart-empty' size={size} color={color} />;
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
                component={LessonNavigator}
                name="History"
                options={{
                    tabBarLabel: "History",
                }}
            />
            <Screen 
                component={LessonNavigator}
                name="Favourite"
                options={{
                    tabBarLabel: "Favourite",
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
        </Navigator>
    )
}
