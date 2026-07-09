import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';
import CustomButton from '../../components/CustomButton';

const BusinessDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/businesses/${id}`)
      .then(res => {
        setBusiness(res.data);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00D09E" />
      </View>
    );
  }

  if (!business) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Business not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={64} color="#A0A0A0" />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{business.business_name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFFFFF" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>
        
        <Text style={styles.category}>Fitness Center</Text>

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          {business.description || "No description provided."}
        </Text>

        <Text style={styles.sectionTitle}>Services</Text>
        {business.services && business.services.length > 0 ? (
          business.services.map((service, idx) => (
            <View key={idx} style={styles.serviceCard}>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDesc}>{service.description}</Text>
              </View>
              <Text style={styles.servicePrice}>${service.price}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No services listed yet.</Text>
        )}
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
  },
  imagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#ffffff',
    marginTop: -30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E1E1E',
    flex: 1,
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: '#00D09E',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
  category: {
    color: '#00D09E',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
    marginBottom: 30,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  serviceInfo: {
    flex: 1,
    marginRight: 16,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 14,
    color: '#757575',
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#00D09E',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 16,
  },
  emptyText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
  }
});

export default BusinessDetailScreen;
