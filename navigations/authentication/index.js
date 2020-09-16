import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useTheme } from '@react-navigation/native';

import SignIn from '../../screens/auth/signin';
import SignUp from '../../screens/auth/signup';



const Stack = createStackNavigator();

export default function AuthFlow({route}){
    
    const {Screen, Navigator} = Stack;
    const {state, dispatch} = route.params;

    

    
    
    return (
        <Navigator>  
            <Screen 
                component={SignIn}
                name="signIn"
                initialParams={{ signIn: dispatch }}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={SignUp}
                name="signUp"
                initialParams={{ signIn: dispatch }}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
        </Navigator>
    )
}