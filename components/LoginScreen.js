import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import React, { useState } from 'react';

const LoginScreen = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    const data = {
      userId,
      password,
    };
    console.log(data);
  };

  return (
    <View style={tw`flex-1  bg-gray-100`}>
      <View style={tw`mt-10 pl-4`}>
        <Text style={tw`text-xl font-bold mb-4`}>Welcome to CRN</Text>
        <Text style={tw`text-xl font-bold mb-4`}>Login to Your Account</Text>
      </View>
      <View style={tw`p-4`}>
        <TextInput
          style={tw`border border-gray-300 p-2 w-80 mb-4 rounded-md text-black self-center`}
          placeholder="User Id"
          onChangeText={(text) => setUserId(text)}
          value={userId}
        />
        <TextInput
          style={tw`border border-gray-300 p-2 w-80 mb-4 rounded-md text-black self-center`}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity
          style={tw`p-2 w-80 mb-4 rounded-md bg-blue-300 self-center`}
          onPress={handleSubmit}>
          <Text style={tw`text-black text-center`}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
