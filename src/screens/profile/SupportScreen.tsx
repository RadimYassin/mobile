
import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

interface SupportScreenProps {
  navigation: any
}

interface FAQItem {
  id: string
  question: string
  answer: string
  expanded: boolean
}

const SupportScreen: React.FC<SupportScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")

  // FAQ state
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: "1",
      question: "How do I create a new post?",
      answer:
        "To create a new post, tap on the '+' button in the bottom navigation bar or on the 'Create New Post' button on your profile. Fill in the required fields and tap 'Post' to publish.",
      expanded: false,
    },
    {
      id: "2",
      question: "How do I change my account details?",
      answer:
        "Go to your profile, tap on 'Account Details', and you can edit your personal information there. Don't forget to save your changes.",
      expanded: false,
    },
    {
      id: "3",
      question: "How do I manage my privacy settings?",
      answer:
        "Navigate to 'Privacy & Data Protection' in the settings menu. There you can control your data collection preferences, ad personalization, and security settings.",
      expanded: false,
    },
    {
      id: "4",
      question: "How do I delete my account?",
      answer:
        "Go to 'Privacy & Data Protection', scroll down to 'Data Management', and tap on 'Delete Account Data'. Follow the prompts to complete the process.",
      expanded: false,
    },
    {
      id: "5",
      question: "How do I report inappropriate content?",
      answer:
        "Tap the three dots menu on any post or comment, then select 'Report'. Choose the reason for reporting and submit your report for review.",
      expanded: false,
    },
  ])

  // Toggle FAQ expansion
  const toggleFAQ = (id: string) => {
    setFaqs(faqs.map((faq) => (faq.id === id ? { ...faq, expanded: !faq.expanded } : { ...faq, expanded: false })))
  }

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    if (!feedbackMessage.trim()) {
      Alert.alert("Error", "Please enter your feedback before submitting.")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedbackMessage("")
      Alert.alert(
        "Thank You!",
        "Your feedback has been submitted successfully. We appreciate your input and will review it shortly.",
      )
    }, 1500)
  }

  // Handle contact support
  const handleContactSupport = (method: string) => {
    switch (method) {
   
      case "email":
        Alert.alert("Email Support", "Opening email to support@example.com...", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Continue",
            onPress: () => console.log("Opening email..."),
          },
        ])
        break
      case "phone":
        Alert.alert("Phone Support", "Calling support at +1-800-123-4567...", [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Call",
            onPress: () => console.log("Calling support..."),
          },
        ])
        break
    
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help & Support</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Support Banner */}
        <View style={styles.supportBanner}>
          <View style={styles.supportIconContainer}>
            <MaterialIcons name="support-agent" size={28} color="#FFFFFF" />
          </View>
          <View style={styles.supportBannerContent}>
            <Text style={styles.supportBannerTitle}>How can we help you?</Text>
            <Text style={styles.supportBannerText}>
              Find answers in our FAQs or contact our support team for assistance.
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
            clearButtonMode="while-editing"
          />
        </View>

        {/* Contact Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>

          <View style={styles.contactOptionsContainer}>
        

            <TouchableOpacity style={styles.contactOption} onPress={() => handleContactSupport("email")}>
              <View style={[styles.contactIconContainer, { backgroundColor: "#FEF3C7" }]}>
                <MaterialIcons name="email" size={24} color="#D97706" />
              </View>
              <Text style={styles.contactOptionText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactOption} onPress={() => handleContactSupport("phone")}>
              <View style={[styles.contactIconContainer, { backgroundColor: "#ECFDF5" }]}>
                <Feather name="phone" size={24} color="#059669" />
              </View>
              <Text style={styles.contactOptionText}>Call Us</Text>
            </TouchableOpacity>

           
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => toggleFAQ(faq.id)}
                activeOpacity={0.7}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons name={faq.expanded ? "chevron-up" : "chevron-down"} size={20} color="#6B7280" />
                </View>
                {faq.expanded && <Text style={styles.faqAnswer}>{faq.answer}</Text>}
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResultsContainer}>
              <Ionicons name="search-outline" size={48} color="#D1D5DB" />
              <Text style={styles.noResultsText}>No results found</Text>
              <Text style={styles.noResultsSubtext}>Try different keywords or browse our FAQs below</Text>
            </View>
          )}
        </View>

        {/* Troubleshooting Tools */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Troubleshooting Tools</Text>

          <TouchableOpacity style={styles.toolItem}>
            <View style={styles.toolInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#E0F2FE" }]}>
                <Ionicons name="refresh-circle-outline" size={20} color="#0284C7" />
              </View>
              <Text style={styles.toolText}>Check for Updates</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem}>
            <View style={styles.toolInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FEF3C7" }]}>
                <MaterialCommunityIcons name="broom" size={20} color="#D97706" />
              </View>
              <Text style={styles.toolText}>Clear Cache</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem}>
            <View style={styles.toolInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#FCE7F3" }]}>
                <MaterialIcons name="network-check" size={20} color="#DB2777" />
              </View>
              <Text style={styles.toolText}>Network Diagnostics</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.toolItem}>
            <View style={styles.toolInfo}>
              <View style={[styles.iconContainer, { backgroundColor: "#F3E8FF" }]}>
                <AntDesign name="bug" size={20} color="#9333EA" />
              </View>
              <Text style={styles.toolText}>Report a Bug</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Feedback Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Send Feedback</Text>

          <View style={styles.feedbackContainer}>
            <Text style={styles.feedbackLabel}>Help us improve by sharing your thoughts and suggestions</Text>
            <TextInput
              style={styles.feedbackInput}
              placeholder="Type your feedback here..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={feedbackMessage}
              onChangeText={setFeedbackMessage}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitFeedback}
              disabled={isSubmitting || !feedbackMessage.trim()}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Submit Feedback</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* System Status */}
        <View style={styles.statusContainer}>
          <View style={styles.statusIndicator}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>All systems operational</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.statusLink}>View system status</Text>
          </TouchableOpacity>
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
  supportBanner: {
    backgroundColor: "#0284C7",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  supportIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  supportBannerContent: {
    flex: 1,
  },
  supportBannerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  supportBannerText: {
    fontSize: 13,
    color: "#E0F2FE",
    lineHeight: 18,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#000",
  
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2937",
  },
  section: {
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  contactOptionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  contactOption: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  contactOptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 12,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1F2937",
    flex: 1,
    paddingRight: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
    lineHeight: 20,
  },
  noResultsContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  noResultsText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4B5563",
    marginTop: 12,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },
  toolItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  toolInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  toolText: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  feedbackContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    padding: 16,
  },
  feedbackLabel: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 12,
  },
  feedbackInput: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#1F2937",
    height: 100,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#0066ff",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 16,
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10B981",
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: "#4B5563",
  },
  statusLink: {
    fontSize: 14,
    color: "#0284C7",
    fontWeight: "500",
  },
})

export default SupportScreen
