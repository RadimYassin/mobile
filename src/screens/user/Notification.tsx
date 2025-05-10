
import type React from "react"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, RefreshControl } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

// Define notification types
type NotificationType = "like" | "comment" | "follow" | "mention" | "tag" | "system"

interface Notification {
  id: string
  type: NotificationType
  user?: {
    name: string
    avatar: string
  }
  content: string
  time: string
  postId?: string
  read: boolean
}

// Sample notifications data
const NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "like",
    user: {
      name: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    content: "liked your post about UX design principles",
    time: "2m ago",
    postId: "1",
    read: false,
  },
  {
    id: "n2",
    type: "comment",
    user: {
      name: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    content: 'commented on your post: "Great insights! Would love to hear more about your experience."',
    time: "15m ago",
    postId: "1",
    read: false,
  },
  {
    id: "n3",
    type: "follow",
    user: {
      name: "Sophia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    content: "started following you",
    time: "1h ago",
    read: true,
  },
  {
    id: "n4",
    type: "mention",
    user: {
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    content: 'mentioned you in a comment: "@user I think you\'d find this interesting!"',
    time: "3h ago",
    postId: "2",
    read: true,
  },
  {
    id: "n5",
    type: "system",
    content: "Your post has been featured in the weekly digest!",
    time: "1d ago",
    read: true,
  },
  {
    id: "n6",
    type: "like",
    user: {
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    content: "and 5 others liked your comment",
    time: "1d ago",
    postId: "2",
    read: true,
  },
  {
    id: "n7",
    type: "tag",
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    content: "tagged you in a post about internship opportunities",
    time: "2d ago",
    postId: "3",
    read: true,
  },
]

interface NotificationScreenProps {
  navigation: any
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets()
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS)
  const [refreshing, setRefreshing] = useState(false)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate fetching new notifications
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    )
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const handleNotificationPress = (notification: Notification) => {
    // Mark as read when pressed
    markAsRead(notification.id)

    // Navigate based on notification type
    if (notification.postId) {
      // Find the post in your data and navigate to it
      // For now, we'll just navigate to the first post as an example
      const post = {
        id: notification.postId,
        user: {
          name: "Andrew Michel",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          role: "UX Designer at Microsoft",
        },
        content:
          "Just completed an amazing internship at Microsoft! Learned so much about UX design principles and working in a team environment.",
        likes: 42,
        comments: 8,
        time: "2h ago",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop",
      }
      navigation.navigate("PostDetails", { post })
    } else if (notification.type === "follow") {
      // Navigate to profile
      // navigation.navigate("Profile", { userId: notification.user.id })
      console.log("Navigate to profile")
    }
  }

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <AntDesign name="heart" size={20} color="#ff3b30" style={styles.notificationIcon} />
      case "comment":
        return <Ionicons name="chatbubble" size={20} color="#007AFF" style={styles.notificationIcon} />
      case "follow":
        return <Ionicons name="person-add" size={20} color="#34C759" style={styles.notificationIcon} />
      case "mention":
        return <AntDesign name="at" size={20} color="#FF9500" style={styles.notificationIcon} />
      case "tag":
        return <AntDesign name="tags" size={20} color="#5856D6" style={styles.notificationIcon} />
      case "system":
        return <Ionicons name="notifications" size={20} color="#007AFF" style={styles.notificationIcon} />
      default:
        return <Ionicons name="notifications" size={20} color="#007AFF" style={styles.notificationIcon} />
    }
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#18181b" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={markAllAsRead} style={styles.markReadButton}>
          {unreadCount > 0 ? (
            <Text style={styles.markReadText}>Mark all read</Text>
          ) : (
            <MaterialIcons name="settings" size={24} color="#18181b" />
          )}
        </TouchableOpacity>
      </View>

      {unreadCount > 0 && (
        <View style={styles.unreadBanner}>
          <View style={styles.unreadDot} />
          <Text style={styles.unreadText}>{unreadCount} new notifications</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      >
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#a1a1aa" />
            <Text style={styles.emptyText}>No notifications yet</Text>
            <Text style={styles.emptySubtext}>When you get notifications, they'll appear here</Text>
          </View>
        ) : (
          <View style={styles.notificationsContainer}>
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                style={[styles.notificationItem, !notification.read && styles.unreadNotification]}
                onPress={() => handleNotificationPress(notification)}
              >
                <View style={styles.notificationContent}>
                  {notification.type === "system" ? (
                    <View style={styles.systemIconContainer}>{getNotificationIcon(notification.type)}</View>
                  ) : (
                    <View style={styles.avatarContainer}>
                      <Image source={{ uri: notification.user?.avatar }} style={styles.avatar} />
                      <View style={styles.iconOverlay}>{getNotificationIcon(notification.type)}</View>
                    </View>
                  )}

                  <View style={styles.textContainer}>
                    <Text style={styles.notificationText}>
                      {notification.user && <Text style={styles.userName}>{notification.user.name} </Text>}
                      {notification.content}
                    </Text>
                    <Text style={styles.timeText}>{notification.time}</Text>
                  </View>

                  {!notification.read && <View style={styles.unreadIndicator} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
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
  markReadButton: {
    padding: 4,
  },
  markReadText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  unreadBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginRight: 8,
  },
  unreadText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  scrollContainer: {
    flex: 1,
  },
  notificationsContainer: {
    paddingVertical: 8,
  },
  notificationItem: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f5",
  },
  unreadNotification: {
    backgroundColor: "#f0f9ff",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  iconOverlay: {
    position: "absolute",
    bottom: -4,
    right: -4,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
    borderWidth: 1,
    borderColor: "#f4f4f5",
  },
  systemIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationIcon: {
    width: 20,
    height: 20,
    textAlign: "center",
  },
  textContainer: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
  },
  userName: {
    fontWeight: "600",
    color: "#18181b",
  },
  timeText: {
    fontSize: 12,
    color: "#71717a",
    marginTop: 4,
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#18181b",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#71717a",
    textAlign: "center",
    marginTop: 8,
  },
})

export default NotificationScreen
