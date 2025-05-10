import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParamList';
import { useNavigation } from '@react-navigation/native';


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileScreen'>;

interface MenuItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  link: string; 
}



const MENU_ITEMS: MenuItem[] = [
  {
    id: 'account',
    title: 'Account',
    subtitle: 'Personal Info, Profile Picture',
    icon: <AntDesign name='user' size={20} color="#71717a" />,
    link: 'AccountScreen', 
  },
  {
    id: 'profile-setup',
    title: 'Profile Setup',
    subtitle: 'Mention your job, experience, Project work and certification',
    icon: <AntDesign name="setting" size={20} color="#71717a" />,
    link: 'ProfileSetupScreen',
  },
  {
    id: 'preferences',
    title: 'General Preference',
    subtitle: 'Language, Currency, Theme',
    icon: <AntDesign name="setting" size={20} color="#71717a" />,
    link: 'PreferencesScreen',
  },

  {
    id: 'privacy',
    title: 'Data Privacy & Protection',
    subtitle: 'Enable / Disable data Privacy information to be displayed',
    icon: <AntDesign name='lock1' size={20} color="#71717a" />,
    link: 'PrivacyScreen'},
  {
    id: 'support',
    title: 'Help & Support',
    subtitle: 'Customer Support - 24/7, Chat support, Customer call representative',
    icon: <MaterialIcons name='help-outline' size={20} color="#71717a" />,
    link: 'SupportScreen',
  },
];

const  Profile:React.FC=()=> {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Initialize navigation with type

  return (
    <ScrollView 
      style={[styles.container, { paddingTop: insets.top }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Profile</Text>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=200&h=200&fit=crop' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Andrew Michel</Text>
        
        <View style={styles.completionContainer}>
          <View style={styles.progressOuter}>
            <View style={[styles.progressInner, { width: '76%' }]} />
          </View>
          <View style={styles.completionTextContainer}>
            <Text style={styles.completionPercentage}>76% Profile Completion</Text>
            <Text style={styles.completionDetails}>3 Details Remaining</Text>
          </View>
          <Text style={styles.updatedTime}>Updated 2 days ago</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {MENU_ITEMS.map((item , index) => (
          <TouchableOpacity 
            key={item.id}
            style={[
              styles.menuItem,
              index === MENU_ITEMS.length - 1 && styles.lastMenuItem,
            ]}
            onPress={() => navigation.navigate(item.link as any)} // Navigate to the link
          >
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemIcon}>
                {item.icon}
              </View>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
                <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
              </View>
              <AntDesign name='right' size={20} color="#71717a" />
            </View>
          </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#18181b',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: '#18181b',
    marginBottom: 24,
  },
  completionContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  progressOuter: {
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginBottom: 12,
  },
  progressInner: {
    height: '100%',
    backgroundColor: '#0066ff',
    borderRadius: 4,
  },
  completionTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  completionPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#18181b',
  },
  completionDetails: {
    fontSize: 14,
    color: '#71717a',
  },
  updatedTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
  },
  lastMenuItem: {
    marginBottom: 24,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#18181b',
    marginBottom: 4,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: '#71717a',
    lineHeight: 16,
  },
  premiumItem: {
    backgroundColor: '#fffbeb',
    marginBottom: 32,
  },
});


export default Profile;