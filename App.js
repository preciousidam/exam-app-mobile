import 'react-native-gesture-handler';
import React, {createContext, useReducer} from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {ThemeProvider } from 'react-native-elements';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';

import MainNavigator from './navigations';
import {dark, light} from './constants/colors';
import {colors} from './constants/custom-colors';


const AuthContext = createContext();

export default function App() {
  const scheme = useColorScheme();

  
  
  const rnDefalt = scheme === 'dark' ? DarkTheme: DefaultTheme ;
  const theme = scheme === 'dark' ? dark: light;
  const rnTheme = {
      ...rnDefalt,
      colors: {
        ...rnDefalt.colors,
        ...theme,
        ...colors,
      }
  }

  const componentTheme = {
      Text: {
        style: {
          color: theme.text,
        },
        h4Style: {
          fontSize: 20,
        }
      },
      Button: {
        buttonStyle: {
          backgroundColor: theme.secondary,
          borderRadius: 30,
          paddingVertical: 10,
        }
      },
      colors: {
        ...theme,
      }
  }

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `AsyncStorage`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <AppearanceProvider>
        <ThemeProvider useDark={scheme === 'dark'} theme={componentTheme}>
          <ActionSheetProvider>
            <NavigationContainer theme={rnTheme}>
                <MainNavigator state={state} dispatch={dispatch} />
            </NavigationContainer>
          </ActionSheetProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </AuthContext.Provider>
  );
}
