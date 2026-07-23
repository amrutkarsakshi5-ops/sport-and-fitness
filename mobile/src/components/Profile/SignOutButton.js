import React from 'react';
import { TouchableOpacity, Text, StyleSheet, PixelRatio, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

const SignOutButton = ({ onLogout }) => {
  const scale = PixelRatio.getFontScale();
  
  const handleSignOut = async () => {
    try {
      // 1. Clear all stored authentication data
      await AsyncStorage.clear();
      
      // 2. Sign out from Firebase
      await signOut(auth);
      
      // 3. Trigger the context logout to clean state and switch navigation to AuthStack (Login)
      if (onLogout) {
        await onLogout();
      }
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  const handlePress = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm('Are you sure you want to sign out?');
      if (confirmed) {
        handleSignOut();
      }
    } else {
      Alert.alert(
        'Sign Out',
        'Are you sure you want to sign out?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Sign Out', style: 'destructive', onPress: handleSignOut }
        ]
      );
    }
  };

  return (
    <TouchableOpacity 
      style={styles.button} 
      onPress={handlePress} 
      activeOpacity={0.7} 
      accessibilityRole="button"
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons name="log-out-outline" size={20 * scale} color="#EF4444" />
      <Text style={[styles.text, { fontSize: 16 * scale }]}>Sign Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#FEF2F2', 
    paddingVertical: 14, 
    borderRadius: 16, 
    marginHorizontal: 16, 
    marginBottom: 40, 
    borderWidth: 1, 
    borderColor: '#FCA5A5', 
    minHeight: 48,
    elevation: 2,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: { color: '#EF4444', fontWeight: '700', marginLeft: 8 },
});

export default SignOutButton;