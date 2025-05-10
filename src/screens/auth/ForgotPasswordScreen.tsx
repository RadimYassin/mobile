
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';
type ForgotPasswordScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export default function ForgotPasswordScreen() {
   const navigation = useNavigation<ForgotPasswordScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>To reset your password, you will need to enter your email address and we'll send you instructions</Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=500&auto=format&fit=crop' }}
          style={styles.illustration}
        />

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="yourname@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

            <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>RESET PASSWORD</Text>
            </TouchableOpacity>
          

       
            <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.backButton}>
              <Text style={styles.backButtonText}>BACK TO LOGIN</Text>
            </TouchableOpacity>
        </View>
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
  form: {
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1B20',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  resetButton: {
    height: 48,
    backgroundColor: '##f0f9ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    height: 48,
    backgroundColor: '#F3E5F5',
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