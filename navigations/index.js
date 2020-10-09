import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { useSelector } from 'react-redux';

import SplashScreen from '../screens/splashScreen';
import AuthFlow from './authentication';
import HomeNavigation from './app';
import {loadFonts} from '../libs/fonts';


const Stack = createStackNavigator();

export function MainNavigation(props){
  
    const {Navigator, Screen} = Stack;
    const fontLoaded = loadFonts();
    const {isLoading, user} = useSelector(state => state.auth);
    
    return(
        fontLoaded ? <Navigator>
            {isLoading? (<Screen name='Splash' component={SplashScreen} options={{headerShown: false}} />): 
              user == null ? <Screen
                name="auth"
                component={AuthFlow}
                options={{
                  headerShown: false,
                }}
              />:
              <Screen
                name="app"
                component={HomeNavigation}
                options={{
                  headerShown: false,
                }}
              />
            }
        </Navigator>: <AppLoading />
    )
      
}

export default MainNavigation;