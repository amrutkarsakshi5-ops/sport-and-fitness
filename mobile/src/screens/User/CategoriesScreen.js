import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    api.get('/categories')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, []);

  const getCategoryIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'gym': return { name: 'barbell-outline', color: '#2563EB', bg: '#EFF6FF' };
      case 'personal trainer': return { name: 'person-outline', color: '#22C55E', bg: '#F0FDF4' };
      case 'yoga': return { name: 'leaf-outline', color: '#F59E0B', bg: '#FFF7ED' };
      case 'crossfit': return { name: 'flash-outline', color: '#A855F7', bg: '#FDF4FF' };
      case 'swimming': return { name: 'water-outline', color: '#059669', bg: '#ECFDF5' };
      case 'martial arts': return { name: 'hand-left-outline', color: '#EF4444', bg: '#FEF2F2' };
      default: return { name: 'apps-outline', color: '#2563EB', bg: '#EFF6FF' };
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
        <Text style={styles.headerTitle}>All Categories</Text>
        <Text style={styles.headerSubtitle}>Find what moves you</Text>
      </View>
      
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const iconData = getCategoryIcon(item.name);
          return (
            <TouchableOpacity 
              style={styles.categoryCard}
              onPress={() => navigation.navigate('BusinessListing', { categoryId: item.id })}
            >
              <View style={[styles.categoryIconWrap, { backgroundColor: iconData.bg }]}>
                <Ionicons name={iconData.name} size={28} color={iconData.color} />
              </View>
              <Text style={styles.categoryName} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text style={styles.emptyText}>No categories available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  errorText: { color: '#EF4444', fontSize: 16 },
  header: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  headerSubtitle: { fontSize: 13, color: '#64748B' },
  list: { padding: 16, paddingBottom: 100 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  categoryCard: { width: '31%', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 16, paddingHorizontal: 8, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  categoryIconWrap: { width: 56, height: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  categoryName: { fontSize: 12, fontWeight: '600', color: '#374151', textAlign: 'center' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#94A3B8', fontStyle: 'italic' }
});

export default CategoriesScreen;
