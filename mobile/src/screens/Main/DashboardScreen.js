import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

// This acts as the placeholder Home/Dashboard to show the logout functionality
const DashboardScreen = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <LinearGradient colors={['#ffffff', '#F0F9F7']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>You are successfully authenticated.</Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Email: {user?.email}</Text>
          <Text style={styles.infoText}>Role: {user?.role}</Text>
        </View>

        <CustomButton title="Log Out" onPress={logout} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#F8F9FA',
    width: '100%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginBottom: 8,
    fontWeight: '500',
  }
});

export default DashboardScreen;
