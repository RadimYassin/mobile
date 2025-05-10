"use client"

import { useNavigation } from "@react-navigation/native"
import { useState } from "react"
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import { RootStackParamList } from "../../types/RootStackParamList"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
type EducationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Education'>;

export default function EducationScreen() {
  const [activeTab, setActiveTab] = useState("graduation")
  const [schoolData, setSchoolData] = useState({
    board: "",
    schoolName: "",
    completionYear: "",
  })
  const [graduationData, setGraduationData] = useState([
    {
      university: "",
      collegeName: "",
      completionYear: "",
    },
    {
      university: "",
      collegeName: "",
      completionYear: "",
    },
  ])

    const navigation = useNavigation<EducationScreenNavigationProp>()
  const handleSchoolChange = (field: string, value: string) => {
    setSchoolData({ ...schoolData, [field]: value })
  }

  const handleGraduationChange = (index: number, field: string, value: string) => {
    const updatedData = [...graduationData]
    updatedData[index] = { ...updatedData[index], [field]: value }
    setGraduationData(updatedData)
  }

  const addMoreEducation = () => {
    setGraduationData([
      ...graduationData,
      {
        university: "",
        collegeName: "",
        completionYear: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    if (graduationData.length > 1) {
      const updatedData = graduationData.filter((_, i) => i !== index)
      setGraduationData(updatedData)
    }
  }

  const handleContinue = () => {
    // Navigate to next screen or submit data

    navigation.navigate("Certification")
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "66%" }]} />
        </View>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.divider} />

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "schooling" && styles.activeTab]}
            onPress={() => setActiveTab("schooling")}
          >
            <Text style={[styles.tabText, activeTab === "schooling" && styles.activeTabText]}>Schooling</Text>
            {activeTab === "schooling" && (
              <View style={styles.tabIndicator}>
                <Text style={styles.tabIndicatorText}>1</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "graduation" && styles.activeTab]}
            onPress={() => setActiveTab("graduation")}
          >
            <Text style={[styles.tabText, activeTab === "graduation" && styles.activeTabText]}>Graduation</Text>
            {activeTab === "graduation" && (
              <View style={styles.tabIndicator}>
                <Text style={styles.tabIndicatorText}>2</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {activeTab === "schooling" ? (
          <View style={styles.formSection}>
            <View style={styles.formCard}>
              <Text style={styles.formCardTitle}>Enter Details</Text>
              <TouchableOpacity style={styles.selectInput}>
                <Text style={styles.selectInputText}>{schoolData.board || "Select Board / University"}</Text>
                <Ionicons name="chevron-down" size={20} color="#888" />
              </TouchableOpacity>

              <View style={styles.inputRow}>
                <Ionicons name="school-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="School Name"
                  value={schoolData.schoolName}
                  onChangeText={(text) => handleSchoolChange("schoolName", text)}
                />
              </View>

              <View style={styles.inputRow}>
                <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Completion Year"
                  keyboardType="number-pad"
                  value={schoolData.completionYear}
                  onChangeText={(text) => handleSchoolChange("completionYear", text)}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.formSection}>
            {graduationData.map((item, index) => (
              <View key={index} style={styles.formCard}>
                <Text style={styles.formCardTitle}>Enter Details</Text>
                {index > 0 && (
                  <TouchableOpacity style={styles.removeButton} onPress={() => removeEducation(index)}>
                    <Ionicons name="close-circle" size={20} color="red" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.selectInput}>
                  <Text style={styles.selectInputText}>{item.university || "Select University"}</Text>
                  <Ionicons name="chevron-down" size={20} color="#888" />
                </TouchableOpacity>

                <View style={styles.inputRow}>
                  <Ionicons name="business-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="College / University Name"
                    value={item.collegeName}
                    onChangeText={(text) => handleGraduationChange(index, "collegeName", text)}
                  />
                </View>

                <View style={styles.inputRow}>
                  <Ionicons name="calendar-outline" size={20} color="#888" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Completion Year"
                    keyboardType="number-pad"
                    value={item.completionYear}
                    onChangeText={(text) => handleGraduationChange(index, "completionYear", text)}
                  />
                </View>
              </View>
            ))}

            <TouchableOpacity style={styles.addMoreButton} onPress={addMoreEducation}>
              <Ionicons name="add" size={20} color="#007BFF" />
              <Text style={styles.addMoreText}>Add More Details</Text>
            </TouchableOpacity>
          </View>
        )}

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
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  tab: {
    alignItems: "center",
    paddingVertical: 8,
    position: "relative",
    flex: 1,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#6A5ACD",
  },
  tabText: {
    fontSize: 14,
    color: "#888",
  },
  activeTabText: {
    color: "#6A5ACD",
    fontWeight: "600",
  },
  tabIndicator: {
    position: "absolute",
    right: "30%",
    top: 0,
    backgroundColor: "#007BFF",
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabIndicatorText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
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
  selectInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    marginBottom: 12,
  },
  selectInputText: {
    color: "#888",
    fontSize: 14,
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
