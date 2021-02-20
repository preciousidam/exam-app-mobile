import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import SplashScreen from '../screens/splashScreen';
import AuthFlow, {ProfileFlow} from './authentication';
import HomeNavigation from './app';
import {loadFonts} from '../libs/fonts';
import Agree from '../screens/agreement';
import VerifyPhone from '../screens/auth/verifyPhone';


const Stack = createStackNavigator();

export function MainNavigation(props){
  
    const {Navigator, Screen} = Stack;
    const fontLoaded = loadFonts();
    const {isRestoring, user} = useSelector(state => state.auth);
    const {terms} = useSelector(state => state.app);

	useEffect(() => {
		console.log(user)
	},[user])
    
    return(
		fontLoaded && <Navigator>
			{ isRestoring && <Screen name='Splash' component={SplashScreen} options={{headerShown: false}} /> }
			{ terms === null && <Screen name='Privacy' component={Agree} options={{headerShown: false}} /> }
			{ user === null && <Screen name="auth" component={AuthFlow} options={{ headerShown: false}} /> }
      		{ user && user.verified === false && <Screen name="verify" component={VerifyPhone} options={{ headerShown: false}} /> }
			{ user && user.profile === null && <Screen name="profile" component={ProfileFlow} options={{ headerShown: false}} /> }
			{ user !== null && <Screen name="app" component={HomeNavigation} options={{ headerShown: false }}/> }
		</Navigator>
    )
      
}

export default MainNavigation;