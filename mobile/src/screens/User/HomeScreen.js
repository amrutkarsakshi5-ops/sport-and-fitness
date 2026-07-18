import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Platform } from 'react-native';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, busRes] = await Promise.all([
          api.get('/categories'),
          api.get('/businesses')
        ]);
        console.log('CATEGORIES DATA:', catRes.data);
        console.log('BUSINESSES DATA:', busRes.data);
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

  // Icons map based on Figma designs
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

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Header */}
        <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
          <View style={styles.headerRow}>
            <View>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={13} color="#2563EB" />
                <Text style={styles.locationLabel}>Your location</Text>
              </View>
              <View style={styles.locationRow}>
                <Text style={styles.locationValue}>Austin, Texas</Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.bellBtn}>
                <Ionicons name="notifications-outline" size={20} color="#0F172A" />
                <View style={styles.badge} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate('Profile')}>
                <Text style={styles.avatarText}>JD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Explore Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Explore Categories</Text>
              <Text style={styles.sectionSubtitle}>Tap a category to see all listings</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridContainer}>
            {categories.slice(0, 4).map((cat) => {
              const iconData = getCategoryIcon(cat.name);
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={styles.categoryCard}
                  onPress={() => navigation.navigate('BusinessListing', { categoryId: cat.id })}
                >
                  <View style={[styles.categoryIconWrap, { backgroundColor: iconData.bg }]}>
                    <Ionicons name={iconData.name} size={22} color={iconData.color} />
                  </View>
                  <Text style={styles.categoryName} numberOfLines={1}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Featured Near You (Horizontal Scroll) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessListing')} style={styles.rowCenter}>
              <Text style={styles.seeAll}>View all </Text>
              <Ionicons name="arrow-forward" size={13} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {businesses.slice(0, 5).map((biz) => (
              <TouchableOpacity 
                key={biz.id} 
                style={styles.featuredCard}
                onPress={() => navigation.navigate('BusinessDetail', { id: biz.id })}
              >
                <View style={styles.featuredImageWrap}>
                  <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' }} 
                    style={styles.featuredImage} 
                  />
                  <View style={styles.featuredTag}>
                    <Text style={styles.featuredTagText}>Top Rated</Text>
                  </View>
                  <TouchableOpacity style={styles.heartBtn}>
                    <Ionicons name="heart-outline" size={18} color="#64748B" />
                  </TouchableOpacity>
                </View>
                <View style={styles.featuredBody}>
                  <Text style={styles.bizName} numberOfLines={1}>{biz.business_name}</Text>
                  <Text style={styles.bizCategory}>{categories.find(c => c.id === biz.category_id)?.name || 'Fitness'}</Text>
                  
                  <View style={styles.bizRow}>
                    <View style={styles.rowCenter}>
                      <Ionicons name="star" size={12} color="#F59E0B" />
                      <Text style={styles.ratingText}> 4.8</Text>
                      <Text style={styles.reviewCount}> (124)</Text>
                    </View>
                    <View style={styles.rowCenter}>
                      <View style={[styles.statusDot, { backgroundColor: '#22C55E' }]} />
                      <Text style={[styles.statusText, { color: '#22C55E' }]}>Open</Text>
                    </View>
                  </View>

                  <View style={[styles.rowCenter, { marginTop: 6 }]}>
                    <Ionicons name="navigate-outline" size={12} color="#94A3B8" />
                    <Text style={styles.distanceText}> 0.5 mi</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {businesses.length === 0 && <Text style={styles.emptyText}>No businesses found.</Text>}
          </ScrollView>
        </View>

        {/* Community Banner */}
        <LinearGradient colors={['#1D4ED8', '#2563EB', '#3B82F6']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.banner}>
          <Text style={styles.bannerTitle}>Sports & Fitness Community</Text>
          <Text style={styles.bannerSubtitle}>Join 12,000+ active members</Text>
          
          <View style={styles.bannerStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>500+</Text>
              <Text style={styles.statLabel}>Gyms & Studios</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNum}>200+</Text>
              <Text style={styles.statLabel}>Trainers</Text>
            </View>
          </View>
        </LinearGradient>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8FAFC' },
  errorText: { color: '#EF4444', fontSize: 16 },
  rowCenter: { flexDirection: 'row', alignItems: 'center' },
  
  header: { backgroundColor: '#ffffff', paddingHorizontal: 20, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  locationLabel: { fontSize: 12, color: '#64748B', fontWeight: '500', marginLeft: 4 },
  locationValue: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginRight: 4 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center', marginRight: 10 },
  badge: { position: 'absolute', top: 8, right: 8, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#ffffff' },
  avatarBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 13, fontWeight: '700', color: '#ffffff' },

  section: { paddingTop: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 14 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  sectionSubtitle: { fontSize: 11, color: '#94A3B8', fontWeight: '500' },
  seeAll: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },
  categoryCard: { width: '23%', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, paddingVertical: 12, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1, marginBottom: 10 },
  categoryIconWrap: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  categoryName: { fontSize: 10, fontWeight: '600', color: '#374151', textAlign: 'center' },

  hScroll: { paddingHorizontal: 20, paddingBottom: 10 },
  featuredCard: { width: 220, backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginRight: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 12, elevation: 2 },
  featuredImageWrap: { position: 'relative' },
  featuredImage: { width: '100%', height: 130 },
  featuredTag: { position: 'absolute', top: 10, left: 10, backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 3, paddingHorizontal: 8 },
  featuredTagText: { fontSize: 10, fontWeight: '700', color: '#ffffff' },
  heartBtn: { position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  featuredBody: { padding: 12 },
  bizName: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  bizCategory: { fontSize: 11, color: '#64748B', fontWeight: '500', marginBottom: 8 },
  bizRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#0F172A' },
  reviewCount: { fontSize: 11, color: '#94A3B8' },
  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 4 },
  statusText: { fontSize: 11, fontWeight: '600' },
  distanceText: { fontSize: 11, color: '#94A3B8' },
  emptyText: { color: '#94A3B8', fontSize: 13, fontStyle: 'italic' },

  banner: { margin: 20, borderRadius: 20, padding: 20 },
  bannerTitle: { fontSize: 15, fontWeight: '700', color: '#ffffff', marginBottom: 4 },
  bannerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  bannerStats: { flexDirection: 'row', gap: 20 },
  statItem: { marginRight: 20 },
  statNum: { fontSize: 18, fontWeight: '800', color: '#ffffff', marginBottom: 2 },
  statLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)' },
});

export default HomeScreen;
