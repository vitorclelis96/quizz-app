import * as React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Quizz from '../screens/Quizz';
import Results from '../screens/Results';

export type MainStackParamList = {
    Home: undefined,
    Quizz: undefined,
    Results: undefined,
}

const Stack = createNativeStackNavigator<MainStackParamList>();

type MainNavigationScreen = {
    children?: JSX.Element,
}

const defaultScreenOpts: NativeStackNavigationOptions = {
    headerShown: false,
}

export default function MainNavigation({ children }: MainNavigationScreen) {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={defaultScreenOpts} initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen
                    name="Quizz"
                    component={Quizz}
                />
                <Stack.Screen
                    name="Results"
                    component={Results}
                />
            </Stack.Navigator>
            {children && children}
        </NavigationContainer>
    )
}