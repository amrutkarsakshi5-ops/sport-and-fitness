import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { LinearGradient } from 'expo-linear-gradient';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) return;
    
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created! Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <LinearGradient colors={['#ffffff', '#F0F9F7']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join us and discover local sports and fitness venues</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={errors.email}
            />
            
            <CustomInput
              label="Password"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={errors.password}
            />

            <Text style={styles.roleLabel}>I am a...</Text>
            <View style={styles.roleContainer}>
              <TouchableOpacity 
                style={[styles.roleCard, role === 'user' && styles.roleCardActive]} 
                onPress={() => setRole('user')}
              >
                <Text style={[styles.roleText, role === 'user' && styles.roleTextActive]}>User</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.roleCard, role === 'vendor' && styles.roleCardActive]} 
                onPress={() => setRole('vendor')}
              >
                <Text style={[styles.roleText, role === 'vendor' && styles.roleTextActive]}>Vendor</Text>
              </TouchableOpacity>
            </View>

            <CustomButton title="Sign Up" onPress={handleSignUp} loading={loading} style={{marginTop: 20}} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <CustomButton title="Log In" type="TERTIARY" onPress={() => navigation.navigate('Login')} />
          </View>

        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
  },
  form: {
    marginBottom: 20,
  },
  roleLabel: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 12,
    fontWeight: '600',
    marginTop: 10,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleCard: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#FFFFFF',
  },
  roleCardActive: {
    borderColor: '#00D09E',
    backgroundColor: '#E6F9F5',
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A0A0A0',
  },
  roleTextActive: {
    color: '#00D09E',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  footerText: {
    color: '#757575',
    fontSize: 14,
  }
});

export default SignUpScreen;
