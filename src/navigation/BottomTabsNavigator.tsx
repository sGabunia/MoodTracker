import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import {AnalyticsIcon, HistoryIcon, HomeIcon} from '../components/Icons';
import {theme} from '../theme';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleStyle: {fontFamily: theme.fontFamilyBold},
      }}>
      <BottomTabs.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({size, color}) => <HomeIcon size={size} color={color} />,
        }}
      />
      <BottomTabs.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <HistoryIcon size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          tabBarIcon: ({size, color}) => (
            <AnalyticsIcon size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
