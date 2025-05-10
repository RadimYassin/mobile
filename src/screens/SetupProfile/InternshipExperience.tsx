import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InternshipExperienceScreen = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    // navigation.navigate('ExperienceType');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setup Your Profile</Text>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '50%' }]} />
        </View>
      </View>
      
      {/* Question */}
      <Text style={styles.question}>
        Do you have any internship Experience?
      </Text>
      
      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionCard}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
            style={styles.avatar} 
          />
          <Text style={styles.optionTitle}>Yes, I have.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.optionCard}>
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
            style={styles.avatar} 
          />
          <Text style={styles.optionTitle}>No, I Don't have</Text>
        </TouchableOpacity>
      </View>
      
      {/* Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>Save & Continue</Text>
      </TouchableOpacity>
      
      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  progressContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
  },
  progress: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  question: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  optionCard: {
    width: '48%',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 30,
    padding: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 20,
    opacity: 0.2,
  },
});

export default InternshipExperienceScreen;