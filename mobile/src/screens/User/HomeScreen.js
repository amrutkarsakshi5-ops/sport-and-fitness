import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Platform } from 'react-native';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_CATEGORIES = [
  { id: 'm1', name: 'Gym' },
  { id: 'm2', name: 'Personal Trainer' },
  { id: 'm3', name: 'Yoga & Pilates' },
  { id: 'm4', name: 'CrossFit' },
  { id: 'm5', name: 'Sports Clubs' },
  { id: 'm6', name: 'Nutritionists' },
  { id: 'm7', name: 'Sports Coaches' },
];

const MOCK_BUSINESSES = [
  {
    id: 'b1',
    business_name: 'Iron Forge Gym',
    category_id: 'm1',
    rating: 4.8,
    reviews: 124,
    distance: '0.5 mi',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    tag: 'Top Rated'
  },
  {
    id: 'b2',
    business_name: 'Zenith Yoga Studio',
    category_id: 'm3',
    rating: 4.9,
    reviews: 89,
    distance: '1.2 mi',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop',
    tag: 'Popular'
  },
  {
    id: 'b3',
    business_name: 'Elite CrossFit',
    category_id: 'm4',
    rating: 4.7,
    reviews: 210,
    distance: '2.0 mi',
    isOpen: false,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop',
    tag: 'Trending'
  }
];

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

  const displayCategories = categories.length > 0 ? categories : MOCK_CATEGORIES;
  const displayBusinesses = businesses.length > 0 ? businesses : MOCK_BUSINESSES;

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

  const getCategoryIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('gym')) return { name: 'barbell-outline', color: '#2563EB', bg: '#EFF6FF' };
    if (lower.includes('trainer')) return { name: 'person-outline', color: '#22C55E', bg: '#F0FDF4' };
    if (lower.includes('yoga') || lower.includes('pilates')) return { name: 'leaf-outline', color: '#F59E0B', bg: '#FFF7ED' };
    if (lower.includes('crossfit')) return { name: 'flash-outline', color: '#A855F7', bg: '#FDF4FF' };
    if (lower.includes('club')) return { name: 'trophy-outline', color: '#059669', bg: '#ECFDF5' };
    if (lower.includes('nutrition')) return { name: 'restaurant-outline', color: '#EF4444', bg: '#FEF2F2' };
    if (lower.includes('coach')) return { name: 'whistle-outline', color: '#EA580C', bg: '#FFF7ED' };
    return { name: 'apps-outline', color: '#2563EB', bg: '#EFF6FF' };
  };

  const renderCategoryIcon = (iconData) => {
    // whistle-outline is not a valid ionicon in older versions, fallback to megaphone
    let iconName = iconData.name;
    if (iconName === 'whistle-outline') iconName = 'megaphone-outline';
    return (
      <View style={[styles.categoryIconWrap, { backgroundColor: iconData.bg }]}>
        <Ionicons name={iconName} size={22} color={iconData.color} />
      </View>
    );
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

        {/* Explore Categories (Horizontal Scroll) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {displayCategories.map((cat) => {
              const iconData = getCategoryIcon(cat.name);
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  style={styles.categoryCardHorizontal}
                  onPress={() => navigation.navigate('BusinessListing', { categoryId: cat.id })}
                >
                  {renderCategoryIcon(iconData)}
                  <Text style={styles.categoryNameHorizontal} numberOfLines={2}>{cat.name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Featured Near You (Horizontal Scroll) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessListing')} style={styles.rowCenter}>
              <Text style={styles.seeAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hScroll}>
            {displayBusinesses.map((biz) => {
              const catName = displayCategories.find(c => c.id === biz.category_id)?.name || 'Sports & Fitness';
              return (
                <TouchableOpacity 
                  key={biz.id} 
                  style={styles.featuredCard}
                  onPress={() => navigation.navigate('BusinessDetail', { id: biz.id })}
                >
                  <View style={styles.featuredImageWrap}>
                    <Image 
                      source={{ uri: biz.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' }} 
                      style={styles.featuredImage} 
                    />
                    <View style={styles.featuredTag}>
                      <Text style={styles.featuredTagText}>{biz.tag || 'Top Rated'}</Text>
                    </View>
                    <TouchableOpacity style={styles.heartBtn}>
                      <Ionicons name="heart-outline" size={18} color="#64748B" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.featuredBody}>
                    <Text style={styles.bizName} numberOfLines={1}>{biz.business_name}</Text>
                    <Text style={styles.bizCategory}>{catName}</Text>
                    
                    <View style={styles.bizRow}>
                      <View style={styles.rowCenter}>
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text style={styles.ratingText}> {biz.rating || '4.8'}</Text>
                      </View>
                      <View style={styles.rowCenter}>
                        <View style={[styles.statusDot, { backgroundColor: biz.isOpen !== false ? '#22C55E' : '#EF4444' }]} />
                        <Text style={[styles.statusText, { color: biz.isOpen !== false ? '#22C55E' : '#EF4444' }]}>
                          {biz.isOpen !== false ? 'Open' : 'Closed'}
                        </Text>
                      </View>
                    </View>

                    <View style={[styles.rowCenter, { marginTop: 6 }]}>
                      <Ionicons name="navigate-outline" size={12} color="#94A3B8" />
                      <Text style={styles.distanceText}> {biz.distance || '0.5 mi'}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {displayBusinesses.length === 0 && <Text style={styles.emptyText}>No businesses found.</Text>}
          </ScrollView>
        </View>

        {/* Popular Near You (Vertical List) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Near You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BusinessListing')}>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.vList}>
            {displayBusinesses.map((biz) => {
              const catName = displayCategories.find(c => c.id === biz.category_id)?.name || 'Sports & Fitness';
              return (
                <TouchableOpacity 
                  key={`pop-${biz.id}`} 
                  style={styles.compactCard}
                  onPress={() => navigation.navigate('BusinessDetail', { id: biz.id })}
                >
                  <Image 
                    source={{ uri: biz.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' }} 
                    style={styles.compactImage} 
                  />
                  <View style={styles.compactBody}>
                    <View style={styles.compactHeaderRow}>
                      <Text style={styles.bizNameCompact} numberOfLines={1}>{biz.business_name}</Text>
                      <View style={styles.rowCenter}>
                        <Ionicons name="star" size={12} color="#F59E0B" />
                        <Text style={styles.ratingTextCompact}> {biz.rating || '4.8'}</Text>
                      </View>
                    </View>
                    <Text style={styles.bizCategoryCompact}>{catName}</Text>
                    
                    <View style={styles.compactFooterRow}>
                      <View style={styles.rowCenter}>
                        <Ionicons name="navigate-outline" size={12} color="#94A3B8" />
                        <Text style={styles.distanceTextCompact}> {biz.distance || '0.5 mi'}</Text>
                      </View>
                      <View style={styles.rowCenter}>
                        <View style={[styles.statusDot, { backgroundColor: biz.isOpen !== false ? '#22C55E' : '#EF4444' }]} />
                        <Text style={[styles.statusTextCompact, { color: biz.isOpen !== false ? '#22C55E' : '#EF4444' }]}>
                          {biz.isOpen !== false ? 'Open' : 'Closed'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

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
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  seeAll: { fontSize: 13, color: '#2563EB', fontWeight: '600' },
  
  hScroll: { paddingHorizontal: 20, paddingBottom: 10 },
  categoryCardHorizontal: { alignItems: 'center', marginRight: 16, width: 70 },
  categoryIconWrap: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 8, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  categoryNameHorizontal: { fontSize: 11, fontWeight: '600', color: '#374151', textAlign: 'center' },

  featuredCard: { width: 220, backgroundColor: '#ffffff', borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden', marginRight: 16, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.04, shadowRadius: 10, elevation: 2 },
  featuredImageWrap: { position: 'relative' },
  featuredImage: { width: '100%', height: 130 },
  featuredTag: { position: 'absolute', top: 12, left: 12, backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10 },
  featuredTagText: { fontSize: 10, fontWeight: '700', color: '#ffffff' },
  heartBtn: { position: 'absolute', top: 10, right: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center' },
  featuredBody: { padding: 14 },
  bizName: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 },
  bizCategory: { fontSize: 12, color: '#64748B', fontWeight: '500', marginBottom: 10 },
  bizRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 4 },
  statusText: { fontSize: 12, fontWeight: '600' },
  distanceText: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  emptyText: { color: '#94A3B8', fontSize: 14, fontStyle: 'italic', paddingLeft: 20 },

  vList: { paddingHorizontal: 20 },
  compactCard: { flexDirection: 'row', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
  compactImage: { width: 80, height: 80, borderRadius: 12, marginRight: 14 },
  compactBody: { flex: 1, justifyContent: 'center' },
  compactHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  bizNameCompact: { fontSize: 15, fontWeight: '700', color: '#0F172A', flex: 1, marginRight: 8 },
  ratingTextCompact: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  bizCategoryCompact: { fontSize: 12, color: '#64748B', fontWeight: '500', marginBottom: 10 },
  compactFooterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  distanceTextCompact: { fontSize: 12, color: '#94A3B8', fontWeight: '500' },
  statusTextCompact: { fontSize: 12, fontWeight: '600' },
});

export default HomeScreen;
