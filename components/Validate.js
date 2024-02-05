// Validate.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Validate = ({ route }) => {
  const navigation = useNavigation()
  const { newToken } = route.params;
  console.log("validate token ", newToken);

  const justToken = JSON.parse(newToken);

  const [apiResponse, setApiResponse] = useState(null);

  const handleValidate = async () => {
    try {
      console.log("validate token : ", justToken);
      const apiEndpoint = 'http://crnmobileapp.com/api/CRN/CRNRequestAPI';
  
      const requestBody = {
        UserName: 'MobileAppMember',
        Password: 'password',
        ParameterType: 3,
        MemberID: 0,
        mRequestAPI: null,
        TokenValues: justToken,
        RequestID: 0,
        mMemberAPI: null,
      };
  
      console.log('Request Body:', requestBody);
  
      const response = await axios.post(apiEndpoint, requestBody);
      console.log('API Response:', response.data);
  
      setApiResponse(response.data);
  
      // Construct a formatted string representation of the API response
      const formattedResponse = ('API Response', JSON.stringify(response.data, null, 2));
  
      // Display the API response in an alert with "Next" and "Cancel" buttons
      Alert.alert(
        'API Response',
        formattedResponse,
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress : ()=>{
              navigation.navigate('Login')
            }
          },
          {
            text: 'Next',
            onPress: () => navigation.navigate('createNewRequest'),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error making API request:', error.message);
      // Handle any other errors that may occur during the API request
      // You may want to update the state or show an error message to the user
    }
  };
  
  return (
    <ScrollView contentContainerStyle={tw`flex-grow bg-gray-100`}>
      <View style={tw`flex-1 justify-center items-center`}>
        <Text style={tw`text-black font-bold my-4`}>validate candidate</Text>
        <TouchableOpacity
          style={tw`p-2 mb-4 rounded-md bg-blue-300 w-80`}
          onPress={handleValidate}
        >
          <Text style={tw`text-black text-center`}>Validate</Text>
        </TouchableOpacity>

       
      </View>
    </ScrollView>
  );
};

export default Validate;
