import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/User/HomeScreen';
import CategoriesScreen from '../screens/User/CategoriesScreen';
import SearchScreen from '../screens/User/SearchScreen';
import BusinessListingScreen from '../screens/User/BusinessListingScreen';
import BusinessDetailScreen from '../screens/User/BusinessDetailScreen';
import DashboardScreen from '../screens/Main/DashboardScreen';

// Profile Destination Screens
import EditProfileScreen from '../screens/User/Profile/EditProfileScreen';
import SavedListingsScreen from '../screens/User/Profile/SavedListingsScreen';
import MyReviewsScreen from '../screens/User/Profile/MyReviewsScreen';
import MyEventsScreen from '../screens/User/Profile/MyEventsScreen';
import FavoritesScreen from '../screens/User/Profile/FavoritesScreen';
import NotificationsScreen from '../screens/User/Profile/NotificationsScreen';
import SettingsScreen from '../screens/User/Profile/SettingsScreen';
import HelpSupportScreen from '../screens/User/Profile/HelpSupportScreen';
import AchievementDetailsScreen from '../screens/User/Profile/AchievementDetailsScreen';
import ActivityDetailsScreen from '../screens/User/Profile/ActivityDetailsScreen';

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

// Stack for Profile tab
const ProfileStackNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="ProfileMain" component={DashboardScreen} />
    <HomeStack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: true, title: 'Edit Profile' }} />
    <HomeStack.Screen name="SavedListings" component={SavedListingsScreen} options={{ headerShown: true, title: 'Saved Listings' }} />
    <HomeStack.Screen name="MyReviews" component={MyReviewsScreen} options={{ headerShown: true, title: 'My Reviews' }} />
    <HomeStack.Screen name="MyEvents" component={MyEventsScreen} options={{ headerShown: true, title: 'My Events' }} />
    <HomeStack.Screen name="Favorites" component={FavoritesScreen} options={{ headerShown: true, title: 'Favorites' }} />
    <HomeStack.Screen name="Notifications" component={NotificationsScreen} options={{ headerShown: true, title: 'Notifications' }} />
    <HomeStack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true, title: 'Settings' }} />
    <HomeStack.Screen name="HelpSupport" component={HelpSupportScreen} options={{ headerShown: true, title: 'Help & Support' }} />
    <HomeStack.Screen name="AchievementDetails" component={AchievementDetailsScreen} options={{ headerShown: true, title: 'Achievement Details' }} />
    <HomeStack.Screen name="ActivityDetails" component={ActivityDetailsScreen} options={{ headerShown: true, title: 'Activity Details' }} />
    <HomeStack.Screen name="BusinessDetail" component={BusinessDetailScreen} options={{ headerShown: true, title: 'Details', headerTransparent: true }} />
  </HomeStack.Navigator>
);

const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#E2E8F0',
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.3,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Categories') iconName = focused ? 'grid' : 'grid-outline';
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Categories" component={CategoriesStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default UserTabNavigator;
