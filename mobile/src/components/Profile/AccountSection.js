import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountItem from './AccountItem';

const AccountSection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Account</Text>
      <View style={styles.card}>
        <AccountItem icon="bookmark-outline" label="Saved Listings" color="#3B82F6" bg="#DBEAFE" onPress={() => navigation?.navigate('SavedListings')} />
        <AccountItem icon="notifications-outline" label="Notifications" badgeCount="3" color="#F59E0B" bg="#FEF3C7" onPress={() => navigation?.navigate('Notifications')} />
        <AccountItem icon="settings-outline" label="Settings" color="#64748B" bg="#F1F5F9" onPress={() => navigation?.navigate('Settings')} />
        <AccountItem icon="help-buoy-outline" label="Help & Support" color="#10B981" bg="#D1FAE5" onPress={() => navigation?.navigate('HelpSupport')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({ container: { paddingHorizontal: 16, marginBottom: 24 }, sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 12 }, card: { backgroundColor: '#ffffff', borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: '#E2E8F0' } });
export default AccountSection;