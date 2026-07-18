import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Promise.all([api.get('/businesses'), api.get('/categories')])
      .then(([busRes, catRes]) => {
        setBusinesses(busRes.data);
        setFiltered(busRes.data);
        setCategories(catRes.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setFiltered(businesses);
    } else {
      const lower = query.toLowerCase();
      setFiltered(businesses.filter(b => b.business_name.toLowerCase().includes(lower)));
    }
  }, [query, businesses]);

  const renderBusiness = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('BusinessDetail', { id: item.id })}
    >
      <Image 
        source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=120&h=120&fit=crop' }} 
        style={styles.image} 
      />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.business_name}</Text>
        <Text style={styles.category}>{categories.find(c => c.id === item.category_id)?.name || 'Fitness'}</Text>
        
        <View style={styles.row}>
          <View style={styles.rowCenter}>
            <Ionicons name="star" size={11} color="#F59E0B" />
            <Text style={styles.rating}> 4.8</Text>
          </View>
          <Text style={styles.dot}>·</Text>
          <View style={styles.rowCenter}>
            <Ionicons name="navigate-outline" size={11} color="#94A3B8" />
            <Text style={styles.distance}> 0.5 mi</Text>
          </View>
          <Text style={styles.dot}>·</Text>
          <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
          <Text style={[styles.statusText, { color: '#22C55E' }]}>Open</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.searchHeader, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#94A3B8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search businesses..."
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" style={{ marginTop: 40 }} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={renderBusiness}
          ListEmptyComponent={<Text style={styles.emptyText}>No results found.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  searchHeader: { backgroundColor: '#ffffff', padding: 16, borderBottomWidth: 1, borderColor: '#E2E8F0' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', borderRadius: 14, paddingHorizontal: 14, height: 46, borderWidth: 1, borderColor: '#E2E8F0' },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 15, color: '#0F172A' },
  
  list: { padding: 20, paddingBottom: 100 },
  errorText: { color: '#EF4444', fontSize: 16, textAlign: 'center', marginTop: 40 },
  card: { flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#ffffff', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', marginBottom: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  image: { width: 60, height: 60, borderRadius: 14, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  category: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  row: { flexDirection: 'row', alignItems: 'center' },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  dot: { color: '#E2E8F0', marginHorizontal: 6 },
  distance: { fontSize: 12, color: '#64748B' },
  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#94A3B8', fontStyle: 'italic' }
});

export default SearchScreen;
