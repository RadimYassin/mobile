import {  useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { RootStackParamList } from '../../types/RootStackParamList';
     type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Success'>;

export default function SuccessScreen() {
    const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Successfully</Text>
        <Text style={styles.subtitle}>Your password has been updated, you can now log in with your new password</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=500&auto=format&fit=crop' }}
          style={styles.illustration}
        />

          <TouchableOpacity onPress={()=>navigation.goBack} style={styles.continueButton}>
            <Text style={styles.continueButtonText}>CONTINUE</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.backButton}>
            <Text style={styles.backButtonText}>BACK TO LOGIN</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1D1B20',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  illustration: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  continueButton: {
    height: 48,
    backgroundColor: '#4B0082',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    height: 48,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '600',
  },
});