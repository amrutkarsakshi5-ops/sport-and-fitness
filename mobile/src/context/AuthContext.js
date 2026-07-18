import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for cached user role or token if needed
    const loadCachedUser = async () => {
      try {
        const cachedRole = await AsyncStorage.getItem('userRole');
        if (cachedRole && user) {
          setUser(prev => ({ ...prev, role: cachedRole }));
        }
      } catch (e) {
        console.error(e);
      }
    };
    loadCachedUser();
  }, []);

  useEffect(() => {
    // TEMP AUTH BYPASS - REMOVE AFTER IMPLEMENTING REAL AUTH
    if (__DEV__) {
      const loadMockUser = async () => {
        const cachedRole = await AsyncStorage.getItem('userRole');
        if (cachedRole) {
          setUser({
            uid: 'mock-dev-uid-123',
            email: 'dev@example.com',
            role: cachedRole
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      };
      loadMockUser();
      return () => {};
    }
    // END TEMP AUTH BYPASS

    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      if (authenticatedUser) {
        // Fetch role from backend/AsyncStorage here in a real app
        // We will just mock role extraction for this step.
        const role = await AsyncStorage.getItem('userRole') || 'user';
        setUser({
          uid: authenticatedUser.uid,
          email: authenticatedUser.email,
          role: role
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const loginContext = async (role) => {
    // TEMP AUTH BYPASS - REMOVE AFTER IMPLEMENTING REAL AUTH
    if (__DEV__) {
      await AsyncStorage.setItem('userRole', role);
      setUser({
        uid: 'mock-dev-uid-123',
        email: 'dev@example.com',
        role: role
      });
      return;
    }
    // END TEMP AUTH BYPASS

    await AsyncStorage.setItem('userRole', role);
  };

  const logout = async () => {
    setLoading(true);
    // TEMP AUTH BYPASS - REMOVE AFTER IMPLEMENTING REAL AUTH
    if (__DEV__) {
      await AsyncStorage.removeItem('userRole');
      setUser(null);
      setLoading(false);
      return;
    }
    // END TEMP AUTH BYPASS

    await signOut(auth);
    await AsyncStorage.removeItem('userRole');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginContext, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
