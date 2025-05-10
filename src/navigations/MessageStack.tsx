import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Message from '../screens/message/Message';
import ChatScreen from '../screens/message/ChatScreen';
import { RootStackParamList } from '../types/RootStackParamList';


const Stack = createStackNavigator<RootStackParamList>();

const MessageStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Messages" component={Message} />
      <Stack.Screen
      name="ChatScreen"
      options={{
        headerShown: true,
        headerStyle: {
        shadowColor: 'transparent', // Hides the shadow border
        elevation: 0, // Removes shadow on Android
        },
      }}
      component={ChatScreen}
      />
    
    </Stack.Navigator>
  );
};

export default MessageStack;
