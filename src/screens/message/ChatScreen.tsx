// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParamList';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'ChatScreen'>;

type ChatScreenProps = {
  route: ChatScreenRouteProp;
};

// export default function ChatScreen({ route }: ChatScreenProps) {
//   const { id } = route.params;  // Get the 'id' parameter passed from the navigation

//   return (
//     <View style={styles.container}>
//       <Text>Chat Screen</Text>
//       <Text>Message ID: {id}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });



import { useState } from "react"
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

interface Message {
  id: string
  text: string
  isUser: boolean
  time: string
}

export default function ChatScreen({ route }: ChatScreenProps) {
  const [input, setInput] = useState("")
  const { id } = route.params
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      isUser: false,
      time: "14:20",
    },
    {
      id: "2",
      text: "Hi There, Welcome to our team.",
      isUser: false,
      time: "14:20",
    },
    {
      id: "3",
      text: "Nice to Meet you.",
      isUser: true,
      time: "14:20",
    },
    {
      id: "4",
      text: "Thanks for considering me as a job profile. Hope you get it Right",
      isUser: true,
      time: "14:20",
    },
  ])

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: input,
        isUser: true,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInput("")
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      

      {/* Chat area */}
      <ScrollView style={styles.chatContainer} contentContainerStyle={styles.chatContent}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>Today</Text>
        </View>

        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageContainer,
              message.isUser ? styles.userMessageContainer : styles.otherMessageContainer,
            ]}
          >
            <View style={[styles.messageBubble, message.isUser ? styles.userMessageBubble : styles.otherMessageBubble]}>
              <Text style={[styles.messageText, message.isUser ? styles.userMessageText : styles.otherMessageText]}>
                {message.text}
              </Text>
            </View>
            <View style={styles.timeContainer}>
              {message.isUser && <Icon name="checkmark-done" size={16} color="#0084FF" style={styles.readIcon} />}
              <Text style={styles.timeText}>{message.time}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input area */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <Icon name="attach-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
          multiline
        />
        <TouchableOpacity style={styles.cameraButton}>
          <Icon name="camera-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send-outline" size={24} color="#0084FF" />
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  headerRight: {
    flexDirection: "row",
  },
  headerIcon: {
    padding: 8,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  chatContent: {
    padding: 10,
  },
  dateContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  dateText: {
    fontSize: 14,
    color: "#999",
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMessageContainer: {
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    alignSelf: "flex-start",
  },
  messageBubble: {
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  userMessageBubble: {
    backgroundColor: "#0084FF",
  },
  otherMessageBubble: {
    backgroundColor: "#E4E4E4",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  otherMessageText: {
    color: "#333333",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 2,
  },
  timeText: {
    fontSize: 12,
    color: "#999",
  },
  readIcon: {
    marginRight: 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    marginBottom: 22,
    borderTopColor: "#EFEFEF",
    backgroundColor: "#FFFFFF",
  },
  attachButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  cameraButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
    marginLeft: 5,
  },
})


