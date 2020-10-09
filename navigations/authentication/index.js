import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';


import SignIn from '../../screens/auth/signin';
import SignUp from '../../screens/auth/signup';
import Reset from '../../screens/auth/forgotPassword';
import VerifyPhone from '../../screens/auth/verifyPhone';
import { ScreenOne, ScreenTwo, ScreenThree } from '../../screens/auth/ info';




const Stack = createStackNavigator();

export default function AuthFlow(props){
    
    const {Screen, Navigator} = Stack;
    const {isSignOut} = useSelector( state => state.auth);


    return (
        <Navigator initialRouteName='Register'>  
            <Screen 
                component={SignIn}
                name="Login"
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={SignUp}
                name="Register"
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={Reset}
                name="Reset"
                options={{
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={VerifyPhone}
                name="Verify"
                options={{
                    title: 'Verify Number',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={ScreenOne}
                name="Profile"
                options={{
                    title: 'Create Profile',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={ScreenTwo}
                name="profile-cont"
                options={{
                    title: 'Location',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={ScreenThree}
                name="guardian"
                options={{
                    title: 'Guardian Details',
                    animationTypeForReplace: isSignOut ? 'pop' : 'push',
                }}
            />
        </Navigator>
    )
}