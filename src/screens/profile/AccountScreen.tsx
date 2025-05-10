
import type React from "react"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Feather from "react-native-vector-icons/Feather"

interface AccountDetailsScreenProps {
  navigation: any
}

const AccountDetailsScreen: React.FC<AccountDetailsScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  const [formData, setFormData] = useState({
    name: "Radim Yassine",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    pincode: "",
    landmark: "",
    address: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSave = () => {
    console.log("Saving account details:", formData)
    // Here you would typically send the data to your API
    // Then navigate back or show a success message
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Account Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.profileImageContainer}>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" }}
                style={styles.profileImage}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="check" size={12} color="#fff" />
              </View>
            </View>
            <Text style={styles.profileName}>Radim Yassine</Text>
            <Text style={styles.profileRole}>UI / UX Designer at Google Inc.</Text>
          </View>

          {/* Personal Info Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Personal Info</Text>
            <View style={styles.divider} />

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={formData.name}
                onChangeText={(text) => handleChange("name", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="mail-outline" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                value={formData.email}
                onChangeText={(text) => handleChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Feather name="phone" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={formData.mobile}
                onChangeText={(text) => handleChange("mobile", text)}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth"
                value={formData.dob}
                onChangeText={(text) => handleChange("dob", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="male-female-outline" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Gender"
                value={formData.gender}
                onChangeText={(text) => handleChange("gender", text)}
              />
            </View>
          </View>

          {/* Address Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Address</Text>
            <View style={styles.divider} />

            <View style={styles.inputContainer}>
              <MaterialIcons name="location-on" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Pincode"
                value={formData.pincode}
                onChangeText={(text) => handleChange("pincode", text)}
                keyboardType="number-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome name="building-o" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Landmark, Locality, Place"
                value={formData.landmark}
                onChangeText={(text) => handleChange("landmark", text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Ionicons name="home-outline" size={20} color="#71717a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Flat no, Street name, Area etc."
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          {/* Bottom spacing */}
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  scrollContainer: {
    flex: 1,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#E0F2FE",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0284C7",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: "#71717A",
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 16,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#000000",
  },
  saveButton: {
    backgroundColor: "#0066ff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 24,
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default AccountDetailsScreen
