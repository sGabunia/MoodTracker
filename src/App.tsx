import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabsNavigator from './navigation/BottomTabsNavigator';
import AppProvider from './AppProvider';

import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
