import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const CustomButton = ({ title, onPress, loading, type = 'PRIMARY', style }) => {
  if (type === 'TERTIARY') {
    return (
      <TouchableOpacity style={[styles.tertiaryButton, style]} onPress={onPress} disabled={loading}>
        {loading ? <ActivityIndicator color="#00D09E" /> : <Text style={styles.tertiaryText}>{title}</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={loading} style={[styles.container, style]}>
      <LinearGradient
        colors={type === 'PRIMARY' ? ['#00D09E', '#009F75'] : ['#E6F9F5', '#E6F9F5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator color={type === 'PRIMARY' ? '#FFFFFF' : '#00D09E'} />
        ) : (
          <Text style={[styles.text, type === 'SECONDARY' && styles.textSecondary]}>
            {title}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  textSecondary: {
    color: '#00D09E',
  },
  tertiaryButton: {
    padding: 10,
    alignItems: 'center',
  },
  tertiaryText: {
    color: '#757575',
    fontWeight: '600',
  }
});

export default CustomButton;
