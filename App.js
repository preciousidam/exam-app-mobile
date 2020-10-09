import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import {ThemeProvider } from 'react-native-elements';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import {Provider} from 'react-redux';

import MainNavigator from './navigations';
import {dark, light} from './constants/colors';
import {colors} from './constants/custom-colors';
import {store} from './store';


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

  return (
    <Provider store={store}>
      <AppearanceProvider>
        <ThemeProvider useDark={scheme === 'dark'} theme={componentTheme}>
          <ActionSheetProvider>
            <NavigationContainer theme={rnTheme}>
                <MainNavigator />
            </NavigationContainer>
          </ActionSheetProvider>
        </ThemeProvider>
      </AppearanceProvider>
    </Provider>
  );
}
