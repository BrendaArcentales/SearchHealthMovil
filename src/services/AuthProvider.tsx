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

  const login = async (email: string, password: string) => {
    let authUser = await auth.signInWithEmailAndPassword(email, password);
    if (authUser) {
      setAuthValues({
        authenticated: true,
        user: { ...authUser },
      });
      await initialize();
      return Promise.resolve(true);
    } else {
      setAuthValues({
        authenticated: false,
        user: null,
      });
      return Promise.resolve(false);
    }
  };

  const logout = async () => {
    await auth.signOut();
    setAuthValues({
      authenticated: false,
      user: null,
    });
    return Promise.resolve(true);
  };

  const registerUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    let authUser = await auth.createUserWithEmailAndPassword(email, password);
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
        photo:
          "https://firebasestorage.googleapis.com/v0/b/search-health-ce2ca.appspot.com/o/users%2Fblank.png?alt=media&token=011f9092-4da2-4255-94aa-8daf997e0f1a",
        role: "Usuario",
      });
      await initialize();
      return Promise.resolve(true);
    } else {
      setAuthValues({
        user: null,
        authenticated: false,
      });
      return Promise.resolve(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    await auth.sendPasswordResetEmail(email);

    return Promise.resolve(true);
  };

  //initialize firebase when app starts
  const initialize = () => {
    return new Promise((resolve) => {
      let unsub = auth.onAuthStateChanged(async (authUser: any | null) => {
        if (authUser) {
          await db
            .collection("users")
            .doc(authUser.uid)
            .onSnapshot((querysSnapshot) => {
              setAuthValues({
                authenticated: true,
                user: { ...querysSnapshot.data() },
                userInfo: null,
                errors: null,
                initialized: true,
              });

              resolve(true);
            });
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
    registerUser,
    sendPasswordResetEmail,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};

export default Context;
