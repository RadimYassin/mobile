import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/RootStackParamList';
import ViewInternships from '../screens/Internship/ViewInternships';
import InternshipDetails from '../screens/Internship/InternshipDetails';
import FilterInternships from '../screens/Internship/FilterInternships';
import Dashboard from '../screens/user/Dashboard';
import ApplyForInternship from '../screens/Internship/ApplyForInternship';
import NotificationScreen from '../screens/user/Notification';


const Stack = createStackNavigator<RootStackParamList>();

const HomeDashbordStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home"  component={Dashboard} />
    <Stack.Screen
     name="ViewInternships" 
    options={{ headerShown: true ,presentation:"card",
      headerStyle: {
      shadowColor: 'transparent', // Hides the shadow border
      elevation: 0, // Removes shadow on Android
      },
    }}
    
    component={ViewInternships} />
    <Stack.Screen name="InternshipDetails" component={InternshipDetails} />
    <Stack.Screen name="FilterInternships" component={FilterInternships} />
    <Stack.Screen name="ApplyForInternship" component={ApplyForInternship as any} />
        <Stack.Screen name="Notification" component={NotificationScreen} />


    </Stack.Navigator>
  );
};

export default HomeDashbordStack;
