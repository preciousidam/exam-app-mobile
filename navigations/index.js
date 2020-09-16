import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';

import SplashScreen from '../screens/splashScreen';
import AuthFlow from './authentication';
import HomeNavigation from './app';
import {loadFonts} from '../libs/fonts';





const Stack = createStackNavigator();

export default function MainNavigation({state, dispatch}){
  
    const {Navigator, Screen} = Stack;
    const fontLoaded = loadFonts();
    

    return(
        fontLoaded ? <Navigator>
            {state.isLoading? (<Screen name='Splash' component={SplashScreen} options={{headerShown: false}} />): 
              state.userToken == null ? <Screen
                name="auth"
                component={AuthFlow}
                initialParams={{state, dispatch}}
                options={{
                  headerShown: false,
                }}
              />:
              <Screen
                name="app"
                component={HomeNavigation}
                initialParams={{state}}
                options={{
                  headerShown: false,
                }}
              />
            }
        </Navigator>: <AppLoading />
    )
      
}