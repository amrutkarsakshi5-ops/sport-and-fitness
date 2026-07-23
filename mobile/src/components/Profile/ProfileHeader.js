import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, PixelRatio, Alert, ActivityIndicator, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '../../config/firebase';

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
      const filename = `avatars/${auth.currentUser?.uid || 'temp'}-${Date.now()}.jpg`;
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
export default memo(ProfileHeader);