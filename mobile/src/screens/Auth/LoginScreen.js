import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginContext } = useContext(AuthContext);

  const handleLogin = async () => {
    if (__DEV__) {
      setLoading(true);
      setTimeout(async () => {
        await loginContext('user');
        setLoading(false);
      }, 500);
      return;
    }
    
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      await loginContext('user');
    } catch (error) {
      console.error('Login Failed', error);
      alert('Invalid email or password.');
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
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your fitness journey</Text>
      </LinearGradient>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <TouchableOpacity style={styles.googleButton} onPress={handleLogin}>
            <Ionicons name="logo-google" size={16} color="#DB4437" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>or with email & password</Text>
            <View style={styles.line} />
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
                placeholder="••••••••"
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

          <TouchableOpacity style={styles.forgotPass}>
            <Text style={styles.forgotPassText}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogin} style={styles.loginButton} disabled={loading}>
            <LinearGradient colors={['#1D4ED8', '#2563EB']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.loginGradient}>
              <Text style={styles.loginButtonText}>{loading ? 'Signing In...' : 'Sign In'}</Text>
              <Ionicons name="chevron-forward" size={17} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>New here? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.createAccountText}>Create account</Text>
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
  googleButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff', borderColor: '#E2E8F0', borderWidth: 1.5, borderRadius: 12, padding: 13, marginBottom: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  googleButtonText: { fontSize: 13, fontWeight: '600', color: '#0F172A', marginLeft: 10 },
  divider: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  line: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  dividerText: { fontSize: 11, color: '#94A3B8', marginHorizontal: 10 },
  field: { marginBottom: 14 },
  label: { fontSize: 11, fontWeight: '700', color: '#374151', marginBottom: 6, letterSpacing: 0.6 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFC', borderColor: '#E2E8F0', borderWidth: 1.5, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
  input: { flex: 1, fontSize: 14, color: '#0F172A', marginLeft: 10 },
  forgotPass: { alignItems: 'flex-end', marginTop: -6, marginBottom: 20 },
  forgotPassText: { fontSize: 12, fontWeight: '600', color: '#2563EB' },
  loginButton: { borderRadius: 14, overflow: 'hidden', marginBottom: 18, shadowColor: '#2563EB', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.35, shadowRadius: 14, elevation: 5 },
  loginGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 14 },
  loginButtonText: { fontSize: 15, fontWeight: '700', color: '#ffffff', marginRight: 6 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { fontSize: 13, color: '#64748B' },
  createAccountText: { fontSize: 13, fontWeight: '700', color: '#2563EB' }
});

export default LoginScreen;
