import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface SearchResult {
  id: string;
  title: string;
  type: string;
  subtitle?: string;
  members?: number;
  showAll?: boolean;
}

export default function FilterInternships() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const searchResults: SearchResult[] = [
    { id: '1', title: 'Design School', type: 'Company', subtitle: 'in Company' },
    { id: '2', title: 'UI Designer', type: 'Internship', showAll: true },
    { id: '3', title: 'Graphic Designer', type: 'Internship', showAll: true },
    { id: '4', title: 'Graphic Design Projects', type: 'Group', members: 54 },
    { id: '5', title: 'Design Academy', type: 'Company', subtitle: 'in Company' },
  ];

  const filterOptions = [
    { title: 'Internship Type', options: ['Full-time', 'Part-time', 'Remote', 'On-site',"Hybrid"] },
    { title: 'Experience Level', options: ['Entry Level', 'Mid Level', 'Senior Level'] },
    { title: 'Location', options: ['Remote', 'Hybrid', 'On-site'] },
    { title: 'Salary Range', options: ['$0-30k', '$30-60k', '$60-90k', '$90k+'] },
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <AntDesign name='search1' size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="options-outline" size={20} color="#0066ff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Most In Feed</Text>
        
        <ScrollView style={styles.resultsList}>
          {searchResults.map((result) => (
            <TouchableOpacity key={result.id} style={styles.resultItem}>
              <View style={styles.resultContent}>
                <AntDesign name="arrowright" size={20} color="#64748B" style={styles.arrowIcon} />
                <View>
                  <Text style={styles.resultTitle}>{result.title}</Text>
                  {result.subtitle && (
                    <Text style={styles.resultSubtitle}>{result.subtitle}</Text>
                  )}
                  {result.members && (
                    <Text style={styles.resultSubtitle}>{result.members} Members</Text>
                  )}
                </View>
              </View>
              {result.showAll && (
                <Text style={styles.showAllText}>shows all post</Text>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.showAllButton}>
          <Text style={styles.showAllButtonText}>Show all Results</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showFilters}
        animationType="fade"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filters</Text>
              <TouchableOpacity 
                onPress={() => setShowFilters(false)}
                style={styles.closeButton}
              >
                <Feather name="x" size={24} color="#0F172A" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filtersList}>
              {filterOptions.map((section) => (
                <View key={section.title} style={styles.filterSection}>
                  <Text style={styles.filterSectionTitle}>{section.title}</Text>
                  <View style={styles.filterOptions}>
                    {section.options.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          styles.filterOption,
                          selectedFilters.includes(option) && styles.filterOptionSelected
                        ]}
                        onPress={() => toggleFilter(option)}
                      >
                        <Text style={[
                          styles.filterOptionText,
                          selectedFilters.includes(option) && styles.filterOptionTextSelected
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSelectedFilters([])}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0F172A',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIcon: {
    marginRight: 12,
  },
  resultTitle: {
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  showAllText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    marginLeft: 32,
  },
  showAllButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  showAllButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0F172A',
  },
  closeButton: {
    padding: 4,
  },
  filtersList: {
    flex: 1,
  },
  filterSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterOptionSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#64748B',
  },
  filterOptionTextSelected: {
    color: '#FFFFFF',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});