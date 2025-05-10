"use client"

import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import type { RootStackParamList } from "../../types/RootStackParamList"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"

type CertificationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Certification">

export default function CertificationScreen() {
  const [certifications, setCertifications] = useState([
    {
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
      url: "",
    },
  ])

  const navigation = useNavigation<CertificationScreenNavigationProp>()

  const handleCertificationChange = (index: number, field: string, value: string) => {
    const updatedData = [...certifications]
    updatedData[index] = { ...updatedData[index], [field]: value }
    setCertifications(updatedData)
  }

  const addMoreCertification = () => {
    setCertifications([
      ...certifications,
      {
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        url: "",
      },
    ])
  }

  const removeCertification = (index: number) => {
    if (certifications.length > 1) {
      const updatedData = certifications.filter((_, i) => i !== index)
      setCertifications(updatedData)
    }
  }

  const handleContinue = () => {
    // Navigate to next screen or submit data
    navigation.navigate("ExperienceType") // Replace with your next screen
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "83%" }]} />
        </View>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.divider} />

        <View style={styles.formSection}>
          {certifications.map((item, index) => (
            <View key={index} style={styles.formCard}>
              <Text style={styles.formCardTitle}>Enter Certification Details</Text>
              {index > 0 && (
                <TouchableOpacity style={styles.removeButton} onPress={() => removeCertification(index)}>
                  <Ionicons name="close-circle" size={20} color="red" />
                </TouchableOpacity>
              )}

              <View style={styles.inputRow}>
                <Ionicons name="ribbon-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Certification Name *"
                  value={item.name}
                  onChangeText={(text) => handleCertificationChange(index, "name", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Issuing Organization *"
                  value={item.issuer}
                  onChangeText={(text) => handleCertificationChange(index, "issuer", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Issue Date (MM/YYYY)"
                  value={item.date}
                  onChangeText={(text) => handleCertificationChange(index, "date", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="key-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Credential ID"
                  value={item.credentialId}
                  onChangeText={(text) => handleCertificationChange(index, "credentialId", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="link-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Credential URL"
                  value={item.url}
                  onChangeText={(text) => handleCertificationChange(index, "url", text)}
                  keyboardType="url"
                />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addMoreButton} onPress={addMoreCertification}>
            <Ionicons name="add" size={20} color="#007BFF" />
            <Text style={styles.addMoreText}>Add Another Certification</Text>
          </TouchableOpacity>
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
  formSection: {
    marginBottom: 20,
  },
  formCard: {
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    position: "relative",
  },
  formCardTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
    color: "#555",
  },
  removeButton: {
    position: "absolute",
    right: 16,
    top: 16,
    zIndex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
  },
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  addMoreText: {
    color: "#007BFF",
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "500",
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
