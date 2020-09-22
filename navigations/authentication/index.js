import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SignIn from '../../screens/auth/signin';
import SignUp from '../../screens/auth/signup';
import Reset from '../../screens/auth/forgotPassword';
import VerifyPhone from '../../screens/auth/verifyPhone';



const Stack = createStackNavigator();

export default function AuthFlow({route}){
    
    const {Screen, Navigator} = Stack;
    const {state, dispatch} = route.params;

    return (
        <Navigator initialRouteName='Register'>  
            <Screen 
                component={SignIn}
                name="Login"
                initialParams={{ signIn: dispatch }}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={SignUp}
                name="Register"
                initialParams={{ signIn: dispatch }}
                options={{
                    headerShown: false,
                    // When logging out, a pop animation feels intuitive
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={Reset}
                name="Reset"
                initialParams={{ signIn: dispatch }}
                options={{
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
            <Screen 
                component={VerifyPhone}
                name="Verify"
                initialParams={{ signIn: dispatch }}
                options={{
                    
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                }}
            />
        </Navigator>
    )
}