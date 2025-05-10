import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/RootStackParamList';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  likes: number;
  comments: number;
  time: string;
  image?: string;
}

const POSTS: Post[] = [
  {
    id: '1',
    user: {
      name: 'Andrew Michel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      role: 'UX Designer at Microsoft'
    },
    content: 'Just completed an amazing internship at Microsoft! Learned so much about UX design principles and working in a team environment.',
    likes: 42,
    comments: 8,
    time: '2h ago',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      role: 'Software Engineer Intern'
    },
    content: 'Excited to share that my internship project got featured in the company newsletter! #coding #internship',
    likes: 128,
    comments: 24,
    time: '5h ago'
  }
];
type ScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Post'>;

export default function Post() {
  const insets = useSafeAreaInsets();

  const navigate = useNavigation<ScreenNavigationProp>();

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Community Posts</Text>
        <TouchableOpacity style={styles.createButton} onPress={() => navigate.navigate('NewPost')}>
          <AntDesign name="plus" size={24} color="#0066ff" />
        </TouchableOpacity>
      </View>

      {POSTS.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{post.user.name}</Text>
              <Text style={styles.userRole}>{post.user.role}</Text>
            </View>
            <Text style={styles.postTime}>{post.time}</Text>
          </View>


<TouchableOpacity
onPress={() => navigate.navigate('PostDetails', { post })}
>
<Text style={styles.postContent}>{post.content}</Text>
          
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}



</TouchableOpacity>
         
          <View style={styles.postFooter}>
            <TouchableOpacity style={styles.actionButton}>
              <AntDesign name="hearto" size={20} color="#71717a" />
              <Text style={styles.actionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <EvilIcons name="comment" size={24} color="#71717a" />
              <Text style={styles.actionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <EvilIcons name="share-google" size={24} color="#71717a" />
            </TouchableOpacity>
          </View>

        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 0,
    elevation: 7,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181b',
  },
  userRole: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: '#71717a',
  },
  postContent: {
    fontSize: 15,
    color: '#4b5563',
    marginBottom: 12,
    lineHeight: 22,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f4f4f5',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#71717a',
  },
  commentPreview: {
    marginTop: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  commentPreviewText: {
    fontSize: 14,
    color: '#0066ff',
  },
});
