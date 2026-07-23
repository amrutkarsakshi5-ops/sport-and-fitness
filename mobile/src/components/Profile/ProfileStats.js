import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatCard from './StatCard';

const ProfileStats = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatCard icon="bookmark" count="24" label="Saved" color="#3B82F6" bg="#DBEAFE" onPress={() => navigation?.navigate('SavedListings')} />
      <StatCard icon="star" count="12" label="Reviews" color="#F59E0B" bg="#FEF3C7" onPress={() => navigation?.navigate('MyReviews')} />
      <StatCard icon="calendar" count="5" label="Events" color="#10B981" bg="#D1FAE5" onPress={() => navigation?.navigate('MyEvents')} />
      <StatCard icon="heart" count="38" label="Favorites" color="#EF4444" bg="#FEE2E2" onPress={() => navigation?.navigate('Favorites')} />
    </View>
  );
};
const styles = StyleSheet.create({ container: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, marginBottom: 24 } });
export default ProfileStats;