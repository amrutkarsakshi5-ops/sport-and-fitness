import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AccountItem = ({ icon, label, badgeCount, color, bg, onPress }) => {
  const scale = PixelRatio.getFontScale();
  let iconName = icon;
  if (iconName === 'help-buoy-outline') iconName = 'help-circle-outline';
  
  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={iconName} size={20 * scale} color={color} />
      </View>
      <Text style={[styles.label, { fontSize: 15 * scale }]} numberOfLines={1}>{label}</Text>
      {badgeCount && (
        <View style={styles.badge}>
          <Text style={[styles.badgeText, { fontSize: 11 * scale }]}>{badgeCount}</Text>
        </View>
      )}
      <Ionicons name="chevron-forward" size={20 * scale} color="#CBD5E1" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', minHeight: 48 },
  iconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  label: { flex: 1, fontWeight: '600', color: '#1E293B', marginRight: 8 },
  badge: { backgroundColor: '#EF4444', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10, marginRight: 12 },
  badgeText: { fontWeight: '700', color: '#ffffff' },
});
export default memo(AccountItem);