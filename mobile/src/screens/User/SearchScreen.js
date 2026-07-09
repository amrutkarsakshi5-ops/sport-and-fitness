import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import BusinessCard from '../../components/BusinessCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/businesses')
      .then(res => {
        setBusinesses(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered(businesses);
    } else {
      const lower = query.toLowerCase();
      setFiltered(businesses.filter(b => b.business_name.toLowerCase().includes(lower)));
    }
  }, [query, businesses]);

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#A0A0A0" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#00D09E" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <BusinessCard 
              business={item} 
              onPress={() => navigation.navigate('BusinessDetail', { id: item.id })} 
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchHeader: {
    backgroundColor: '#ffffff',
    padding: 16,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
  },
  list: {
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#A0A0A0',
  }
});

export default SearchScreen;
