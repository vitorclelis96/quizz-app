import * as React from 'react';
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Quizz from '../screens/Quizz';

export type MainStackParamList = {
    Home: undefined,
    Quizz: undefined,
}

const Stack = createNativeStackNavigator<MainStackParamList>();

type MainNavigationScreen = {
    children?: JSX.Element,
}

const defaultScreenOpts = {
    headerShown: false,
}

export default function MainNavigation({ children }: MainNavigationScreen) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={defaultScreenOpts}
                />
                <Stack.Screen
                    name="Quizz"
                    component={Quizz}
                    options={defaultScreenOpts}
                />
            </Stack.Navigator>
            {children && children}
        </NavigationContainer>
    )
}