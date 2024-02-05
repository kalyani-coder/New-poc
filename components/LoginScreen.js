// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // This useEffect will run whenever the token state is updated
    console.log("token", token);
  }, [token]);

  const handleLogin = async () => {
    setLoading(true);

    const requestBody = {
      UserName: userId,
      Password: password,
      ParameterType: 1,
      MemberID: 0,
      mRequestAPI: null,
      TokenValues: null,
      RequestID: 0,
      mMemberAPI: null,
    };

    try {
      const response = await axios.post('http://crnmobileapp.com/api/CRN/CRNRequestAPI', requestBody);
      const data = JSON.parse(response.data);

      if (data.ErrorCode === '0') {
        setToken(data.ResponseMessage);

        const newToken = JSON.stringify(data.ResponseMessage);
        await AsyncStorage.setItem('token', newToken);
        const asyncToken = await AsyncStorage.getItem('token');
        console.log('asyncToken ', asyncToken);

        navigation.navigate('validate', { newToken });
      } else {
        setError(data.ResponseMessage || 'An unexpected error occurred');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={tw`flex-grow bg-gray-100`}>
    <View style={tw`flex-1s pl-5 pr-5`}>
      <Text style={tw`text-3xl font-bold mb-2`}>Welcome to CRN</Text>
      <Text style={tw`text-lg font-bold mb-4`}>Login to Your Account</Text>
      <View style={tw` w-full`}>
        <TextInput
          style={tw`border border-gray-300 p-2 mb-4 rounded-md text-black `}
          placeholder="Username"
          onChangeText={(text) => setUserId(text)}
          value={userId}
        />
        <TextInput
          style={tw`border border-gray-300 p-2 mb-4 rounded-md text-black`}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
<Text
style={tw`text-blue-800 py-5`}>
Forget Password?
</Text>

        

        {error ? <Text style={tw`text-red-500 mb-4`}>{error}</Text> : null}
      </View>

      
    </View>

    <TouchableOpacity
          style={tw`p-2 mb-4 rounded-md bg-blue-300`}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <View>
              <ActivityIndicator style={{ marginTop: 15 }} animating={true} size="small" color="#000" />
            </View>
          ) : (
            <Text style={tw`text-black text-center`}>Login</Text>
          )}
        </TouchableOpacity>
  </ScrollView>

  );
};

export default LoginScreen;
