import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActivityCard from './ActivityCard';

const RecentActivity = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Recent Activity</Text>
      <ActivityCard icon="star" title="Reviewed Gold's Gym" description="5 stars - Great equipment!" date="2h ago" color="#F59E0B" bg="#FEF3C7" onPress={() => navigation?.navigate('ActivityDetails', { id: 1 })} />
      <ActivityCard icon="calendar" title="Joined Yoga Basics" description="Downtown Studio" date="Yesterday" color="#10B981" bg="#D1FAE5" onPress={() => navigation?.navigate('ActivityDetails', { id: 2 })} />
      <ActivityCard icon="bookmark" title="Saved CrossFit Austin" description="Added to favorites" date="2 days ago" color="#3B82F6" bg="#DBEAFE" onPress={() => navigation?.navigate('ActivityDetails', { id: 3 })} />
    </View>
  );
};
const styles = StyleSheet.create({ container: { paddingHorizontal: 16, marginBottom: 24 }, sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 12 } });
export default RecentActivity;