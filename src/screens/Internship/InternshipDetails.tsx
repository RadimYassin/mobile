import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../../types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { RouteProp } from '@react-navigation/native';

type InternshipDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'InternshipDetails'>;

type Internship = {
  id: string;
  title: string;
  department: string;
  location: string;
  workType: string;
  duration: string;
  compensation?: string;
  postedDate: string;
  description: string;
};

type Company = {
  id: number;
  name: string;
  logo: string;
};

const { width } = Dimensions.get('window');

const InternshipDetails = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const [visible, setVisible] = useState(true);
  const [internship, setInternship] = useState<Internship | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<InternshipDetailsNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'InternshipDetails'>>();
  const { internshipId, companyId } = route.params;

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`http://10.0.2.2:8080/api/companies/${companyId}/internships/${internshipId}`);
        const data = await res.json();
        setInternship(data);
        // Fetch company details for logo and name
        const companyRes = await fetch(`http://10.0.2.2:8080/api/companies/${companyId}`);
        const companyData = await companyRes.json();
        setCompany(companyData);
      } catch (e) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [companyId, internshipId]);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" color="#3b82f6" />;
  if (!internship || !company) return <Text style={{ margin: 40 }}>Not found</Text>;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </Text>
              </View>
            </View>
          </View>
        );
      case 'Qualification':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Qualification</Text>
            <View style={styles.bulletList}>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  When an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </Text>
              </View>
              <View style={styles.bulletItem}>
                <Text style={styles.bulletPoint}>•</Text>
                <Text style={styles.bulletText}>
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                </Text>
              </View>
            </View>
          </View>
        );
      case 'Skills':
        return (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsContainer}>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Graphic Designing</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Adobe XD</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Web design</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Adobe Photoshop</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Figma</Text>
              </View>
              <View style={styles.skillTag}>
                <Text style={styles.skillText}>Illustrator</Text>
              </View>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          <View style={styles.cardHeaderRow}>
            <Image source={{ uri: company.logo || 'https://via.placeholder.com/48' }} style={styles.cardLogo} />
            <View style={styles.cardTitleBlock}>
              <Text style={styles.cardTitle}>{internship.title}</Text>
              <Text style={styles.cardCompany}>{company.name}</Text>
            </View>
          </View>
          <View style={styles.cardBody}>
            <EvilIcons name='location' size={18} color="#71717a" style={styles.cardLocationIcon} />
            <Text style={styles.cardLocationText}>{internship.location}</Text>
            {internship.compensation && (
              <Text style={styles.cardSalaryPill}>{internship.compensation}</Text>
            )}
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardWorkType}>{internship.workType}</Text>
            <View style={styles.cardPostedTime}>
              <EvilIcons name='clock' size={14} color="#71717a" />
              <Text style={styles.cardPostedText}>
                {(() => {
                  const posted = new Date(internship.postedDate);
                  const now = new Date();
                  const diff = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
                  return `${diff} days ago`;
                })()}
              </Text>
            </View>
          </View>
          <Text style={{ fontSize: 15, color: '#4b5563', marginTop: 16 }}>{internship.description}</Text>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.navigate('ApplyForInternship', {
              id: internship.id,
              companyId: company.id.toString(),
              internshipId: internship.id,
              visible: true,
              onClose: () => {},
              onSubmit: () => {},
            })}
          >
            <Text style={styles.applyButtonText}>Apply For Internship</Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Profile', 'Qualification', 'Skills'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  profileCard: {
    margin: 40,
    marginBottom: 12,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderStyle:"dotted",
    borderColor:"#e5e7eb",
    borderWidth: 2,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,

    backgroundColor: '#f8fafc',
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    alignItems: 'center',

  },
  jobSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    alignItems: 'center',

  },
  infoContainer: {
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center',

  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoIcon: {
    marginRight: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
  },
  applyButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginTop: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTabText: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  contentSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  bulletList: {
    marginTop: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bulletPoint: {
    marginRight: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillTag: {
    backgroundColor: '#dbeafe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#3b82f6',
    fontSize: 14,
  },
  cardContainer: {
    width: width * 0.92,
    alignSelf: 'center',
    marginVertical: 12,
    padding: 26,
    marginTop:36,
    borderRadius: 24,
    borderStyle: 'dotted',
    borderColor: '#e5e7eb',
    borderWidth: 2,
    backgroundColor: '#f8fafc',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  cardTitleBlock: {
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardCompany: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardLocationIcon: {
    marginRight: 8,
  },
  cardLocationText: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardSalaryPill: {
    backgroundColor: '#dbeafe',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardWorkType: {
    fontSize: 14,
    color: '#6b7280',
  },
  cardPostedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  cardPostedText: {
    fontSize: 14,
    color: '#6b7280',
  },
});

export default InternshipDetails;