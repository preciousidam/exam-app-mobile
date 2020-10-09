import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';


import PracticeNavigator from './practice';
import TimedNavigator from './timed';
import AssignmentNavigator from './assignment';
import ProfileNavigator from './profile';
import { Avatar } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import TestNavigator from './exam';
import LessonNavigation from './lesson';
import AssignmentNavigation from './assignment';
import NoteNavigation from './notes';
import NotificationNavigation from './notification';
import DrawerCustom from '../../components/drawer';
import { WithBadge } from '../../components/badge';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export function PractiseTabNavigation({navigation}){
    const {colors} = useTheme();
    const {Navigator, Screen} = Tab;

    return (
        <Navigator
            tabBarOptions={{
                style: {
                    
                }
            }}
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    let iconType;

                    if (route.name === 'Timed'){
                        
                        iconType = focused ? <Ionicon name='ios-alarm' size={size} color={color} />:
                                                <MaterialCommunityIcons name='alarm' size={size} color={color} />;
                    }else if (route.name === 'Practice'){
                        iconName = 'playlist-check';
                        iconType = <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Assignment'){
                        iconName = 'assignment';
                        iconType = <MaterialIcons name={iconName} size={size} color={color} />;
                    }
                    else if (route.name === 'Profile'){
                        iconType = (<Avatar 
                            rounded 
                            size="small" 
                            icon={{name: 'person', type: 'ionicons', color: colors.secondary}} 
                             containerStyle={{backgroundColor: colors.primary, width: 25, height: 25}}
                        />);
                    }

                    return iconType;
                }
            })}
        >
            <Screen
                name="Practice"
                component={PracticeNavigator}
            />
            <Screen
                name="Timed"
                component={TimedNavigator}
            />
            <Screen
                name="Assignment"
                component={AssignmentNavigator}
                options={{
                    tabBarBadge: 4,
                }}
            />
            <Screen
                name="Profile"
                component={ProfileNavigator}
            />
        </Navigator>
    );
}



export default function HomeNavigation({navigation}){
    const {Navigator, Screen} = Stack;
    return (
        <Navigator>
            <Screen 
                component={HomeDrawernavigation}
                name="Home"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={TestNavigator}
                name="Test"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}

export function HomeDrawernavigation({navigation}){
    const {Navigator, Screen} = Drawer;
    const count = useSelector(state => state.notifications.filter(({read}) => read === false).length);

    return (
        <Navigator
            drawerContent={props => <DrawerCustom {...props} />}
        >
            <Screen 
                component={LessonNavigation}
                name="Lessons"
                options={{
                    drawerLabel: 'Lessons',
                    drawerIcon: ({color, size}) => <AntDesign name="book" color={color} size={size} />,
                }}
            />
            <Screen 
                component={PractiseTabNavigation}
                name="Practice"
                options={{
                    drawerLabel: 'Practice',
                    drawerIcon: ({color, size}) => <AntDesign name="edit" color={color} size={size} />,
                }}
            />
            <Screen 
                component={AssignmentNavigation}
                name="Assignments"
                options={{
                    drawerLabel: 'Assignments',
                    drawerIcon: ({color, size}) => <MaterialIcons name="assignment-turned-in" color={color} size={size} />,
                }}
            />
            <Screen 
                component={NoteNavigation}
                name="Notes"
                options={{
                    drawerLabel: 'Notes',
                    drawerIcon: ({color, size}) => <Ionicon name="md-document" color={color} size={size} />,
                }}
            />
            <Screen 
                component={ProfileNavigator}
                name="Profile"
                options={{
                    drawerLabel: 'Profile',
                    drawerIcon: ({color, size}) => <Ionicon name="ios-person" color={color} size={size} />,
                }}
            />
            <Screen 
                component={NotificationNavigation}
                name="Notifications"
                options={{
                    title: 'Notifications',
                    drawerIcon: ({color, size}) => <WithBadge icon={<Ionicon name="ios-notifications" color={color} size={size} />} count={count} />,
                }}
            />
        </Navigator>
    )
}