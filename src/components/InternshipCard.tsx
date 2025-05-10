import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { Bookmark as BookmarkIcon, AntDesign name='clockcircleo' } from 'lucide-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface Internship {
  title: string;
  company: {
    logo: string;
    name: string;
  };
  location: {
    city: string;
    country: string;
  };
  salary: {
    min: number;
    max: number;
  };
  type: string;
  postedTime: string;
}

interface InternshipCardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.companyLogoContainer}>
          <Image source={{ uri: internship.company.logo }} style={styles.companyLogo} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{internship.title}</Text>
          <Text style={styles.company}>{internship.company.name}</Text>
        </View>
        <TouchableOpacity style={styles.bookmarkButton}>
          <Ionicons name='bookmark-outline' size={20} color="#94A3B8" />
        </TouchableOpacity>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationDot} />
        <Text style={styles.locationText}>
          {internship.location.city}, {internship.location.country}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.salaryContainer}>
          <Text style={styles.salary}>${internship.salary.min} - ${internship.salary.max}</Text>
          <Text style={styles.period}>/ month</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{internship.type}</Text>
          </View>

          <View style={styles.timeContainer}>
            <AntDesign name='clockcircleo' size={14} color="#94A3B8" style={styles.clockIcon} />
            <Text style={styles.timeText}>{internship.postedTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#919191',
    shadowOffset: { width: 0, height: 0 },  // Adjust height
    shadowOpacity: 0.01,  // Increase opacity
    shadowRadius: 0, // Reduce radius for better visibility
  
    // Shadow for Android
    elevation: 15,  // Increase elevation
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  companyLogoContainer: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  companyLogo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  company: {
    fontSize: 14,
    color: '#64748B',
  },
  bookmarkButton: {
    justifyContent: 'center',
    padding: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3B82F6',
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  salaryContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  salary: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  period: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeContainer: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 8,
  },
  typeText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});