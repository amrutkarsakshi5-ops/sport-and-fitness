import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const CustomInput = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType, error }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, isFocused && styles.inputFocused, error && styles.inputError]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0A0A0"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoCapitalize="none"
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#1E1E1E',
    marginBottom: 8,
    fontWeight: '600',
  },
  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  inputFocused: {
    borderColor: '#00D09E',
    backgroundColor: '#FFFFFF',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: '#FF4C4C',
  },
  input: {
    fontSize: 16,
    color: '#1E1E1E',
    height: '100%',
  },
  errorText: {
    color: '#FF4C4C',
    fontSize: 12,
    marginTop: 4,
  }
});

export default CustomInput;
