import React, {useContext, useState} from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { IonApp, IonLoading } from "@ionic/react";
import AuthProvider from "./services/AuthProvider";

const AuthApp: React.FC = () => {
  const  auth = useContext(AuthProvider);

  //Loading screen
  const [showLoading, setShowLoading] = useState(true);

  React.useEffect(() => {
    if (showLoading) {
      //do initialize
      (async () => {
        await auth.initialize();
        setShowLoading(false);
      })();
    }
  }, [auth.initialize, showLoading]);

  if (showLoading) {
    return (
      <IonApp>
        <IonLoading message="Cargando Usuario ..." isOpen={showLoading} />
      </IonApp>
    );
  }

  return !auth.authValues.authenticated ? (
    <UnauthenticatedApp />
  ) : (
    <AuthenticatedApp />
  );
};

export default AuthApp;
