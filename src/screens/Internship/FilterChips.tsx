import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface FilterChipsProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

const FILTER_OPTIONS = [
  'Full-time',
  'Part-time',
  'Internship',
  'Remote',
  'Hybrid',
  'On-site'
];

export default function FilterChips({ selectedFilters, onFilterChange }: FilterChipsProps) {
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      onFilterChange(selectedFilters.filter(f => f !== filter));
    } else {
      onFilterChange([...selectedFilters, filter]);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {FILTER_OPTIONS.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.chip,
              selectedFilters.includes(filter) && styles.chipSelected
            ]}
            onPress={() => toggleFilter(filter)}
          >
            <Text style={[
              styles.chipText,
              selectedFilters.includes(filter) && styles.chipTextSelected
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  scrollContent: {
    paddingRight: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipSelected: {
    backgroundColor: '#3B82F6',
    borderColor: '#0EA5E9',
  },
  chipText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
});