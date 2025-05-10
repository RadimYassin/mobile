import React from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'; 
import Ionicons from 'react-native-vector-icons/Ionicons';  

const Header = () => (
  <View style={styles.header}>
    <View style={styles.greetingContainer}>
      <Text style={styles.greeting}>Good Morning</Text>
      <Text style={styles.name}>John Aseed</Text>
    </View>
    
    <TouchableOpacity style={styles.notificationButton}>
      <Ionicons name="notifications-outline" size={24} color="#666" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      ios: {
        // iOS specific styles, if needed
      },
      android: {
        // Android specific styles, if needed
      }
    }),
  },
  greetingContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  greeting: {
    fontSize: 14,
    color: '#666',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  notificationButton: {
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, // you can adjust this width based on design preference
    height: 50,
  },
});

export default Header;
