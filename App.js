import React from 'react';

// imports components needed for react navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// imports screen components
import { Start } from './components/Start';
import Chat from './components/Chat';

// creates navigation stack
const Stack = createStackNavigator();

// renders default component
export default function App() {
  return (
    // navigation stack to switch between screen components
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
          component={Chat}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
