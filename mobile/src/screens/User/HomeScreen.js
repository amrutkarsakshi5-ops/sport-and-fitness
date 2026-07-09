import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import api from '../../services/api';
import CategoryCard from '../../components/CategoryCard';
import BusinessCard from '../../components/BusinessCard';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, busRes] = await Promise.all([
          api.get('/categories'),
          api.get('/businesses')
        ]);
        setCategories(catRes.data);
        setBusinesses(busRes.data);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00D09E" />
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#F0F9F7', '#ffffff']} style={styles.header}>
        <Text style={styles.headerTitle}>Find Your Next Activity</Text>
        <Text style={styles.headerSubtitle}>Discover fitness venues near you</Text>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.id} 
              category={cat} 
              onPress={() => navigation.navigate('BusinessListing', { categoryId: cat.id })} 
            />
          ))}
          {categories.length === 0 && <Text style={styles.emptyText}>No categories found.</Text>}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Businesses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('BusinessListing')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.listContainer}>
          {businesses.slice(0, 5).map((bus) => (
            <BusinessCard 
              key={bus.id} 
              business={bus} 
              onPress={() => navigation.navigate('BusinessDetail', { id: bus.id })} 
            />
          ))}
          {businesses.length === 0 && <Text style={styles.emptyText}>No businesses found.</Text>}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E1E1E',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  seeAll: {
    fontSize: 14,
    color: '#00D09E',
    fontWeight: '600',
  },
  hScroll: {
    paddingHorizontal: 24,
  },
  listContainer: {
    paddingHorizontal: 24,
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 16,
  },
  emptyText: {
    color: '#A0A0A0',
    fontSize: 14,
    fontStyle: 'italic',
  }
});

export default HomeScreen;
