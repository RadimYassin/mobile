import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
// import { Search, MapPin, Clock, Bookmark } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import EvilIcons2 from 'react-native-vector-icons/FontAwesome';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { RootStackParamList } from '../../types/RootStackParamList';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Company = {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  website: string;
};

type Internship = {
  id: string;
  title: string;
  location: string;
  department: string;
  postedDate: string;
  description: string;
  duration: string;
  workType: string;
  salary?: string;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const CATEGORIES = ['All', 'Tech', 'Design', 'Business', 'Engineering'];
export default function HomeScreen() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyInternships, setCompanyInternships] = useState<Record<number, Internship[]>>({});
  const insets = useSafeAreaInsets();
  useEffect(() => {
    const fetchToken = async () => {
      const t = await AsyncStorage.getItem('token');
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      // You can use the token here

      setfirstName(firstName || '')
      setlastName(lastName || '')
    };
    fetchToken();
  }, []);
  const [selectedCategory, setSelectedCategory] = React.useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchCompaniesAndInternships = async () => {
      try {
        // 1. Fetch all companies
        const companiesRes = await fetch('http://10.0.2.2:8080/api/companies');
        const companiesData = await companiesRes.json();
        setCompanies(companiesData);

        // 2. For each company, fetch its internships
        const internshipsMap: Record<number, Internship[]> = {};
        await Promise.all(
          companiesData.map(async (company: Company) => {
            const res = await fetch(`http://10.0.2.2:8080/api/companies/${company.id}/internships`);
            const data = await res.json();
            internshipsMap[company.id] = Array.isArray(data) ? data : [];
          })
        );
        setCompanyInternships(internshipsMap);
      } catch (error) {
        console.error('Failed to fetch companies or internships:', error);
      }
    };

    fetchCompaniesAndInternships();
  }, []);

  return (
    <ScrollView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome </Text>
          <Text style={styles.name}>{firstName} {lastName}</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton} onPress={()=>navigation.navigate("Notification")}>
          <EvilIcons name="bell" size={28} color="#18181b" />
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <EvilIcons name='search' size={24} color="#71717a" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search internships..."
            placeholderTextColor="#71717a"
          />
          <Ionicons onPress={()=>navigation.navigate("FilterInternships")} name='options-outline' size={24} color="#71717a" />

        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Featured Internships</Text>
        <TouchableOpacity  onPress={()=>{navigation.navigate('ViewInternships')}}>
          <Text style={styles.viewAll} >View all</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
        style={styles.categoriesWrapper}>
        {CATEGORIES.map((category, index) => (
          <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(index)}
            style={[
              styles.categoryButton,
              selectedCategory === index && styles.activeCategoryButton,
            ]}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === index && styles.activeCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.jobsContainer}>
        {companies.map((company) => (
          <View key={company.id} style={{ marginBottom: 24 }}>
            
            {companyInternships[company.id] && companyInternships[company.id].length > 0 ? (
              companyInternships[company.id].map((internship) => (
                <TouchableOpacity
                  key={internship.id}
                  style={styles.cardContainer}
                  onPress={() => navigation.navigate('InternshipDetails', { internshipId: internship.id, companyId: company.id.toString() })}
                  activeOpacity={0.85}
                >
                  <View style={styles.cardHeaderRow}>
                    <Image source={{ uri: company.logo || 'https://via.placeholder.com/48' }} style={styles.cardLogo} />
                    <View style={styles.cardTitleBlock}>
                      <Text style={styles.cardTitle}>{internship.title}</Text>
                      <Text style={styles.cardCompany}>{company.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookmarkButton}>
                      <EvilIcons2 name='bookmark-o' size={22} color="#71717a" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.cardBody}>
                    <EvilIcons name='location' size={18} color="#71717a" style={styles.cardLocationIcon} />
                    <Text style={styles.cardLocationText}>{internship.location}</Text>
                    {/* Salary pill, if available */}
                    {internship.salary && (
                      <Text style={styles.cardSalaryPill}>{internship.salary}</Text>
                    )}
                  </View>
                  <View style={styles.cardFooter}>
                    <Text style={styles.cardWorkType}>{internship.workType}</Text>
                    <View style={styles.cardPostedTime}>
                      <EvilIcons name='clock' size={14} color="#71717a" />
                      <Text style={styles.cardPostedText}>
                        {/* Show posted time as 'X days ago' */}
                        {(() => {
                          const posted = new Date(internship.postedDate);
                          const now = new Date();
                          const diff = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));
                          return `${diff} days ago`;
                        })()}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={{ marginLeft: 16, color: '#888' }}>No internships available</Text>
            )}
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
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: '#71717a',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
    marginTop: 4,
  },
  searchContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9,
    padding: 7,
    flex: 1,
    
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 0 },  // Adjust height
    shadowOpacity: 0.01,  // Increase opacity
    shadowRadius: 0, // Reduce radius for better visibility
  
    // Shadow for Android
    elevation: 15,  // Increase elevation
  },
  
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.01,
    shadowRadius: 0,
    elevation: 15,
  },
  notificationBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#ef4444',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#18181b',
    
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#18181b',
  },
  viewAll: {
    fontSize: 14,
    color: '#71717a',
    cursor: 'pointer',
  },
  categoriesWrapper: {
    marginTop: 16,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    marginRight: 8,
  },
  activeCategoryButton: {
    backgroundColor: '#0066ff',
  },
  categoryText: {
    fontSize: 14,
    color: '#0066ff',
  },
  activeCategoryText: {
    color: 'white',
  },
  jobsContainer: {
    padding: 16,
    
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    flexDirection: 'column',
    gap: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLogo: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f4f4f5',
    marginRight: 12,
  },
  cardTitleBlock: {
    flex: 1,
    flexDirection: 'column',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#18181b',
  },
  cardCompany: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
  bookmarkButton: {
    padding: 8,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardLocationIcon: {
    marginRight: 4,
  },
  cardLocationText: {
    fontSize: 14,
    color: '#71717a',
  },
  cardSalaryPill: {
    backgroundColor: '#e0f2fe',
    color: '#0066ff',
    fontWeight: '600',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardWorkType: {
    fontSize: 13,
    color: '#71717a',
    backgroundColor: '#f4f4f5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  cardPostedTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardPostedText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#71717a',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f4f4f5',
  },
  companyName: {
    fontSize: 14,
    color: '#71717a',
    marginTop: 2,
  },
});