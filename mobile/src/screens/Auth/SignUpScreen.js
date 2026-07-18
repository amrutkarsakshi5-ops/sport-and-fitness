import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { loginContext } = useContext(AuthContext);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (__DEV__) {
      setLoading(true);
      setTimeout(async () => {
        await loginContext('user');
        setLoading(false);
      }, 500);
      return;
    }
    
    if (!email || !password || !name) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Logic to save name/profile would go here
      await loginContext('user');
    } catch (error) {
      console.error('Registration Failed', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0F172A', '#1E3A5F', '#2563EB']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={17} color="#ffffff" />
          </TouchableOpacity>
          <View style={styles.iconWrapper}>
            <Ionicons name="barbell-outline" size={16} color="#ffffff" />
          </View>
          <Text style={styles.brandName}>Sports & Fitness Discovery Platform</Text>
        </View>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Step 1 — Your details & password</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.field}>
            <Text style={styles.label}>FULL NAME</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={16} color="#94A3B8" />
              <TextInput
                style={styles.input}
                placeholder="Jordan Davis"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={16} color="#94A3B8" />
              <TextInput
                style={styles.input}
                placeholder="you@email.com"
                placeholderTextColor="#94A3B8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={16} color="#94A3B8" />
              <TextInput
                style={styles.input}
                placeholder="Minimum 8 characters"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>CONFIRM PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={16} color="#94A3B8" />
              <TextInput
                style={styles.input}
                placeholder="Re-enter password"
                placeholderTextColor="#94A3B8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirm}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons name={showConfirm ? "eye-off-outline" : "eye-outline"} size={16} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={handleRegister} style={styles.loginButton} disabled={loading}>
            <LinearGradient colors={['#1D4ED8', '#2563EB']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.loginGradient}>
              <Text style={styles.loginButtonText}>{loading ? 'Creating...' : 'Create Account 🎉'}</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already registered? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.createAccountText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  headerTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  backButton: { width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  iconWrapper: { width: 32, height: 32, borderRadius: 9, backgroundColor: '#2563EB', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  brandName: { fontSize: 15, fontWeight: '800', color: '#ffffff' },
  title: { fontSize: 22, fontWeight: '800', color: '#ffffff', marginBottom: 5 },
  subtitle: { fontSize: 12, color: 'rgba(255,255,255,0.65)' },
  formContainer: { flex: 1, marginTop: -20, backgroundColor: '#ffffff', borderTopLeftRadius: 22, borderTopRightRadius: 22, paddingHorizontal: 20 },
  scrollContent: { paddingTop: 24, paddingBottom: 30 },
  field: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '700', color: '#374151', marginBottom: 6, letterSpacing: 0.6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
  input: { flex: 1, fontSize: 14, color: '#0F172A', marginLeft: 10 },
  loginButton: { borderRadius: 14, overflow: 'hidden', marginTop: 10, marginBottom: 18, shadowColor: '#2563EB', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.35, shadowRadius: 14, elevation: 5 },
  loginGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14 },
  loginButtonText: { fontSize: 15, fontWeight: '700', color: '#ffffff' },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 13, color: '#64748B' },
  createAccountText: { fontSize: 13, fontWeight: '700', color: '#2563EB' }
});

export default SignUpScreen;
