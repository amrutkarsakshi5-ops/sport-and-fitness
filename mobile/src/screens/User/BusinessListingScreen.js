import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import api from '../../services/api';
import BusinessCard from '../../components/BusinessCard';

const BusinessListingScreen = ({ route, navigation }) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  // route.params could hold categoryId if coming from CategoryCard
  const categoryId = route.params?.categoryId;

  useEffect(() => {
    // In a real app, you might pass ?category_id=... to filter via backend
    api.get('/businesses')
      .then(res => {
        // Mock filtering client-side for now if we had category association
        setBusinesses(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00D09E" />
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
