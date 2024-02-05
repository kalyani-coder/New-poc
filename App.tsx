import { View, Text } from 'react-native';
import React from 'react';
import LoginScreen from './components/LoginScreen';
import CreateNewRequest from './components/CreateNewRequest';
import ClientDetails from './components/ClientDetails';
import Region from './components/Region';
import Validate from './components/Validate';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='createNewRequest'
          component={CreateNewRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='validate'
          component={Validate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='clientDetails'
          component={ClientDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='region'
          component={Region}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
