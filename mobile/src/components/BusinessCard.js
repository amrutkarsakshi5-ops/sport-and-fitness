import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BusinessCard = ({ business, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Fallback image if none provided */}
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={48} color="#A0A0A0" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={1}>{business.business_name}</Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#FFFFFF" />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>

        <Text style={styles.category} numberOfLines={1}>Fitness Center</Text>
        
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color="#757575" />
          <Text style={styles.address} numberOfLines={1}>123 Sports Ave, City</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
  },
  imagePlaceholder: {
    height: 160,
    width: '100%',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1E1E1E',
    flex: 1,
    marginRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: '#00D09E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  category: {
    color: '#00D09E',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    color: '#757575',
    fontSize: 13,
    marginLeft: 4,
    flex: 1,
  }
});

export default BusinessCard;
