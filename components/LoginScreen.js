import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React, { useState } from 'react';


const LoginScreen = () => {

  const [userId , setUserId ] = useState()
  const [password , setpassword ] = useState()


  return (
    <View style={tw`flex-1 justify-center items-center bg-gray-100`}>
      <View style={tw`p-4`}>
      <Text style={tw`text-3xl font-bold mb-4 self-center`}>Login</Text>


        <TextInput
          style={tw`border border-gray-300 p-2 w-90 mb-4 rounded-md text-black`}
          placeholder="User Id"
          placeholderTextColor="#000"
          onChange={(e)=>{
            setUserId(e.target.value)
          }}
        />
        <TextInput
          style={tw`border border-gray-300 p-2 w-90 mb-4 rounded-md text-black`}
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#000"
          onChange={(e)=>{
            setpassword(e.target.value)
          }}
        />
        <TouchableOpacity
          style={tw`p-2 w-90 mb-4 rounded-md bg-blue-300 self-center`}
          onPress={() => {
            // Handle login logic here
          }}>
          <Text style={tw`text-black text-center`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
