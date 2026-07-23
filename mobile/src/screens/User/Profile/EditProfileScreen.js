import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../../config/firebase';
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
export default EditProfileScreen;