import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from '../tabNavigator/TabNavigator';
import MovieDetails from '../../screens/MovieDetails/MovieDetails';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      headerMode={'none'}
      initialRouteName={'TabNavigator'}
      mode={'modal'}>
      <Stack.Screen
        name={'TabNavigator'}
        component={TabNavigator}
        options={{gestureEnabled: false}}
      />
      <Stack.Screen
        name={'MovieDetails'}
        component={MovieDetails}
        options={{gestureEnabled: false}}
      />

    </Stack.Navigator>
  );
}
