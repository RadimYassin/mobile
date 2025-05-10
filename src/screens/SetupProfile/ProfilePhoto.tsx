
import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, Alert } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
// yarn add react-native-image-picker
// or
// npm install react-native-image-picker

import { launchCamera, launchImageLibrary } from "react-native-image-picker"
import { RootStackParamList } from "../../types/RootStackParamList"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type ProfilePhotoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProfilePhoto'>;


const ProfilePhotoScreen: React.FC = () => {
    const navigation = useNavigation<ProfilePhotoScreenNavigationProp>();
  
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const handleChooseFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        quality: 0.8,
        selectionLimit: 1,
      })

      if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
        setProfilePhoto(result.assets[0].uri)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select photo. Please try again.")
    }
  }

  const handleContinue = () => {
    // Here you would typically save the profile photo
    // and navigate to the next screen or complete the setup

    navigation.navigate("Home")
   
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />


      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "90%" }]} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Let's Finish Setup by Adding Your Profile Photo.</Text>

        <View style={styles.photoContainer}>
          {profilePhoto ? (
            <Image source={{ uri: profilePhoto }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.placeholderContainer}>
              <Icon name="person" size={50} color="#fff" />
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
    
          <TouchableOpacity style={styles.galleryButton} onPress={handleChooseFromGallery}>
            <Icon name="photo-library" size={20} color="#fff" />
            <Text style={styles.buttonText}>Choose From Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText} >Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progress: {
    height: "100%",
    backgroundColor: "#4B6EFF",
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginBottom: 40,
  },
  photoContainer: {
    marginBottom: 40,
  },
  placeholderContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E6EFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#D6E4FF",
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#D6E4FF",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    gap: 16,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0066FF",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 200,
  },
  galleryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0066FF",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: 240,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
  footer: {
    padding: 16,
  },
  continueButton: {
    backgroundColor: "#0066FF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ProfilePhotoScreen
