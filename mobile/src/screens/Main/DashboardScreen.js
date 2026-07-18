import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DashboardScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: '1', label: 'Edit Profile', icon: 'person-outline', color: '#2563EB', bg: '#EFF6FF' },
    { id: '2', label: 'Favorites', icon: 'heart-outline', color: '#EF4444', bg: '#FEF2F2' },
    { id: '3', label: 'Payment Methods', icon: 'card-outline', color: '#F59E0B', bg: '#FFFBEB' },
    { id: '4', label: 'Settings', icon: 'settings-outline', color: '#64748B', bg: '#F1F5F9' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E3A5F', '#2563EB']} style={[styles.header, { paddingTop: Math.max(insets.top, 20) + 20 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.email ? user.email.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          <Text style={styles.name}>Fitness Enthusiast</Text>
          <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
          
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>{user?.role || 'Member'}</Text>
          </View>
        </View>

        <View style={styles.menuList}>
          {menuItems.map(item => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={[styles.iconWrap, { backgroundColor: item.bg }]}>
                <Ionicons name={item.icon} size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <View style={[styles.iconWrap, { backgroundColor: '#FEF2F2' }]}>
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            </View>
            <Text style={[styles.menuLabel, { color: '#EF4444' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 24, paddingBottom: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#ffffff', textAlign: 'center' },
  
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
  
  profileCard: { backgroundColor: '#ffffff', borderRadius: 24, padding: 24, alignItems: 'center', marginTop: -40, shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.05, shadowRadius: 10, elevation: 3, marginBottom: 24, borderWidth: 1, borderColor: '#E2E8F0' },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 4, borderColor: '#ffffff', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#ffffff' },
  name: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  email: { fontSize: 14, color: '#64748B', marginBottom: 12 },
  roleBadge: { backgroundColor: '#EFF6FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE' },
  roleText: { fontSize: 12, fontWeight: '700', color: '#1D4ED8', textTransform: 'uppercase' },

  menuList: { backgroundColor: '#ffffff', borderRadius: 20, padding: 8, borderWidth: 1, borderColor: '#E2E8F0', shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: '#F8FAFC' },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  menuLabel: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0F172A' },
});

export default DashboardScreen;
