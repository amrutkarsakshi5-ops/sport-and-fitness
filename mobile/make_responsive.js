const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'components', 'Profile');

const components = {
  'ProfileHeader.js': `import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileHeader = ({ user }) => {
  const { width } = useWindowDimensions();
  const avatarSize = Math.min(width * 0.25, 120); // Responsive avatar size
  const scale = PixelRatio.getFontScale();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
          <Text style={[styles.avatarText, { fontSize: avatarSize * 0.4 }]}>
            {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <View style={[styles.onlineIndicator, { bottom: avatarSize * 0.06, right: avatarSize * 0.06 }]} />
        <TouchableOpacity style={styles.editAvatarBtn}>
          <Ionicons name="camera" size={16 * scale} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.name, { fontSize: 22 * scale }]}>{user?.name || 'Fitness Enthusiast'}</Text>
      <Text style={[styles.email, { fontSize: 14 * scale }]}>{user?.email || 'user@example.com'}</Text>
      
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Ionicons name="star" size={12 * scale} color="#F59E0B" />
          <Text style={[styles.badgeText, { fontSize: 12 * scale }]}>{user?.role || 'Premium Member'}</Text>
        </View>
        <View style={[styles.badge, styles.dateBadge]}>
          <Ionicons name="calendar-outline" size={12 * scale} color="#64748B" />
          <Text style={[styles.dateText, { fontSize: 12 * scale }]}>Joined 2023</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editBtn}>
        <Text style={[styles.editBtnText, { fontSize: 14 * scale }]}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: -50, marginBottom: 24, paddingHorizontal: 16 },
  imageContainer: { position: 'relative', marginBottom: 16 },
  avatar: { backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#ffffff', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  avatarText: { fontWeight: '800', color: '#ffffff' },
  onlineIndicator: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#22C55E', borderWidth: 3, borderColor: '#ffffff' },
  editAvatarBtn: { position: 'absolute', top: 0, right: -10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  name: { fontWeight: '800', color: '#0F172A', marginBottom: 4, textAlign: 'center' },
  email: { color: '#64748B', marginBottom: 16, textAlign: 'center' },
  badgesRow: { flexDirection: 'row', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FEF3C7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4 },
  badgeText: { fontWeight: '700', color: '#D97706' },
  dateBadge: { backgroundColor: '#F1F5F9' },
  dateText: { fontWeight: '600', color: '#64748B' },
  editBtn: { backgroundColor: '#F8FAFC', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  editBtnText: { fontWeight: '700', color: '#0F172A' },
});

export default memo(ProfileHeader);`,

  'StatCard.js': `import React, { memo } from 'react';
import { View, Text, StyleSheet, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, count, label, color, bg }) => {
  const scale = PixelRatio.getFontScale();
  return (
    <View style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20 * scale} color={color} />
      </View>
      <Text style={[styles.count, { fontSize: 16 * scale }]}>{count}</Text>
      <Text style={[styles.label, { fontSize: 11 * scale }]} numberOfLines={1}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginHorizontal: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  count: { fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  label: { color: '#64748B', fontWeight: '500', textAlign: 'center' },
});

export default memo(StatCard);`,

  'AchievementCard.js': `import React, { memo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AchievementCard = ({ icon, title, color, bg }) => {
  const { width } = useWindowDimensions();
  const scale = PixelRatio.getFontScale();
  // Ensure card isn't too large on tablets, but fills horizontal space nicely on phones
  const cardWidth = Math.min(width * 0.3, 130);

  return (
    <View style={[styles.card, { width: cardWidth }]}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24 * scale} color={color} />
      </View>
      <Text style={[styles.title, { fontSize: 12 * scale }]} numberOfLines={2}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 12 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontWeight: '700', color: '#0F172A', textAlign: 'center' },
});

export default memo(AchievementCard);`,

  'ActivityCard.js': `import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ icon, title, description, date, color, bg }) => {
  const scale = PixelRatio.getFontScale();

  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20 * scale} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: 14 * scale }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.description, { fontSize: 12 * scale }]} numberOfLines={1}>{description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.date, { fontSize: 11 * scale }]}>{date}</Text>
        <Ionicons name="chevron-forward" size={16 * scale} color="#CBD5E1" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1, marginRight: 8 },
  title: { fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  description: { color: '#64748B' },
  right: { alignItems: 'flex-end', minWidth: 40 },
  date: { color: '#94A3B8', marginBottom: 4, fontWeight: '500' },
});

export default memo(ActivityCard);`,

  'AccountItem.js': `import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountItem = ({ icon, label, badgeCount, color, bg }) => {
  const scale = PixelRatio.getFontScale();
  let iconName = icon;
  if (iconName === 'help-buoy-outline') iconName = 'help-circle-outline';
  
  return (
    <TouchableOpacity style={styles.item} activeOpacity={0.7}>
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={iconName} size={20 * scale} color={color} />
      </View>
      <Text style={[styles.label, { fontSize: 15 * scale }]} numberOfLines={1}>{label}</Text>
      {badgeCount && (
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontSize: 11 * scale }]}>{badgeCount}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20 * scale} color="#CBD5E1" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontWeight: '600', color: '#1E293B', marginRight: 8 },
  badge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 12 },
  badgeText: { fontWeight: '700', color: '#ffffff' },
});

export default memo(AccountItem);`
};

for (const [filename, content] of Object.entries(components)) {
  fs.writeFileSync(path.join(dir, filename), content);
}
