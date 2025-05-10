import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Dashboard from '../screens/user/Dashboard';
import Network from '../screens/user/Network';
import MessageStack from './MessageStack';
import ProfileStack from './ProfileStack';
import HomeDashbordStack from './HomeDashbordStack';
import PostStack from './PostStack';

const Tab = createBottomTabNavigator();

const HomeTab = ({ route }: any) => {
  // Get the current route inside MessageStack
  const hiddenTabRoutes = ['ChatScreen', 'AccountScreen', 'ProfileSetupScreen', 'GeneralPreferenceScreen', 'NotificationManageScreen', 'DataPrivacyScreen',"ViewInternships","InternshipDetails","FilterInternships","ViewInternshipDetails","NewPost","PostDetails","ApplyForInternship" ,"Notification","SupportScreen","PreferencesScreen"];

  return (
    <Tab.Navigator
    screenOptions={({ route }) => {
      const routeName = getFocusedRouteNameFromRoute(route) ?? '';
      const isTabHidden = hiddenTabRoutes.includes(routeName);
  
      return {
        tabBarStyle: isTabHidden ? { display: 'none' } : undefined,
        headerShown: false,

      };
    }}
    >
      <Tab.Screen
        name="Dashboard"
        component={HomeDashbordStack}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Network"
        component={Network}
        options={{
          tabBarIcon: ({ color, size }) => <AntDesign name="chrome" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Post"
        component={PostStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="add-circle-outline" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Message"
        component={MessageStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="chatbubble-outline" size={size} color={color} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="account-circle" size={size} color={color} />,
      

        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
