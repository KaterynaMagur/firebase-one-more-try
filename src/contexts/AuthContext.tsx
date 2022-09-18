import { createUserWithEmailAndPassword, onAuthStateChanged, User, UserCredential, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { TArgCallback, TCallback } from '../types';

type TAuthContext = {
  currentUser: User|null;
  signUp: TArgCallback<TSignUpData, Promise<UserCredential>>;
  logOut: TCallback<Promise<void>>;
  login: TArgCallback<TSignUpData, Promise<UserCredential>>;
}

const Error = "Promise not set";
const AuthContext = React.createContext<TAuthContext>({
  currentUser: null,
  signUp: () => new Promise((_, rej) => rej(Error)),
  logOut: () => new Promise((_, rej) => rej(Error)),
  login: () => new Promise((_, rej) => rej(Error))
});

export const useAuth = () => useContext(AuthContext);


type TSignUpData = { email: string; password: string; }
type TProps = { children?: React.ReactNode }

export const AuthProvider: React.FC<TProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = useCallback<TAuthContext['signUp']>(({ email, password }) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, []);
  const logOut = useCallback(() => {
    return signOut(auth);
  }, []);
  const login = useCallback<TAuthContext['login']>(({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  useEffect(() => {
    const callback = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return callback;
  }, []);

  return <AuthContext.Provider value={{
      currentUser,
      signUp,
      logOut,
      login
    }}>
    {!loading && children}
  </AuthContext.Provider>
}