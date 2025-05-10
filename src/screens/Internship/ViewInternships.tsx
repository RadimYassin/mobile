import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InternshipCard from '../../components/InternshipCard';;
import FilterChips from './FilterChips';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { internships } from './internships';

export default function ViewAllScreen() {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const filteredInternships = internships.filter((internship) => {
        const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            internship.location.city.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedFilters.length === 0) return matchesSearch;
        return matchesSearch && selectedFilters.includes(internship.type);
    });

    return (
        <SafeAreaView style={styles.container}>
               <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Icon name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by title, company, or location..."
                        placeholderTextColor="#94A3B8"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FilterChips
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
            />

            <View style={styles.resultsHeader}>
                <Text style={styles.resultsCount}>
                    {filteredInternships.length} {filteredInternships.length === 1 ? 'Result' : 'Results'}
                </Text>
            </View>

            <FlatList
                data={filteredInternships}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <InternshipCard internship={item} />
                )}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateTitle}>No results found</Text>
                        <Text style={styles.emptyStateText}>
                            Try adjusting your search or filters to find more opportunities
                        </Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8FB',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  placeholder: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,

  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
    height: '100%',
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  resultsCount: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: '#F8F8FB',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});