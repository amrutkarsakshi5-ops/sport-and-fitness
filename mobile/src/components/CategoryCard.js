import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// A mapping of category names to ionic icons for visual flair since we don't have real images yet
const getIconForCategory = (name) => {
  const map = {
    'Gym': 'barbell-outline',
    'Yoga': 'body-outline',
    'Swimming': 'water-outline',
    'Martial Arts': 'hand-right-outline',
  };
  return map[name] || 'fitness-outline';
};

const CategoryCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIconForCategory(category.name)} size={32} color="#00D09E" />
      </View>
      <Text style={styles.title} numberOfLines={1}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: 10,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E6F9F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1E1E',
    textAlign: 'center',
  }
});

export default CategoryCard;
