import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Users, X, Check } from 'lucide-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ConnectionRequest {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: string;
  connections: string;
  companyLogo?: string;
}

const CONNECTION_REQUESTS: ConnectionRequest[] = [
  {
    id: '1',
    name: 'Andrew Michel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Sr. Android Developer',
    company: 'Polar Web-design',
    connections: '2k+ Connection',
  },
  {
    id: '2',
    name: 'Andre Design Studio',
    avatar: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=100&h=100&fit=crop',
    role: 'Working in Mobile apps, Web development,',
    company: 'Graphic design',
    connections: '2k+ Connection',
  },
  {
    id: '3',
    name: 'Joseph Delny',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Jr. Software engineer',
    company: 'UI den stuio & labs',
    connections: '2k+ Connection',
  },
  {
    id: '4',
    name: 'Merdez Diniz',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Jr. Software engineer',
    company: 'UI den stuio & labs',
    connections: '2k+ Connection',
  },
];

export default function Network() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Recent Request</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.requestsContainer}>
        {CONNECTION_REQUESTS.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.userInfo}>
              <Image 
                source={{ uri: request.avatar }}
                style={[
                  styles.avatar,
                  request.companyLogo && styles.companyAvatar
                ]}
              />
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{request.name}</Text>
                <Text style={styles.userRole}>{request.role}</Text>
                <Text style={styles.userCompany}>{request.company}</Text>
                <View style={styles.connectionsContainer}>
                  <AntDesign name='user' size={14} color="#71717a" />
                  <Text style={styles.connections}>{request.connections}</Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.button, styles.rejectButton]}>
                <AntDesign name='close' size={20} color="#dc2626" />
                <Text style={styles.rejectText}>Reject</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                <AntDesign name="check" size={20} color="#0066ff" />
                <Text style={styles.acceptText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
  },
  viewAll: {
    fontSize: 14,
    color: '#0066ff',
  },
  requestsContainer: {
    paddingHorizontal: 16,
  },
  requestCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 2 },  // Adjust height
    shadowOpacity: 0.01,  // Increase opacity
    shadowRadius: 0, // Reduce radius for better visibility
  
    // Shadow for Android
    elevation: 7,
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  companyAvatar: {
    borderRadius: 12,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#71717a',
    marginBottom: 2,
  },
  userCompany: {
    fontSize: 14,
    color: '#71717a',
    marginBottom: 4,
  },
  connectionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connections: {
    fontSize: 12,
    color: '#71717a',
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
  },
  rejectButton: {
    backgroundColor: '#fee2e2',
  },
  acceptButton: {
    backgroundColor: '#e0f2fe',
  },
  rejectText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#dc2626',
  },
  acceptText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0066ff',
  },
});