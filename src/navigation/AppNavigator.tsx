import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import CaptureScreen from '../screens/capture/CaptureScreen';
import ConfirmScreen from '../screens/confirm/ConfirmScreen';
import SearchScreen from '../screens/search/SearchScreen';
import ARNavigationScreen from '../screens/ar/ARNavigationScreen';
import BookmarksScreen from '../screens/bookmarks/BookmarksScreen';
import InformationPage from '../screens/info/informationPage';

import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Capture" component={CaptureScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ARNavigation" component={ARNavigationScreen} />
        <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
        <Stack.Screen name="Info" component={InformationPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;