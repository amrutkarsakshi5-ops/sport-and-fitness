import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api';

const BusinessDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/businesses/${id}`)
      .then(res => {
        setBusiness(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load data.');
        setLoading(false);
      });
  }, [id]);

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

  if (!business) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Business not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop' }} 
            style={styles.image} 
          />
          <View style={styles.headerBtns}>
            <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={20} color="#0F172A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.circleBtn}>
              <Ionicons name="heart-outline" size={20} color="#0F172A" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{business.business_name}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={12} color="#F59E0B" />
              <Text style={styles.ratingText}> 4.8</Text>
            </View>
          </View>
          
          <Text style={styles.category}>Fitness Center • 0.5 mi</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            {business.description || "Welcome to our premium fitness center. We offer top-of-the-line equipment and professional trainers to help you achieve your goals."}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Services</Text>
          {business.services && business.services.length > 0 ? (
            business.services.map((service, idx) => (
              <View key={idx} style={styles.serviceCard}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDesc} numberOfLines={2}>{service.description}</Text>
                </View>
                <View style={styles.priceTag}>
                  <Text style={styles.servicePrice}>${service.price}</Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No services listed yet.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' },
  
  imageContainer: { position: 'relative', height: 280, width: '100%' },
  image: { width: '100%', height: '100%' },
  headerBtns: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  circleBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  
  content: { padding: 24, backgroundColor: '#ffffff', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', flex: 1, marginRight: 10 },
  ratingBadge: { flexDirection: 'row', backgroundColor: '#FFFBEB', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#FEF3C7' },
  ratingText: { color: '#D97706', fontSize: 13, fontWeight: '700' },
  category: { color: '#64748B', fontSize: 14, fontWeight: '500', marginBottom: 20 },
  
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 20 },
  
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  description: { fontSize: 15, color: '#475569', lineHeight: 24 },
  
  serviceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  serviceInfo: { flex: 1, marginRight: 16 },
  serviceName: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  serviceDesc: { fontSize: 13, color: '#64748B', lineHeight: 18 },
  priceTag: { backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10 },
  servicePrice: { fontSize: 15, fontWeight: '800', color: '#2563EB' },
  
  errorText: { color: '#EF4444', fontSize: 16 },
  emptyText: { color: '#94A3B8', fontStyle: 'italic', fontSize: 14 }
});

export default BusinessDetailScreen;
