import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={['#ffffff', '#E6F9F5']} style={styles.container}>
      <View style={styles.imageContainer}>
        {/* Placeholder for an impressive illustration */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>🏃‍♂️🏋️‍♀️🚴‍♂️</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Discover Your Fitness Journey</Text>
        <Text style={styles.subtitle}>
          Find the best gyms, exclusive classes, and sports venues right in your neighborhood.
        </Text>
      </View>
      
      <View style={styles.footer}>
        <CustomButton 
          title="Get Started" 
          onPress={() => navigation.navigate('SignUp')} 
        />
        <CustomButton 
          title="Log In" 
          type="SECONDARY" 
          onPress={() => navigation.navigate('Login')} 
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  imagePlaceholder: {
    width: 280,
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  imageText: {
    fontSize: 64,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1E1E1E',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  footer: {
    width: '100%',
    paddingBottom: 20,
  }
});

export default WelcomeScreen;
