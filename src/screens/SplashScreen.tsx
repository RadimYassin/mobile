import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/RootStackParamList';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.replace('Login');
  //   }, 2000); // 2 seconds splash screen timeout
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop' }}
          style={styles.illustration}
        />
        <Text style={styles.title}>
          Find Your{'\n'}
          <Text style={styles.highlight}>Dream Internship</Text>{'\n'}
          Today!
        </Text>
        <Text style={styles.subtitle}>
          Discover exciting internship opportunities{'\n'}that match your skills and career goals
        </Text>
        <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2463', // Deep blue background
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  illustration: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 32,
    borderRadius: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#FFFFFF', // White text
  },
  highlight: {
    color: '#3E92CC', // Light blue highlight
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#D8E1E9', // Light gray-blue text
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#3E92CC', // Light blue button
    paddingHorizontal: 32,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default SplashScreen;
