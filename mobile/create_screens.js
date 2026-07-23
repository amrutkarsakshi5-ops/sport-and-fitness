const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'src', 'screens', 'User', 'Profile');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const screens = [
  'EditProfileScreen',
  'SavedListingsScreen',
  'MyReviewsScreen',
  'MyEventsScreen',
  'FavoritesScreen',
  'NotificationsScreen',
  'SettingsScreen',
  'HelpSupportScreen',
  'AchievementDetailsScreen',
  'ActivityDetailsScreen'
];

screens.forEach(screen => {
  const content = `import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ${screen} = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>${screen}</Text>
        <Text style={styles.subtitle}>This screen is coming soon.</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#64748B' },
});

export default ${screen};`;

  fs.writeFileSync(path.join(dir, `${screen}.js`), content);
});
