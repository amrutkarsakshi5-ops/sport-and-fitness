import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import UserTabNavigator from './UserTabNavigator';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserTabs" component={UserTabNavigator} />
      {/* Later: Add VendorStack, AdminStack based on user role */}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
        <ActivityIndicator size="large" color="#00D09E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
