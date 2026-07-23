import React, { memo } from 'react';
import { View, Text, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StatCard = ({ icon, count, label, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20 * scale} color={color} />
      </View>
      <Text style={[styles.count, { fontSize: 16 * scale }]}>{count}</Text>
      <Text style={[styles.label, { fontSize: 11 * scale }]} numberOfLines={1}>{label}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 10, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginHorizontal: 4, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.02, shadowRadius: 4, elevation: 1 },
  iconWrap: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  count: { fontWeight: '800', color: '#0F172A', marginBottom: 2 },
  label: { color: '#64748B', fontWeight: '500', textAlign: 'center' },
});
export default memo(StatCard);