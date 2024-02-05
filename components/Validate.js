import { View, Text } from 'react-native'
import React from 'react'

const Validate = ({route}) => {
    const { newtoken } = route.params;
    console.log("validate token " , newtoken)
    
  return (
    <View>
      <Text>Validate</Text>
    </View>
  )
}

export default Validate