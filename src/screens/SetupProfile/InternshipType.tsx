
import type React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, FlatList } from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import { RootStackParamList } from "../../types/RootStackParamList"

type InternshipTypeScreenNavigationProp = StackNavigationProp<RootStackParamList, "InternshipType">

type Props = {
  navigation: InternshipTypeScreenNavigationProp
}

const internshipTypes = ["In-office", "Remote", "Paid", "Unpaid"]

const InternshipTypeScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState("In-office")

  const handleSelect = (type: string) => {
    setSelectedType(type)
  }

  const handleSave = () => {
    // Here you would typically pass the selected type back to the previous screen
    navigation.goBack()
  }

  const renderTypeItem = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.typeItem} onPress={() => handleSelect(item)}>
      <Text style={styles.typeText}>{item}</Text>
      {selectedType === item && <Icon name="check" size={20} color="#0066FF" />}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>Please Select</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={internshipTypes}
        renderItem={renderTypeItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  typeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  typeText: {
    fontSize: 16,
    color: "#000",
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
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default InternshipTypeScreen
