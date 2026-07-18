import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import api from '../../services/api';
import BusinessCard from '../../components/BusinessCard';

const BusinessListingScreen = ({ route, navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // route.params could hold categoryId if coming from CategoryCard
  const categoryId = route.params?.categoryId;

  useEffect(() => {
    // In a real app, you might pass ?category_id=... to filter via backend
    api.get('/businesses')
      .then(res => {
        console.log('BUSINESS LISTING DATA:', res.data);
        let data = res.data;
        if (categoryId) {
          data = data.filter(b => b.category_id === categoryId);
        }
        setBusinesses(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data. Please try again later.');
        setLoading(false);
      });
  }, [categoryId]);

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
    <View style={styles.container}>
      <FlatList
        data={businesses}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BusinessCard 
            business={item} 
            onPress={() => navigation.navigate('BusinessDetail', { id: item.id })} 
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No businesses available.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: { color: '#EF4444', fontSize: 16 },
  list: {
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#A0A0A0',
  }
});

export default BusinessListingScreen;
