"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  FlatList,
  Modal,
} from "react-native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import CheckBox from "@react-native-community/checkbox"
import { RootStackParamList } from "../../types/RootStackParamList"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"



type ProjectAcademicScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProjectAcademic'>;

// Define a Project type
type Project = {
  id: string
  projectName: string
  role: string
  fromMonth: string
  fromYear: string
  toMonth: string
  toYear: string
  isCurrentlyWorking: boolean
  projectUrl: string
  projectDescription: string
  media: string[]
}

const ProjectAcademic: React.FC = () => {
  // State for all projects
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      projectName: "Social Gathering App",
      role: "Sr. Graphic designer",
      fromMonth: "Apr",
      fromYear: "2021",
      toMonth: "Jun",
      toYear: "2022",
      isCurrentlyWorking: false,
      projectUrl: "",
      projectDescription: "",
      media: [],
    },
  ])

  const navigation = useNavigation<ProjectAcademicScreenNavigationProp>();


  // State for current project being edited
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0)

  // State for current project form
  const [projectName, setProjectName] = useState("")
  const [role, setRole] = useState("")
  const [fromMonth, setFromMonth] = useState("")
  const [fromYear, setFromYear] = useState("")
  const [toMonth, setToMonth] = useState("")
  const [toYear, setToYear] = useState("")
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false)
  const [projectUrl, setProjectUrl] = useState("")
  const [projectDescription, setProjectDescription] = useState("")
  const [media, setMedia] = useState<string[]>([])

  // State for project selector modal
  const [projectSelectorVisible, setProjectSelectorVisible] = useState(false)

  // Load current project data into form
  useEffect(() => {
    if (projects[currentProjectIndex]) {
      const currentProject = projects[currentProjectIndex]
      setProjectName(currentProject.projectName)
      setRole(currentProject.role)
      setFromMonth(currentProject.fromMonth)
      setFromYear(currentProject.fromYear)
      setToMonth(currentProject.toMonth)
      setToYear(currentProject.toYear)
      setIsCurrentlyWorking(currentProject.isCurrentlyWorking)
      setProjectUrl(currentProject.projectUrl)
      setProjectDescription(currentProject.projectDescription)
      setMedia(currentProject.media)
    }
  }, [currentProjectIndex, projects])

  // Save current form data to projects state
  const saveCurrentProject = () => {
    const updatedProjects = [...projects]
    updatedProjects[currentProjectIndex] = {
      id: projects[currentProjectIndex].id,
      projectName,
      role,
      fromMonth,
      fromYear,
      toMonth,
      toYear,
      isCurrentlyWorking,
      projectUrl,
      projectDescription,
      media,
    }
    setProjects(updatedProjects)
  }

  const handleSaveAndContinue = () => {
    // Validate required fields
    if (!projectName.trim()) {
      Alert.alert("Error", "Project name is required")
      return
    }

    if (!role.trim()) {
      Alert.alert("Error", "Role is required")
      return
    }

    // Save current project
    saveCurrentProject()

    // Navigate to next screen
    navigation.navigate("AreasOfInterest")
  }

  const handleUploadFiles = () => {
    // Handle file upload logic here
    Alert.alert("Upload Files", "File upload functionality would be implemented here")
  }

  const handleAddMoreProjects = () => {
    // Save current project first
    saveCurrentProject()

    // Create a new project with default values
    const newProject: Project = {
      id: Date.now().toString(), // Generate a unique ID
      projectName: "",
      role: "",
      fromMonth: "Jan",
      fromYear: new Date().getFullYear().toString(),
      toMonth: "Dec",
      toYear: new Date().getFullYear().toString(),
      isCurrentlyWorking: false,
      projectUrl: "",
      projectDescription: "",
      media: [],
    }

    // Add new project to projects array
    setProjects([...projects, newProject])

    // Set current project to the new one
    setCurrentProjectIndex(projects.length)

    // Show confirmation
    Alert.alert("Success", "New project added. You can now fill in the details.")
  }

  const handleDeleteProject = (index: number) => {
    // Confirm deletion
    Alert.alert("Delete Project", "Are you sure you want to delete this project?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Remove project from array
          const updatedProjects = [...projects]
          updatedProjects.splice(index, 1)

          // Update projects state
          setProjects(updatedProjects)

          // If we deleted the current project, adjust the index
          if (currentProjectIndex >= updatedProjects.length) {
            setCurrentProjectIndex(Math.max(0, updatedProjects.length - 1))
          }

          // Close modal
          setProjectSelectorVisible(false)
        },
      },
    ])
  }

  const handleSelectProject = (index: number) => {
    // Save current project first
    saveCurrentProject()

    // Switch to selected project
    setCurrentProjectIndex(index)

    // Close modal
    setProjectSelectorVisible(false)
  }

  const renderProjectItem = ({ item, index }: { item: Project; index: number }) => (
    <TouchableOpacity
      style={[styles.projectItem, index === currentProjectIndex && styles.selectedProjectItem]}
      onPress={() => handleSelectProject(index)}
    >
      <View style={styles.projectItemContent}>
        <Text style={styles.projectItemTitle} numberOfLines={1}>
          {item.projectName || "Untitled Project"}
        </Text>
        <Text style={styles.projectItemSubtitle} numberOfLines={1}>
          {item.role || "No role specified"}
        </Text>
      </View>

      {projects.length > 1 && (
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProject(index)}>
          <Icon name="delete-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
    

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: "50%" }]} />
        </View>
      </View>

      {/* Project selector button */}
      <TouchableOpacity style={styles.projectSelectorButton} onPress={() => setProjectSelectorVisible(true)}>
        <Text style={styles.projectSelectorText}>
          Project {currentProjectIndex + 1} of {projects.length}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#0066FF" />
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Add Project Details</Text>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Project Name</Text>
            <TextInput
              style={styles.textInput}
              value={projectName}
              onChangeText={setProjectName}
              placeholder="Enter project name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Role</Text>
            <TextInput style={styles.textInput} value={role} onChangeText={setRole} placeholder="Enter your role" />
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.dateGroup}>
              <Text style={styles.inputLabel}>From</Text>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity style={styles.datePicker}>
                  <Text style={styles.datePickerText}>
                    {fromMonth} {fromYear}
                  </Text>
                  <Icon name="arrow-drop-down" size={24} color="#888" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.dateGroup}>
              <Text style={styles.inputLabel}>To</Text>
              <View style={styles.datePickerContainer}>
                <TouchableOpacity style={styles.datePicker}>
                  <Text style={styles.datePickerText}>
                    {toMonth} {toYear}
                  </Text>
                  <Icon name="arrow-drop-down" size={24} color="#888" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isCurrentlyWorking}
              onValueChange={setIsCurrentlyWorking}
              tintColors={{ true: "#4B6EFF", false: "#888" }}
            />
            <Text style={styles.checkboxLabel}>I am currently working in this Role</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Project URL</Text>
            <TextInput
              style={styles.textInput}
              value={projectUrl}
              onChangeText={setProjectUrl}
              placeholder="www.mydomain.url"
              keyboardType="url"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Project Description ( Optional )</Text>
            <TextInput
              style={styles.descriptionInput}
              value={projectDescription}
              onChangeText={setProjectDescription}
              placeholder="Write about your project here"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.mediaSection}>
            <Text style={styles.inputLabel}>Add Media ( Optional )</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUploadFiles}>
              <Icon name="file-upload" size={24} color="#0066FF" />
              <Text style={styles.uploadButtonText}>Upload Files</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addMoreButton} onPress={handleAddMoreProjects}>
          <Icon name="add" size={20} color="#000" />
          <Text style={styles.addMoreText}>Add More Projects</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAndContinue}>
          <Text style={styles.saveButtonText}>Save & Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Project selector modal */}
      <Modal
        visible={projectSelectorVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setProjectSelectorVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Project</Text>
              <TouchableOpacity onPress={() => setProjectSelectorVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={projects}
              renderItem={renderProjectItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.projectList}
            />

            <TouchableOpacity
              style={styles.modalAddButton}
              onPress={() => {
                setProjectSelectorVisible(false)
                handleAddMoreProjects()
              }}
            >
              <Icon name="add" size={20} color="#0066FF" />
              <Text style={styles.modalAddButtonText}>Add New Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
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
  projectSelectorButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  projectSelectorText: {
    fontSize: 14,
    color: "#0066FF",
    fontWeight: "500",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateGroup: {
    width: "48%",
  },
  datePickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  datePickerText: {
    fontSize: 16,
    color: "#000",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F9F9F9",
    height: 100,
  },
  mediaSection: {
    marginBottom: 16,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9F9F9",
    flexDirection: "row",
  },
  uploadButtonText: {
    color: "#0066FF",
    fontSize: 16,
    marginLeft: 8,
  },
  addMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  addMoreText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 24,
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
  },
  projectList: {
    padding: 16,
  },
  projectItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#F9F9F9",
  },
  selectedProjectItem: {
    backgroundColor: "#E6EFFF",
    borderWidth: 1,
    borderColor: "#0066FF",
  },
  projectItemContent: {
    flex: 1,
    marginRight: 8,
  },
  projectItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginBottom: 4,
  },
  projectItemSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    padding: 8,
  },
  modalAddButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    marginHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F0F7FF",
    borderRadius: 8,
  },
  modalAddButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#0066FF",
  },
})

export default ProjectAcademic
