import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  time: string;
  unread?: boolean;
}

const MESSAGES: Message[] = [
  {
    id: '1',
    user: {
      name: 'Andy Robertson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    },
    lastMessage: 'Oh yes, please send your CV/Res...',
    time: '5m ago',
    unread: true,
  },
  // Add other messages here...
];

type MessagesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Messages'>;

const MessagesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<MessagesScreenNavigationProp>();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <AntDesign name="plus" size={24} color="#1e293b" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <EvilIcons name="search" size={24} color="#1e293b" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={20} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search message"
          placeholderTextColor="#94a3b8"
        />
      </View>

      <ScrollView style={styles.messagesList}>
        {MESSAGES.map((message) => (
          <TouchableOpacity
            key={message.id}
            onPress={() => navigation.navigate('ChatScreen', { id: message.id })}
          >
            <View style={styles.messageItem}>
              <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.userName}>{message.user.name}</Text>
                  <Text style={styles.messageTime}>{message.time}</Text>
                </View>
                <Text style={[styles.lastMessage, message.unread && styles.unreadMessage]} numberOfLines={1}>
                  {message.lastMessage}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  messagesList: {
    flex: 1,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  messageTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  lastMessage: {
    fontSize: 14,
    color: '#64748b',
  },
  unreadMessage: {
    color: '#1e293b',
    fontWeight: '500',
  },
});

export default MessagesScreen;
