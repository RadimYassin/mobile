"use client"

import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
type PersonalInfoScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PersonalInfo'>;
import { RootStackParamList } from "../../types/RootStackParamList"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
export default function PersonalInfoScreen() {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    age: "",
    gender: "",
    pincode: "",
    landmark: "",
    address: "",
  })
  const navigation = useNavigation<PersonalInfoScreenNavigationProp>();

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleContinue = () => {
    navigation.navigate("Education")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "33%" }]} />
        </View>
      </View>

      <ScrollView style={styles.formContainer}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.divider} />

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="call-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              value={formData.mobileNumber}
              onChangeText={(text) => handleChange("mobileNumber", text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              keyboardType="email-address"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="number-pad"
              value={formData.age}
              onChangeText={(text) => handleChange("age", text)}
            />
          </View>
          <View style={styles.genderContainer}>
            <Ionicons name="male-female-outline" size={20} color="#888" />
            <Text style={styles.genderText}>Gender</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Address</Text>
        <View style={styles.divider} />

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Pincode"
              keyboardType="number-pad"
              value={formData.pincode}
              onChangeText={(text) => handleChange("pincode", text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Landmark, Locality, Place..."
              value={formData.landmark}
              onChangeText={(text) => handleChange("landmark", text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <Ionicons name="home-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Flat no, Street name, Area name..."
              value={formData.address}
              onChangeText={(text) => handleChange("address", text)}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Save & Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip For Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  progress: {
    height: "100%",
    backgroundColor: "#6A5ACD",
    borderRadius: 2,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    right: 16,
    top: 12,
  },
  genderText: {
    marginLeft: 4,
    color: "#888",
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 32,
  },
  continueButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  skipButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  skipButtonText: {
    color: "#6A5ACD",
    fontSize: 14,
  },
})
