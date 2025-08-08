import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';


type AuthContextType = {
  user: FirebaseAuthTypes.User | null; 
  setUser: (user: FirebaseAuthTypes.User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const handleAuthStateChanged = useCallback((currentUser: FirebaseAuthTypes.User | null) => {
    setUser(currentUser);
    if (initializing) setInitializing(false);
  }, [initializing]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; 
  }, [handleAuthStateChanged]);

  if (initializing) return null;

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
