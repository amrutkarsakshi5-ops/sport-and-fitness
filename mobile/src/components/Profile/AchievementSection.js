import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AchievementCard from './AchievementCard';

const AchievementSection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Achievements</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AchievementCard icon="trophy" title="Power User" color="#F59E0B" bg="#FEF3C7" onPress={() => navigation?.navigate('AchievementDetails', { title: 'Power User' })} />
        <AchievementCard icon="chatbubbles" title="Top Reviewer" color="#3B82F6" bg="#DBEAFE" onPress={() => navigation?.navigate('AchievementDetails', { title: 'Top Reviewer' })} />
        <AchievementCard icon="flame" title="Event Goer" color="#EF4444" bg="#FEE2E2" onPress={() => navigation?.navigate('AchievementDetails', { title: 'Event Goer' })} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({ container: { marginBottom: 24 }, sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', paddingHorizontal: 16, marginBottom: 12 }, scrollContent: { paddingHorizontal: 16 } });
export default AchievementSection;