const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// 1. Update firebase.js
const firebasePath = path.join(srcDir, 'config', 'firebase.js');
let firebaseContent = fs.readFileSync(firebasePath, 'utf8');
if (!firebaseContent.includes('getStorage')) {
  firebaseContent = firebaseContent.replace(
    "import { getAuth } from 'firebase/auth';",
    "import { getAuth } from 'firebase/auth';\nimport { getStorage } from 'firebase/storage';"
  );
  firebaseContent += "\nexport const storage = getStorage(app);";
  fs.writeFileSync(firebasePath, firebaseContent);
}

// 2. ProfileHeader.js
const headerPath = path.join(srcDir, 'components', 'Profile', 'ProfileHeader.js');
let headerContent = `import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, PixelRatio, Alert, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../../config/firebase';

const ProfileHeader = ({ user, navigation }) => {
  const { width } = useWindowDimensions();
  const avatarSize = Math.min(width * 0.25, 120);
  const scale = PixelRatio.getFontScale();
  const [uploading, setUploading] = useState(false);
  const [localPhoto, setLocalPhoto] = useState(user?.photoURL);

  const handleEditAvatar = () => {
    Alert.alert(
      'Update Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => launchCamera() },
        { text: 'Choose from Gallery', onPress: () => launchGallery() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const launchCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need camera permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const launchGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Sorry, we need gallery permissions to make this work!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    setLocalPhoto(uri); // Show immediately
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = \`avatars/\${auth.currentUser?.uid || 'temp'}-\${Date.now()}.jpg\`;
      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, { photoURL: downloadURL });
      }
      setLocalPhoto(downloadURL);
      Alert.alert('Success', 'Profile picture updated successfully!');
    } catch (error) {
      Alert.alert('Upload Failed', error.message);
      setLocalPhoto(user?.photoURL); // Revert on failure
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={['#0F172A', '#1E3A5F', '#2563EB']} style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[styles.avatar, { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 }]}>
          {localPhoto ? (
            <Image source={{ uri: localPhoto }} style={{ width: '100%', height: '100%', borderRadius: avatarSize / 2 }} />
          ) : (
            <Text style={[styles.avatarText, { fontSize: avatarSize * 0.4 }]}>
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </Text>
          )}
          {uploading && (
            <View style={[StyleSheet.absoluteFill, styles.loadingOverlay, { borderRadius: avatarSize / 2 }]}>
              <ActivityIndicator size="small" color="#ffffff" />
            </View>
          )}
        </View>
        <View style={[styles.onlineIndicator, { bottom: avatarSize * 0.06, right: avatarSize * 0.06 }]} />
        <TouchableOpacity style={styles.editAvatarBtn} onPress={handleEditAvatar}>
          <Ionicons name="camera" size={16 * scale} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={[styles.name, { fontSize: 22 * scale }]}>{user?.displayName || 'Fitness Enthusiast'}</Text>
      <Text style={[styles.email, { fontSize: 14 * scale }]}>{user?.email || 'user@example.com'}</Text>
      
      <View style={styles.badgesRow}>
        <View style={styles.badge}>
          <Ionicons name="star" size={12 * scale} color="#F59E0B" />
          <Text style={[styles.badgeText, { fontSize: 12 * scale }]}>Premium Member</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editBtn} onPress={() => navigation?.navigate('EditProfile')}>
        <Text style={[styles.editBtnText, { fontSize: 14 * scale }]}>Edit Profile</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 16, paddingTop: 30, paddingBottom: 40, marginBottom: 24, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, width: '100%', position: 'relative', overflow: 'visible' },
  imageContainer: { position: 'relative', marginBottom: 16 },
  avatar: { backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: '#ffffff', shadowColor: '#000', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  avatarText: { fontWeight: '800', color: '#ffffff' },
  loadingOverlay: { backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  onlineIndicator: { position: 'absolute', width: 20, height: 20, borderRadius: 10, backgroundColor: '#22C55E', borderWidth: 3, borderColor: '#ffffff' },
  editAvatarBtn: { position: 'absolute', top: 0, right: -10, width: 32, height: 32, borderRadius: 16, backgroundColor: '#0F172A', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  name: { fontWeight: '800', color: '#ffffff', marginBottom: 4, textAlign: 'center' },
  email: { color: 'rgba(255, 255, 255, 0.8)', marginBottom: 16, textAlign: 'center' },
  badgesRow: { flexDirection: 'row', gap: 12, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, gap: 4 },
  badgeText: { fontWeight: '700', color: '#ffffff' },
  editBtn: { backgroundColor: '#ffffff', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0' },
  editBtnText: { fontWeight: '700', color: '#0F172A' },
});
export default memo(ProfileHeader);`;
fs.writeFileSync(headerPath, headerContent);

// 3. ProfileStats.js & StatCard.js
const statsPath = path.join(srcDir, 'components', 'Profile', 'ProfileStats.js');
const statsContent = `import React from 'react';
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
export default ProfileStats;`;
fs.writeFileSync(statsPath, statsContent);

const statCardPath = path.join(srcDir, 'components', 'Profile', 'StatCard.js');
const statCardContent = `import React, { memo } from 'react';
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, count, label, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20 * scale} color={color} />
      </View>
      <Text style={[styles.count, { fontSize: 16 * scale }]}>{count}</Text>
      <Text style={[styles.label, { fontSize: 11 * scale }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginHorizontal: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  count: { fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  label: { color: '#64748B', fontWeight: '500', textAlign: 'center' },
});
export default memo(StatCard);`;
fs.writeFileSync(statCardPath, statCardContent);

// 4. AchievementSection.js & AchievementCard.js
const achSectionPath = path.join(srcDir, 'components', 'Profile', 'AchievementSection.js');
const achSectionContent = `import React from 'react';
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
export default AchievementSection;`;
fs.writeFileSync(achSectionPath, achSectionContent);

const achCardPath = path.join(srcDir, 'components', 'Profile', 'AchievementCard.js');
const achCardContent = `import React, { memo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AchievementCard = ({ icon, title, color, bg, onPress }) => {
  const { width } = useWindowDimensions();
  const scale = PixelRatio.getFontScale();
  const cardWidth = Math.min(width * 0.3, 130);
  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24 * scale} color={color} />
      </View>
      <Text style={[styles.title, { fontSize: 12 * scale }]} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 12, minHeight: 48 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontWeight: '700', color: '#0F172A', textAlign: 'center' },
});
export default memo(AchievementCard);`;
fs.writeFileSync(achCardPath, achCardContent);

// 5. RecentActivity.js & ActivityCard.js
const recActPath = path.join(srcDir, 'components', 'Profile', 'RecentActivity.js');
const recActContent = `import React from 'react';
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
export default RecentActivity;`;
fs.writeFileSync(recActPath, recActContent);

const actCardPath = path.join(srcDir, 'components', 'Profile', 'ActivityCard.js');
const actCardContent = `import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ icon, title, description, date, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
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
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', minHeight: 48 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1, marginRight: 8 },
  title: { fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  description: { color: '#64748B' },
  right: { alignItems: 'flex-end', minWidth: 40 },
  date: { color: '#94A3B8', marginBottom: 4, fontWeight: '500' },
});
export default memo(ActivityCard);`;
fs.writeFileSync(actCardPath, actCardContent);

// 6. AccountSection.js
const accSecPath = path.join(srcDir, 'components', 'Profile', 'AccountSection.js');
const accSecContent = `import React from 'react';
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
export default AccountSection;`;
fs.writeFileSync(accSecPath, accSecContent);

const accItemPath = path.join(srcDir, 'components', 'Profile', 'AccountItem.js');
const accItemContent = `import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountItem = ({ icon, label, badgeCount, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  let iconName = icon;
  if (iconName === 'help-buoy-outline') iconName = 'help-circle-outline';
  
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
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
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', minHeight: 48 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontWeight: '600', color: '#1E293B', marginRight: 8 },
  badge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 12 },
  badgeText: { fontWeight: '700', color: '#ffffff' },
});
export default memo(AccountItem);`;
fs.writeFileSync(accItemPath, accItemContent);

// 7. SignOutButton.js
const signOutPath = path.join(srcDir, 'components', 'Profile', 'SignOutButton.js');
const signOutContent = `import React from 'react';
import { TouchableOpacity, Text, StyleSheet, PixelRatio, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SignOutButton = ({ onLogout }) => {
  const scale = PixelRatio.getFontScale();
  
  const handlePress = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: onLogout }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress} activeOpacity={0.7} accessibilityRole="button">
      <Ionicons name="log-out-outline" size={20 * scale} color="#EF4444" />
      <Text style={[styles.text, { fontSize: 16 * scale }]}>Sign Out</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FEF2F2', paddingVertical: 14, borderRadius: 16, marginHorizontal: 16, marginBottom: 24, borderWidth: 1, borderColor: '#FCA5A5', minHeight: 48 },
  text: { color: '#EF4444', fontWeight: '700', marginLeft: 8 },
});
export default SignOutButton;`;
fs.writeFileSync(signOutPath, signOutContent);

// 8. EditProfileScreen.js
const editProfilePath = path.join(srcDir, 'screens', 'User', 'Profile', 'EditProfileScreen.js');
const editProfileContent = `import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../../config/firebase';
import { updateProfile } from 'firebase/auth';

const EditProfileScreen = ({ navigation }) => {
  const user = auth.currentUser;
  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Full name cannot be empty.');
      return;
    }
    setSaving(true);
    try {
      if (user) {
        await updateProfile(user, { displayName: name });
        Alert.alert('Success', 'Profile updated successfully!');
        navigation.goBack();
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Doe" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address (Read Only)</Text>
          <TextInput style={[styles.input, styles.inputDisabled]} value={email} editable={false} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+1 234 567 8900" keyboardType="phone-pad" />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City / Address</Text>
          <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Austin, Texas" />
        </View>
        
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={saving}>
          {saving ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.saveBtnText}>Save Changes</Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { padding: 20 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#0F172A' },
  inputDisabled: { backgroundColor: '#F1F5F9', color: '#94A3B8' },
  saveBtn: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 24, minHeight: 48, justifyContent: 'center' },
  saveBtnText: { color: '#ffffff', fontWeight: '700', fontSize: 16 },
  cancelBtn: { paddingVertical: 14, alignItems: 'center', marginTop: 8, minHeight: 48, justifyContent: 'center' },
  cancelBtnText: { color: '#64748B', fontWeight: '600', fontSize: 16 },
});
export default EditProfileScreen;`;
fs.writeFileSync(editProfilePath, editProfileContent);

console.log('Successfully updated all components and wired navigation & image uploading!');
