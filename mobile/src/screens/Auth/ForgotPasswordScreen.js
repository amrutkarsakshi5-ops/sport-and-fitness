import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import { LinearGradient } from 'expo-linear-gradient';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return;
    }
    setError('');
    
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email Sent', 'We have sent a password reset link to your email address.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <LinearGradient colors={['#ffffff', '#F0F9F7']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your email address to receive a password reset link.</Text>
          </View>

          <View style={styles.form}>
            <CustomInput
              label="Email Address"
              placeholder="Enter your registered email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              error={error}
            />

            <CustomButton title="Send Reset Link" onPress={handleReset} loading={loading} style={{marginTop: 10}} />
          </View>

          <View style={styles.footer}>
            <CustomButton title="Back to Log In" type="TERTIARY" onPress={() => navigation.goBack()} />
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
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E1E1E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    lineHeight: 24,
  },
  form: {
    marginBottom: 40,
  },
  footer: {
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  }
});

export default ForgotPasswordScreen;
