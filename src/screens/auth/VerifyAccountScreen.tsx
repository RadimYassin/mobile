
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
 type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'VerifyAccount'>;

export default function VerifyAccountScreen() {

  const navigation = useNavigation<NavigationProp>();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Move to next input if there's a value
      if (text.length === 1 && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOTP = () => {
    // Here you would typically verify the OTP with your backend
    // router.push('/auth/success');

    navigation.push("Sucssess")
  };

  const resendOTP = () => {
    // Implement resend OTP logic here
    setOtp(['', '', '', '']);
    inputRefs[0].current?.focus();
  };

  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current?.focus();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Please enter the verification code sent to your email address
        </Text>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1536859355448-76f92ebdc33d?q=80&w=500&auto=format&fit=crop' }}
          style={styles.illustration}
        />

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.verifyButton,
            otp.every(digit => digit !== '') ? {} : styles.verifyButtonDisabled
          ]}
          onPress={verifyOTP}
          disabled={!otp.every(digit => digit !== '')}
        >
          <Text style={styles.verifyButtonText}>VERIFY</Text>
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={resendOTP}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>

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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  otpInput: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#F8F9FA',
  },
  verifyButton: {
    height: 48,
    backgroundColor: '#0066ff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  verifyButtonText: {
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
    marginTop: 16,
  },
  backButtonText: {
    color: '#4B0082',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  resendText: {
    color: '#666',
  },
  resendLink: {
    color: '#0066ff',
    fontWeight: '500',
  },
});