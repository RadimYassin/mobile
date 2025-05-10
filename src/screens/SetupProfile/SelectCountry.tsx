import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// Sample country data
const countries = [
  { id: '1', name: 'Afghanistan', flag: '🇦🇫' },
  { id: '2', name: 'Albania', flag: '🇦🇱' },
  { id: '3', name: 'Algeria', flag: '🇩🇿' },
  { id: '4', name: 'Andorra', flag: '🇦🇩' },
  { id: '5', name: 'Angola', flag: '🇦🇴' },
  { id: '6', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { id: '7', name: 'Australia', flag: '🇦🇺' },
  { id: '8', name: 'Morocco', flag: '🇲🇦' },
];

const SelectCountryScreen = () => {
  const navigation = useNavigation();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderCountryItem = ({ item }: { item: { id: string; name: string; flag: string } }) => (
    <TouchableOpacity 
      style={styles.countryItem}
      onPress={() => setSelectedCountry(item.id as any)}
    >
      <View style={styles.flagContainer}>
        <Text style={styles.flag}>{item.flag}</Text>
      </View>
      <Text style={styles.countryName}>{item.name}</Text>
      <View style={styles.radioContainer}>
        <View style={[
          styles.radioOuter, 
          selectedCountry === item.id && styles.radioOuterSelected
        ]}>
          {selectedCountry === item.id && <View style={styles.radioInner} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
       <AntDesign name='search1' size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      
      <FlatList
        data={filteredCountries}
        renderItem={renderCountryItem}
        keyExtractor={item => item.id}
        style={styles.countryList}
      />
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedCountry && styles.continueButtonDisabled
          ]}
          onPress={() => navigation.navigate('PersonalInfo' as never)}
          disabled={!selectedCountry}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
    tintColor: '#8E8E93',
  },
  searchInput: {
    flex: 1,
    height: 36,
    fontSize: 16,
    color: '#000',
  },
  micIcon: {
    width: 16,
    height: 16,
    tintColor: '#007AFF',
  },
  countryList: {
    flex: 1,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  flagContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: 12,
  },
  flag: {
    fontSize: 20,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  radioContainer: {
    padding: 4,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D1D6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#007AFF',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007AFF',
  },
  footer: {
    margin: 30,
  },
  continueButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#B0D0FF',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SelectCountryScreen;