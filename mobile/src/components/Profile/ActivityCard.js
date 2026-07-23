import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ActivityCard = ({ icon, title, description, date, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={20 * scale} color={color} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: 14 * scale }]} numberOfLines={1}>{title}</Text>
        <Text style={[styles.description, { fontSize: 12 * scale }]} numberOfLines={1}>{description}</Text>
      </View>
      <View style={styles.right}>
        <Text style={[styles.date, { fontSize: 11 * scale }]}>{date}</Text>
        <Ionicons name="chevron-forward" size={16 * scale} color="#CBD5E1" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 16, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', minHeight: 48 },
  iconWrap: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  content: { flex: 1, marginRight: 8 },
  title: { fontWeight: '700', color: '#0F172A', marginBottom: 2 },
  description: { color: '#64748B' },
  right: { alignItems: 'flex-end', minWidth: 40 },
  date: { color: '#94A3B8', marginBottom: 4, fontWeight: '500' },
});
export default memo(ActivityCard);