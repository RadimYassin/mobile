
import type React from "react"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

interface GeneralPreferencesScreenProps {
  navigation: any
}

const GeneralPreferencesScreen: React.FC<GeneralPreferencesScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  // State for toggle switches
  const [preferences, setPreferences] = useState({
    darkMode: false,
    pushNotifications: true,
    emailNotifications: true,
    autoplay: true,
    dataSaver: false,
    locationServices: true,
    twoFactorAuth: false,
    readReceipts: true,
  })

  // Handle toggle changes
  const handleToggle = (key: string) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key as keyof typeof preferences],
    })
  }

  // Language options
  const languages = [
    { id: "en", name: "English", selected: true },
    { id: "es", name: "Spanish", selected: false },
    { id: "fr", name: "French", selected: false },
  ]

  // Font size options
  const fontSizes = [
    { id: "sm", name: "Small", selected: false },
    { id: "md", name: "Medium", selected: true },
    { id: "lg", name: "Large", selected: false },
  ]

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>General Preferences</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Appearance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <Ionicons name="moon-outline" size={20} color="#0284C7" />
              </View>
              <Text style={styles.preferenceText}>Dark Mode</Text>
            </View>
            <Switch
              value={preferences.darkMode}
              onValueChange={() => handleToggle("darkMode")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.darkMode ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F0FDF4" }]}>
                <Ionicons name="text-outline" size={20} color="#16A34A" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Font Size</Text>
                <Text style={styles.preferenceDescription}>Medium</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="language-outline" size={20} color="#D97706" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Language</Text>
                <Text style={styles.preferenceDescription}>English</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#EDE9FE" }]}>
                <Ionicons name="notifications-outline" size={20} color="#7C3AED" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Push Notifications</Text>
                <Text style={styles.preferenceDescription}>Receive push notifications</Text>
              </View>
            </View>
            <Switch
              value={preferences.pushNotifications}
              onValueChange={() => handleToggle("pushNotifications")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.pushNotifications ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
                <MaterialIcons name="email-outline" size={20} color="#DB2777" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Email Notifications</Text>
                <Text style={styles.preferenceDescription}>Receive email updates</Text>
              </View>
            </View>
            <Switch
              value={preferences.emailNotifications}
              onValueChange={() => handleToggle("emailNotifications")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.emailNotifications ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Privacy & Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Security</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEE2E2" }]}>
                <MaterialIcons name="security" size={20} color="#DC2626" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Two-Factor Authentication</Text>
                <Text style={styles.preferenceDescription}>Secure your account with 2FA</Text>
              </View>
            </View>
            <Switch
              value={preferences.twoFactorAuth}
              onValueChange={() => handleToggle("twoFactorAuth")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.twoFactorAuth ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <Ionicons name="location-outline" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Location Services</Text>
                <Text style={styles.preferenceDescription}>Allow app to use your location</Text>
              </View>
            </View>
            <Switch
              value={preferences.locationServices}
              onValueChange={() => handleToggle("locationServices")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.locationServices ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}>
                <MaterialCommunityIcons name="message-text-outline" size={20} color="#9333EA" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Read Receipts</Text>
                <Text style={styles.preferenceDescription}>Let others know when you've read messages</Text>
              </View>
            </View>
            <Switch
              value={preferences.readReceipts}
              onValueChange={() => handleToggle("readReceipts")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={preferences.readReceipts ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Media & Data */}

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
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
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  preferenceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  preferenceText: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  preferenceDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  versionContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
})

export default GeneralPreferencesScreen

