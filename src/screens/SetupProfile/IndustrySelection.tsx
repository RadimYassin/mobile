"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, SafeAreaView, StatusBar } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RootStackParamList } from "../../types/RootStackParamList"

type IndustrySelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, "IndustrySelection">

type Props = {
  navigation: IndustrySelectionScreenNavigationProp
}

const industries = [
  "Accounting & Finance",
  "Architecture",
  "Advertising Service",
  "Hospital & Healthcare",
  "Information Technology",
  "Food Services",
  "Fitness Services",
  "Education",
  "Engineering",
  "Legal Services",
  "Marketing",
  "Media & Communications",
  "Real Estate",
  "Retail",
  "Transportation",
]

const IndustrySelectionScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedIndustry, setSelectedIndustry] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredIndustries = industries.filter((industry) => industry.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSelect = (industry: string) => {
    setSelectedIndustry(industry)
  }

  const handleSave = () => {
    // Here you would typically pass the selected industry back to the previous screen
    navigation.goBack()
  }

  const renderIndustryItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.industryItem} onPress={() => handleSelect(item)}>
      <Text style={styles.industryText}>{item}</Text>
      <View style={styles.radioButton}>{selectedIndustry === item && <View style={styles.radioButtonSelected} />}</View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
     

      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Icon name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filteredIndustries}
        renderItem={renderIndustryItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.saveButton, !selectedIndustry ? styles.saveButtonDisabled : null]}
          onPress={handleSave}
          disabled={!selectedIndustry}
        >
          <Text style={styles.saveButtonText}>Save</Text>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  industryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  industryText: {
    fontSize: 16,
    color: "#000",
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0066FF",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#0066FF",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  saveButton: {
    backgroundColor: "#0066FF",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#B0C4FF",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default IndustrySelectionScreen
