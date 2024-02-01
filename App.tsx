import { View, Text } from 'react-native'
import React from 'react'
import LoginScreen from './components/LoginScreen'
import CreateNewRequest from './components/CreateNewRequest'

const App = () => {
  return (
    <View>
      
      <LoginScreen/>
      <CreateNewRequest/>
    </View>
  )
}

export default App