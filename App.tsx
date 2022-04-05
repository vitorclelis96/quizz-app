import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import MainNavigation from './navigation/MainNavigation';

// import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <MainNavigation>
      <StatusBar style="auto" />
    </MainNavigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
