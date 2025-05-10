"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  ScrollView,
} from "react-native"
import { FileIcon } from "./icons"
import { useNavigation } from "@react-navigation/native"

const CreateNewPost = () => {
  const [postTitle, setPostTitle] = useState("")
  const [description, setDescription] = useState("")
  const [mention, setMention] = useState("")
  const [tags, setTags] = useState("")
  const [allowRepost, setAllowRepost] = useState(true)
  const [visibleToAll, setVisibleToAll] = useState(false)
const navigation=useNavigation()
  const handlePost = () => {
    // Handle post submission
    console.log({
      postTitle,
      description,
      mention,
      tags,
      allowRepost,
      visibleToAll,
    })
    // Navigate back or to confirmation screen
    navigation.goBack()
  }

  const handleSaveAsDraft = () => {
    // Handle saving as draft
    console.log("Saved as draft")
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />



      <ScrollView style={styles.scrollView}>
        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Post Title */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Post Title</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex. What's trending now..."
              placeholderTextColor="#A0A0A0"
              value={postTitle}
              onChangeText={setPostTitle}
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              placeholder="Write about what you think..."
              placeholderTextColor="#A0A0A0"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          {/* Mention */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Mention</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex. @Michel"
              placeholderTextColor="#A0A0A0"
              value={mention}
              onChangeText={setMention}
            />
          </View>

          {/* Tags */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tags</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex. #Graphic design #Digital marketing"
              placeholderTextColor="#A0A0A0"
              value={tags}
              onChangeText={setTags}
            />
          </View>

          {/* Add Media */}
          <View style={styles.mediaContainer}>
            <Text style={styles.inputLabel}>Add Media ( Optional )</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <FileIcon />
              <Text style={styles.uploadText}>Upload Files</Text>
            </TouchableOpacity>
          </View>

          {/* Toggle Options */}
          <View style={styles.toggleContainer}>
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Allow your connection to Repost</Text>
              <Switch
                value={allowRepost}
                onValueChange={setAllowRepost}
                trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
                thumbColor={allowRepost ? "#007AFF" : "#F4F4F4"}
                ios_backgroundColor="#E0E0E0"
              />
            </View>

            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>Visible to all</Text>
              <Switch
                value={visibleToAll}
                onValueChange={setVisibleToAll}
                trackColor={{ false: "#E0E0E0", true: "#E0E0E0" }}
                thumbColor={visibleToAll ? "#007AFF" : "#F4F4F4"}
                ios_backgroundColor="#E0E0E0"
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.draftButton} onPress={handleSaveAsDraft}>
          <Text style={styles.draftButtonText}>Save as Draft</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
  },
  closeButton: {
    fontSize: 16,
    color: "#000000",
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  textAreaInput: {
    height: 100,
    textAlignVertical: "top",
  },
  mediaContainer: {
    marginBottom: 20,
  },
  uploadButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    borderStyle: "dashed",
  },
  uploadText: {
    color: "#007AFF",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  toggleContainer: {
    marginTop: 8,
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  toggleLabel: {
    fontSize: 14,
    color: "#000000",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 26,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  draftButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },
  draftButtonText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "500",
  },
  postButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  postButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
})

export default CreateNewPost
