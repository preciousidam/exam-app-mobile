import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import PracticeNavigator from './practice';
import TimedNavigator from './timed';
import AssignmentNavigator from './assignment';
import ProfileNavigator from './profile';
import { Avatar } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import TestNavigator from './test';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export function HomeTabNavigation({navigation}){
    const {colors} = useTheme();
    const {Navigator, Screen} = Tab;

    return (
        <Navigator
            tabBarOptions={{
                style: {
                    height: 60,
                    paddingBottom: 10,
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
                component={HomeTabNavigation}
                name="home"
                options={{
                    headerShown: false,
                }}
            />
            <Screen 
                component={TestNavigator}
                name="test"
                options={{
                    headerShown: false,
                }}
            />
        </Navigator>
    )
}