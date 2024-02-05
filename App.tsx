import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './components/LoginScreen'
import CreateNewRequest from './components/CreateNewRequest'
import ClientDetails from './components/ClientDetails'
import Region from './components/Region'
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
/>
<Stack.Screen name='createNewRequest' component={CreateNewRequest}/>

  
  </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App