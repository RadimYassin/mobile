
import type React from "react"
import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"

interface Comment {
  id: string
  user: {
    name: string
    avatar: string
  }
  text: string
  time: string
  likes: number
}

interface PostDetailsProps {
  route: {
    params: {
      post: {
        id: string
        user: {
          name: string
          avatar: string
          role: string
        }
        content: string
        likes: number
        comments: number
        time: string
        image?: string
      }
    }
  }
  navigation: any
}

// Sample comments data
const COMMENTS: Comment[] = [
  {
    id: "c1",
    user: {
      name: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    text: "This is amazing! I've been looking for insights like this. Would love to hear more about your experience.",
    time: "1h ago",
    likes: 5,
  },
  {
    id: "c2",
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    text: "Great post! Did you work with any specific teams during your internship?",
    time: "45m ago",
    likes: 2,
  },
  {
    id: "c3",
    user: {
      name: "Sophia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    text: "I'm applying for internships right now. Any tips for the interview process?",
    time: "20m ago",
    likes: 1,
  },
]

const PostDetails: React.FC<PostDetailsProps> = ({ route, navigation }) => {
  const { post } = route.params
  const insets = useSafeAreaInsets()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState(COMMENTS)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleAddComment = () => {
    if (commentText.trim() === "") return

    const newComment: Comment = {
      id: `c${comments.length + 1}`,
      user: {
        name: "You",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
      },
      text: commentText,
      time: "Just now",
      likes: 0,
    }

    setComments([newComment, ...comments])
    setCommentText("")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
       

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.postContainer}>
            <View style={styles.postHeader}>
              <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{post.user.name}</Text>
                <Text style={styles.userRole}>{post.user.role}</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>

            <Text style={styles.postContent}>{post.content}</Text>

            {post.image && <Image source={{ uri: post.image }} style={styles.postImage} />}

            <View style={styles.postStats}>
              <Text style={styles.statsText}>{likeCount} likes</Text>
              <Text style={styles.statsText}>{post.comments} comments</Text>
            </View>

            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
                <AntDesign name={liked ? "heart" : "hearto"} size={20} color={liked ? "#ff3b30" : "#71717a"} />
                <Text style={[styles.actionText, liked && styles.actionTextActive]}>Like</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <EvilIcons name="comment" size={24} color="#71717a" />
                <Text style={styles.actionText}>Comment</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <EvilIcons name="share-google" size={24} color="#71717a" />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>

            {comments.map((comment) => (
              <View key={comment.id} style={styles.commentItem}>
                <Image source={{ uri: comment.user.avatar }} style={styles.commentAvatar} />
                <View style={styles.commentContent}>
                  <View style={styles.commentBubble}>
                    <Text style={styles.commentUserName}>{comment.user.name}</Text>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                  <View style={styles.commentActions}>
                    <Text style={styles.commentTime}>{comment.time}</Text>
                    <TouchableOpacity>
                      <Text style={styles.commentActionText}>Like</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.commentActionText}>Reply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.commentInputContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop",
            }}
            style={styles.commentInputAvatar}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor="#71717a"
            value={commentText}
            onChangeText={setCommentText}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, commentText.trim() === "" && styles.sendButtonDisabled]}
            onPress={handleAddComment}
            disabled={commentText.trim() === ""}
          >
            <Ionicons name="send" size={20} color={commentText.trim() === "" ? "#a1a1aa" : "#0066ff"} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f5",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#18181b",
  },
  moreButton: {
    padding: 4,
  },
  scrollContainer: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: "white",
    padding: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "600",
    color: "#18181b",
  },
  userRole: {
    fontSize: 14,
    color: "#71717a",
    marginTop: 2,
  },
  postTime: {
    fontSize: 12,
    color: "#71717a",
  },
  postContent: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 16,
    lineHeight: 24,
  },
  postImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: "cover",
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f4f5",
  },
  statsText: {
    fontSize: 14,
    color: "#71717a",
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#71717a",
  },
  actionTextActive: {
    color: "#ff3b30",
  },
  commentsSection: {
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.01,  // Increase opacity
    shadowRadius: 0, // Reduce radius for better visibility
  
    // Shadow for Android
    elevation: 15,  // Increase elevation for better visibility
  },
  commentUserName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginLeft: 12,
  },
  commentTime: {
    fontSize: 12,
    color: "#71717a",
    marginRight: 12,
  },
  commentActionText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#71717a",
    marginRight: 12,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#f4f4f5",
    paddingBottom: Math.max(12),
  },
  commentInputAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#f4f4f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 14,
    color: "#18181b",
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
})

export default PostDetails
