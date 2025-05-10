"use client"

import type React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

interface DataPrivacyScreenProps {
  navigation: any
}

const DataPrivacyScreen: React.FC<DataPrivacyScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()

  // State for toggle switches
  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    locationTracking: true,
    adPersonalization: false,
    analytics: true,
    thirdPartySharing: false,
    cookieUsage: true,
    biometricAuth: true,
    activityHistory: true,
  })

  // Handle toggle changes
  const handleToggle = (key: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key as keyof typeof privacySettings],
    })
  }

  // Handle data deletion request
  const handleDeleteData = () => {
    Alert.alert(
      "Delete Account Data",
      "Are you sure you want to request deletion of all your data? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            // Here you would typically send the deletion request to your API
            Alert.alert(
              "Request Submitted",
              "Your data deletion request has been submitted. You will receive an email confirmation shortly.",
            )
          },
          style: "destructive",
        },
      ],
    )
  }

  // Handle data export request
  const handleExportData = () => {
    Alert.alert(
      "Export Your Data",
      "We will prepare your data for export. You will receive an email with a download link when it's ready.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Request Export",
          onPress: () => {
            // Here you would typically send the export request to your API
            Alert.alert(
              "Request Submitted",
              "Your data export request has been submitted. You will receive an email with download instructions shortly.",
            )
          },
        },
      ],
    )
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy & Data Protection</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Privacy Banner */}
        <View style={styles.privacyBanner}>
          <View style={styles.privacyIconContainer}>
            <MaterialIcons name="security" size={28} color="#FFFFFF" />
          </View>
          <View style={styles.privacyBannerContent}>
            <Text style={styles.privacyBannerTitle}>Your Privacy Matters</Text>
            <Text style={styles.privacyBannerText}>
              Control how your data is collected, used, and shared. We're committed to protecting your privacy.
            </Text>
          </View>
        </View>

        {/* Data Collection Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Collection</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <Ionicons name="analytics-outline" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Usage Data Collection</Text>
                <Text style={styles.preferenceDescription}>Allow collection of app usage data</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.dataCollection}
              onValueChange={() => handleToggle("dataCollection")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.dataCollection ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEF3C7" }]}>
                <Ionicons name="location-outline" size={20} color="#D97706" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Location Tracking</Text>
                <Text style={styles.preferenceDescription}>Allow app to track your location</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.locationTracking}
              onValueChange={() => handleToggle("locationTracking")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.locationTracking ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
                <MaterialCommunityIcons name="history" size={20} color="#DB2777" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Activity History</Text>
                <Text style={styles.preferenceDescription}>Store your in-app activity history</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.activityHistory}
              onValueChange={() => handleToggle("activityHistory")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.activityHistory ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Advertising & Personalization */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advertising & Personalization</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEE2E2" }]}>
                <MaterialIcons name="ads-click" size={20} color="#DC2626" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Ad Personalization</Text>
                <Text style={styles.preferenceDescription}>Allow personalized ads based on your activity</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.adPersonalization}
              onValueChange={() => handleToggle("adPersonalization")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.adPersonalization ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <AntDesign name="barschart" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Analytics</Text>
                <Text style={styles.preferenceDescription}>Allow anonymous usage analytics</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.analytics}
              onValueChange={() => handleToggle("analytics")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.analytics ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}>
                <FontAwesome name="share-alt" size={20} color="#9333EA" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Third-Party Data Sharing</Text>
                <Text style={styles.preferenceDescription}>Share data with third-party services</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.thirdPartySharing}
              onValueChange={() => handleToggle("thirdPartySharing")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.thirdPartySharing ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#ECFDF5" }]}>
                <MaterialCommunityIcons name="cookie-outline" size={20} color="#059669" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Cookie Usage</Text>
                <Text style={styles.preferenceDescription}>Allow cookies for improved experience</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.cookieUsage}
              onValueChange={() => handleToggle("cookieUsage")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.cookieUsage ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>
        </View>

        {/* Security */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <MaterialCommunityIcons name="fingerprint" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Biometric Authentication</Text>
                <Text style={styles.preferenceDescription}>Use fingerprint or face ID to secure your account</Text>
              </View>
            </View>
            <Switch
              value={privacySettings.biometricAuth}
              onValueChange={() => handleToggle("biometricAuth")}
              trackColor={{ false: "#E5E7EB", true: "#BFDBFE" }}
              thumbColor={privacySettings.biometricAuth ? "#0284C7" : "#FFFFFF"}
              ios_backgroundColor="#E5E7EB"
            />
          </View>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEF3C7" }]}>
                <Feather name="lock" size={20} color="#D97706" />
              </View>
              <Text style={styles.preferenceText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
                <MaterialIcons name="security" size={20} color="#DB2777" />
              </View>
              <Text style={styles.preferenceText}>Two-Factor Authentication</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEE2E2" }]}>
                <MaterialIcons name="devices" size={20} color="#DC2626" />
              </View>
              <Text style={styles.preferenceText}>Manage Devices</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <TouchableOpacity style={styles.preferenceItem} onPress={handleExportData}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <Feather name="download" size={20} color="#0284C7" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Export Your Data</Text>
                <Text style={styles.preferenceDescription}>Download a copy of your personal data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}>
                <MaterialCommunityIcons name="broom" size={20} color="#9333EA" />
              </View>
              <View>
                <Text style={styles.preferenceText}>Clear Browsing Data</Text>
                <Text style={styles.preferenceDescription}>Clear your search and browsing history</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.dangerItem} onPress={handleDeleteData}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEE2E2" }]}>
                <Feather name="trash-2" size={20} color="#DC2626" />
              </View>
              <View>
                <Text style={styles.dangerText}>Delete Account Data</Text>
                <Text style={styles.preferenceDescription}>Request deletion of all your data</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Legal & Policies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Legal & Policies</Text>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3F4F6" }]}>
                <Ionicons name="document-text-outline" size={20} color="#4B5563" />
              </View>
              <Text style={styles.preferenceText}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3F4F6" }]}>
                <Ionicons name="document-outline" size={20} color="#4B5563" />
              </View>
              <Text style={styles.preferenceText}>Terms of Service</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.preferenceItem}>
            <View style={styles.preferenceInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3F4F6" }]}>
                <MaterialIcons name="cookie" size={20} color="#4B5563" />
              </View>
              <Text style={styles.preferenceText}>Cookie Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Last Updated */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Last updated: May 9, 2025</Text>
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
  privacyBanner: {
    backgroundColor: "#0284C7",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  privacyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  privacyBannerContent: {
    flex: 1,
  },
  privacyBannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  privacyBannerText: {
    fontSize: 13,
    color: "#E0F2FE",
    lineHeight: 18,
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
  dangerItem: {
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
  dangerText: {
    fontSize: 15,
    color: "#DC2626",
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

export default DataPrivacyScreen

