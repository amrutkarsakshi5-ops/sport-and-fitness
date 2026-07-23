const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components', 'Profile');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const components = {
  'ProfileHeader.js': `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileHeader = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.email ? user.email.charAt(0).toUpperCase() : 'U'}</Text>
        </View>
        <View style={styles.onlineIndicator} />
        <TouchableOpacity style={styles.editAvatarBtn}>
          <Ionicons name="camera" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>{user?.name || 'Fitness Enthusiast'}</Text>
      <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
      
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Ionicons name="star" size={12} color="#F59E0B" />
          <Text style={styles.badgeText}>{user?.role || 'Premium Member'}</Text>
        </View>
        <View style={[styles.badge, styles.dateBadge]}>
          <Ionicons name="calendar-outline" size={12} color="#64748B" />
          <Text style={styles.dateText}>Joined 2023</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: -50, marginBottom: 24 },
  imageContainer: { position: 'relative', marginBottom: 16 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#ffffff', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  avatarText: { fontSize: 40, fontWeight: '800', color: '#ffffff' },
  onlineIndicator: { position: 'absolute', bottom: 6, right: 6, width: 20, height: 20, borderRadius: 10, backgroundColor: '#22C55E', borderWidth: 3, borderColor: '#ffffff' },
  editAvatarBtn: { position: 'absolute', top: 0, right: -10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  name: { fontSize: 22, fontWeight: '800', color: '#0F172A', marginBottom: 4 },
  email: { fontSize: 14, color: '#64748B', marginBottom: 16 },
  badgesRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#D97706' },
  dateBadge: { backgroundColor: '#F1F5F9' },
  dateText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  editBtn: { backgroundColor: '#F8FAFC', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  editBtnText: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
});

export default ProfileHeader;`,
  'StatCard.js': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, count, label, color, bg }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.count}>{count}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginHorizontal: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  count: { fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  label: { fontSize: 11, color: '#64748B', fontWeight: '500' },
});

export default StatCard;`,
  'ProfileStats.js': `import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatCard from './StatCard';

const ProfileStats = () => {
  return (
    <View style={styles.container}>
      <StatCard icon="bookmark" count="12" label="Saved" color="#2563EB" bg="#EFF6FF" />
      <StatCard icon="star" count="8" label="Reviews" color="#F59E0B" bg="#FFFBEB" />
      <StatCard icon="calendar" count="5" label="Events" color="#10B981" bg="#ECFDF5" />
      <StatCard icon="heart" count="18" label="Favorites" color="#EF4444" bg="#FEF2F2" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 24 },
});

export default ProfileStats;`,
  'AchievementCard.js': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AchievementCard = ({ icon, title, color, bg }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { width: 110, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontSize: 12, fontWeight: '700', color: '#0F172A', textAlign: 'center' },
});

export default AchievementCard;`,
  'AchievementSection.js': `import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AchievementCard from './AchievementCard';

const AchievementSection = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Achievement Badges</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <AchievementCard icon="flash" title="Power User" color="#8B5CF6" bg="#F5F3FF" />
        <AchievementCard icon="medal" title="Top Reviewer" color="#F59E0B" bg="#FFFBEB" />
        <AchievementCard icon="ticket" title="Event Goer" color="#10B981" bg="#ECFDF5" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  header: { paddingHorizontal: 20, marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  scrollContent: { paddingHorizontal: 20 },
});

export default AchievementSection;`,
  'ActivityCard.js': `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ icon, title, description, date, color, bg }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <Text style={styles.description} numberOfLines={1}>{description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.date}>{date}</Text>
        <Ionicons name="chevron-forward" size={16} color="#CBD5E1" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1, marginRight: 12 },
  title: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  description: { fontSize: 12, color: '#64748B' },
  right: { alignItems: 'flex-end' },
  date: { fontSize: 11, color: '#94A3B8', marginBottom: 4, fontWeight: '500' },
});

export default ActivityCard;`,
  'RecentActivity.js': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ActivityCard from './ActivityCard';

const RecentActivity = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Activity</Text>
      <ActivityCard icon="star" title="Reviewed Iron Forge Gym" description="Left a 5-star review" date="2d ago" color="#F59E0B" bg="#FFFBEB" />
      <ActivityCard icon="bookmark" title="Saved Zenith Yoga" description="Added to saved listings" date="5d ago" color="#2563EB" bg="#EFF6FF" />
      <ActivityCard icon="calendar" title="Joined Yoga Retreat" description="RSVP confirmed for event" date="1w ago" color="#10B981" bg="#ECFDF5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 24 },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
});

export default RecentActivity;`,
  'AccountItem.js': `import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountItem = ({ icon, label, badgeCount, color, bg }) => {
  // Use a fallback icon for help-buoy-outline if missing in some Ionicons versions
  let iconName = icon;
  if (iconName === 'help-buoy-outline') iconName = 'help-circle-outline';
  
  return (
    <TouchableOpacity style={styles.item}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={iconName} size={20} color={color} />
      </View>
      <Text style={styles.label}>{label}</Text>
      {badgeCount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badgeCount}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontSize: 15, fontWeight: '600', color: '#1E293B' },
  badge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 12 },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#ffffff' },
});

export default AccountItem;`,
  'AccountSection.js': `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AccountItem from './AccountItem';

const AccountSection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.card}>
        <AccountItem icon="bookmark-outline" label="Saved Listings" badgeCount="12" color="#2563EB" bg="#EFF6FF" />
        <AccountItem icon="star-outline" label="My Reviews" badgeCount="8" color="#F59E0B" bg="#FFFBEB" />
        <AccountItem icon="calendar-outline" label="My Events" badgeCount="3" color="#10B981" bg="#ECFDF5" />
        <AccountItem icon="notifications-outline" label="Notifications" badgeCount="2" color="#8B5CF6" bg="#F5F3FF" />
        <AccountItem icon="settings-outline" label="Settings" color="#64748B" bg="#F1F5F9" />
        <AccountItem icon="help-buoy-outline" label="Help & Support" color="#0EA5E9" bg="#F0F9FF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginBottom: 24 },
  title: { fontSize: 17, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  card: { backgroundColor: '#ffffff', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: '#E2E8F0' },
});

export default AccountSection;`,
  'SignOutButton.js': `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignOutButton = ({ onLogout }) => {
  const handlePress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Ionicons name="log-out-outline" size={20} color="#EF4444" style={styles.icon} />
      <Text style={styles.text}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { marginHorizontal: 20, marginBottom: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, borderRadius: 16, borderWidth: 1, borderColor: '#EF4444', backgroundColor: '#FEF2F2' },
  icon: { marginRight: 8 },
  text: { fontSize: 15, fontWeight: '700', color: '#EF4444' },
});

export default SignOutButton;`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(dir, filename), content);
}
