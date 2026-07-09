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
    await AsyncStorage.setItem('userRole', role);
  };

  const logout = async () => {
    setLoading(true);
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
