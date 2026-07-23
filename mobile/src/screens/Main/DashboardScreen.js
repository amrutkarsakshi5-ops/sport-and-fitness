import React, { useContext } from 'react';
import { StyleSheet, ScrollView, Platform } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileHeader from '../../components/Profile/ProfileHeader';
import ProfileStats from '../../components/Profile/ProfileStats';
import AchievementSection from '../../components/Profile/AchievementSection';
import RecentActivity from '../../components/Profile/RecentActivity';
import AccountSection from '../../components/Profile/AccountSection';
import SignOutButton from '../../components/Profile/SignOutButton';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader user={user} navigation={navigation} />
        <ProfileStats navigation={navigation} />
        <AchievementSection navigation={navigation} />
        <RecentActivity navigation={navigation} />
        <AccountSection navigation={navigation} />
        <SignOutButton onLogout={logout} navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9FC' },
  scrollContent: { flexGrow: 1, paddingBottom: 100 },
});

export default DashboardScreen;
