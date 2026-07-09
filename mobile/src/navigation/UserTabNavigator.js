import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/User/HomeScreen';
import CategoriesScreen from '../screens/User/CategoriesScreen';
import SearchScreen from '../screens/User/SearchScreen';
import BusinessListingScreen from '../screens/User/BusinessListingScreen';
import BusinessDetailScreen from '../screens/User/BusinessDetailScreen';
import DashboardScreen from '../screens/Main/DashboardScreen'; // Reused for profile/logout for now

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

// Stack for Home tab to allow navigation to details
const HomeStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="HomeMain" component={HomeScreen} />
    <HomeStack.Screen name="BusinessListing" component={BusinessListingScreen} options={{ headerShown: true, title: 'Businesses' }} />
    <HomeStack.Screen name="BusinessDetail" component={BusinessDetailScreen} options={{ headerShown: true, title: 'Details', headerTransparent: true }} />
  </HomeStack.Navigator>
);

// Stack for Categories tab
const CategoriesStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="CategoriesMain" component={CategoriesScreen} options={{ headerShown: true, title: 'Categories' }} />
    <HomeStack.Screen name="BusinessListing" component={BusinessListingScreen} options={{ headerShown: true, title: 'Businesses' }} />
    <HomeStack.Screen name="BusinessDetail" component={BusinessDetailScreen} options={{ headerShown: true, title: 'Details', headerTransparent: true }} />
  </HomeStack.Navigator>
);

// Stack for Search tab
const SearchStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="SearchMain" component={SearchScreen} />
    <HomeStack.Screen name="BusinessDetail" component={BusinessDetailScreen} options={{ headerShown: true, title: 'Details', headerTransparent: true }} />
  </HomeStack.Navigator>
);

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00D09E',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Categories') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={24} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Categories" component={CategoriesStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Profile" component={DashboardScreen} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
