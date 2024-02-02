import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
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
      


      
      setToken(data.ResponseMessage);

      const newtoken = JSON.stringify(data.ResponseMessage)
      await AsyncStorage.setItem('token' , newtoken)
      const asynctoken = await AsyncStorage.getItem('token')
      console.log("asynctoken " , asynctoken)
      
    } catch (error) {
      setError('An unexpected error occurred');
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };



  return (
    <ScrollView contentContainerStyle={tw`flex-grow bg-gray-100`}>
     
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-2xl font-bold mb-4`}>Welcome to CRN</Text>
        <Text style={tw`text-lg font-bold mb-4`}>Login to Your Account</Text>
        <View style={tw`p-4 w-4/5`}>
          <TextInput
            style={tw`border border-gray-300 p-2 mb-4 rounded-md text-black`}
            placeholder="User Id"
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
          <TouchableOpacity
            style={tw`p-2 mb-4 rounded-md bg-blue-300`}
            onPress={handleLogin}
            disabled={loading}>
              { loading ? 
              <View>
                     <ActivityIndicator style={{
        marginTop : 15
      }} animating={true} size="small" color="#000"/>
              </View> : 
               <Text style={tw`text-black text-center`}>Login</Text>

              }
           
          </TouchableOpacity>

          {error ? <Text style={tw`text-red-500 mb-4`}>{error}</Text> : null}
        </View>
   
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
