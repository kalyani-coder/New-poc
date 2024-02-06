// Validate.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Validate = ({ route }) => {
  const navigation = useNavigation()
  const { newToken , NewRequest} = route.params;
  console.log("validate token ", newToken);
  console.log('requestbody' , NewRequest)



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
      const data = response.data 

      const apiResponse = JSON.parse(data);
      

  
      setApiResponse(response.data);
  
      // Construct a formatted string representation of the API response
      const formattedResponse = (
        'API Response',
        `Member ID: ${apiResponse.Member_ID}\nMember Name: ${apiResponse.Member_Name}\nMember Status ID: ${apiResponse.Member_Status_ID}\nMember Type ID: ${apiResponse.Member_Type_ID}\nMember Email: ${apiResponse.Member_Email}\nIs Admin: ${apiResponse.Member_IsAdmin}\nOrganization Name: ${apiResponse.Member_Orgnization_Name}\nErrorCode: ${apiResponse.ErrorCode}\nResponse Message: ${apiResponse.ResponseMessage}`
      );
  
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
            onPress: async () => {
              try {
                const response = await axios.post('http://crnmobileapp.com/api/CRN/CRNRequestAPI', NewRequest);
                const data = JSON.parse(response.data);
                console.log(response.data)
          
                if (data.ErrorCode === '0') {
                  console.log(data.ResponseMessage);

          
                  const newToken = JSON.stringify(data.ResponseMessage);
                  
                
          
                  navigation.navigate('createNewRequest', { newToken  , NewRequest});
                } else {
                  console.log(data.ResponseMessage || 'An unexpected error occurred');
                }
              } catch (error) {
                setError('An unexpected error occurred');
                console.error('Error:', error.message);
              }
              

              
              
              
             },
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
