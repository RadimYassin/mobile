
import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from "react-native"

import { RootStackParamList } from "../../types/RootStackParamList"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

type interestAreasScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AreasOfInterest'>;


// List of all available interest areas
const interestAreas = [
  "Accounting & Finance",
  "Health",
  "Architecture",
  "Construction",
  "Information & Technology",
  "Content Writing",
  "Art & Craft",
  "Software Development",
  "Hardware",
  "Designing",
  "Asset Management",
  "Data Analysis",
  "Automation",
  "Teaching",
  "Sales & Marketing",
]

const AreasOfInterestScreen: React.FC = () => {
  // State to track selected interest areas
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const navigation = useNavigation<interestAreasScreenNavigationProp>();

  // Toggle selection of an interest area
  const toggleInterestArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter((selectedArea) => selectedArea !== area))
    } else {
      setSelectedAreas([...selectedAreas, area])
    }
  }

  // Handle continue button press
  const handleContinue = () => {
    // Navigate to the next screen (you can decide where to go next)
    navigation.navigate("Home")
  }

  // Render interest area item
  const renderInterestArea = (area: string) => {
    const isSelected = selectedAreas.includes(area)
    
    return (
      <TouchableOpacity
        key={area}
        style={[styles.interestItem, isSelected && styles.selectedInterestItem]}
        onPress={() => toggleInterestArea(area)}
      >
        <Text style={[styles.interestText, isSelected && styles.selectedInterestText]}>
          {area}
        </Text>
      </TouchableOpacity>
    )
  }

  // Create pairs of interest areas for the grid layout
  const createInterestAreaPairs = () => {
    const pairs = []
    for (let i = 0; i < interestAreas.length; i += 2) {
      const pair = [
        interestAreas[i],
        i + 1 < interestAreas.length ? interestAreas[i + 1] : null,
      ]
      pairs.push(pair)
    }
    return pairs
  }

  const interestAreaPairs = createInterestAreaPairs()

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "40%" }]} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>What is your area of interest?</Text>

        <View style={styles.interestGrid}>
          {interestAreaPairs.map((pair, index) => (
            <View key={index} style={styles.interestRow}>
              {pair[0] && renderInterestArea(pair[0])}
              {pair[1] && renderInterestArea(pair[1])}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.continueButton, selectedAreas.length === 0 && styles.disabledButton]} 
          onPress={handleContinue}
          disabled={selectedAreas.length === 0}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginVertical: 20,
  },
  interestGrid: {
    marginBottom: 20,
  },
  interestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  interestItem: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  selectedInterestItem: {
    backgroundColor: "#E6EFFF",
    borderColor: "#0066FF",
  },
  interestText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  selectedInterestText: {
    color: "#0066FF",
    fontWeight: "500",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  continueButton: {
    backgroundColor: "#0066FF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B0C4FF",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default AreasOfInterestScreen
