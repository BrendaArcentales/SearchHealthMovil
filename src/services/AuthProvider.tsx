import React from "react";
import { auth, db } from "../firebase/firebaseConfig";

export const Context = React.createContext<any>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [authValues, setAuthValues] = React.useState<any>({
    authenticated: false,
    user: null,
    userInfo: null,
    errors: null,
    initialized: false,
  });

  const login = (email: string, password: string) => {
    console.log(email, password);
    return new Promise(async (resolve) => {
      let authUser = await auth.signInWithEmailAndPassword(email, password);
      if (authUser) {
        setAuthValues({
          authenticated: true,
          user: { ...authUser },
        });
        resolve(true);
      } else {
        setAuthValues({
          authenticated: false,
          user: null,
        });
        resolve(false);
      }
    });
  };

  const logout = async () => {
    await auth.signOut();
    setAuthValues({
      authenticated: false,
      user: null,
    });
    return Promise.resolve(true);
  };

  const register = (email: string, password: string, displayName: string) => {
    console.log("valoes que entran ", email);
    return new Promise(async (resolve) => {
      try {
        let authUser = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        if (authUser) {
          setAuthValues({
            authenticated: true,
            user: { ...authUser },
          });
          const uidValue = authUser.user?.uid;
          await db.collection("users").doc(uidValue).set({
            email: email,
            name: displayName,
            uid: uidValue,
          });
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (e) {
        setAuthValues({
          user: null,
          authenticated: false,
          errors: { ...e },
        });
        resolve(false);
      }
    });
  };

  const sendPasswordResetEmail = async (email: string) => {
    await auth.sendPasswordResetEmail(email);

    return Promise.resolve(true);
  };

  //initialize firebase when app starts
  const initialize = () => {
    return new Promise((resolve) => {
      let unsub = auth.onAuthStateChanged(async (authUser: object | null) => {
        if (authUser) {
          setAuthValues({
            authenticated: true,
            user: authUser,
            userInfo: null,
            errors: null,
            initialized: true,
          });
          resolve(true);
        } else {
          setAuthValues({
            initialized: true,
          });
          resolve(false);
        }
        unsub();
      });
    });
  };

  let state = {
    authValues,
    initialize,
    login,
    logout,
    register,
    sendPasswordResetEmail,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;
