import React, { useState } from 'react';
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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';
type ExperienceTypeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ExperienceType'>;

const ExperienceTypeScreen = () => {
  const navigation = useNavigation<ExperienceTypeScreenNavigationProp>();
  const [selectedOption, setSelectedOption] = useState<string | null>(null); 

  const handleSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: '70%' }]} />
        </View>
      </View>
      
      {/* Question */}
      <Text style={styles.question}>
        Which type of details you want to add?
      </Text>
      
      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity 
        onPressIn={()=>navigation.navigate("Internship_Experience_Details")}
          style={[
            styles.optionCard, 
            selectedOption === 'internship' && styles.selectedOption
          ]}
          onPress={() => handleSelect('internship')}
        >
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/woman-working-laptop_23-2148088275.jpg' }} 
            style={styles.optionImage} 
          />
          <Text style={styles.optionTitle}>Internship</Text>
          <Text style={styles.optionSubtitle}>Add past internship experience</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 

         onPressIn={()=>navigation.navigate("ProjectAcademic")}

          style={[
            styles.optionCard, 
            selectedOption === 'academic' && styles.selectedOption
          ]}
          onPress={() => handleSelect('academic')}
        >
          <Image 
            source={{ uri: 'https://img.freepik.com/free-vector/documents-concept-illustration_114360-138.jpg' }} 
            style={styles.optionImage} 
          />
          <Text style={styles.optionTitle}>Academic</Text>
          <Text style={styles.optionSubtitle}>Add past project details</Text>
        </TouchableOpacity>
      </View>
      
      {/* Button */}
      <TouchableOpacity 
        style={styles.button}
        onPress={() => {
          if (selectedOption) {
            // Navigation logic or next step
            console.log('Selected:', selectedOption);
          }
        }}
      >
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
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  selectedOption: {
    borderColor: '#6C63FF',
    backgroundColor: '#f0f0ff',
  },
  optionImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionSubtitle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 5,
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

export default ExperienceTypeScreen;
