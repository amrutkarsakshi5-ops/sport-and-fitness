import React, { memo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, PixelRatio, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AchievementCard = ({ icon, title, color, bg, onPress }) => {
  const { width } = useWindowDimensions();
  const scale = PixelRatio.getFontScale();
  const cardWidth = Math.min(width * 0.3, 130);
  return (
    <TouchableOpacity style={[styles.card, { width: cardWidth }]} onPress={onPress} activeOpacity={0.7} accessibilityRole="button">
      <View style={[styles.iconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon} size={24 * scale} color={color} />
      </View>
      <Text style={[styles.title, { fontSize: 12 * scale }]} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: { backgroundColor: '#ffffff', borderRadius: 16, padding: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', marginRight: 12, minHeight: 48 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  title: { fontWeight: '700', color: '#0F172A', textAlign: 'center' },
});
export default memo(AchievementCard);