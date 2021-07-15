import React from "react";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { IonApp, IonLoading } from "@ionic/react";
import AuthProvider from "./services/AuthProvider";

const AuthApp: React.FC = () => {
  const { authValues, initialize } = React.useContext(AuthProvider);

  //Loading screen
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(() => {
    if (showLoading) {
      //do initialize
      (async () => {
        await initialize();
        setShowLoading(false);
      })();
    }
  }, [initialize, showLoading]);

  if (showLoading) {
    return (
      <IonApp>
        <IonLoading message="Cargando Usuario ..." isOpen={showLoading} />
      </IonApp>
    );
  }

  return !authValues.authenticated ? (
    <UnauthenticatedApp />
  ) : (
    <AuthenticatedApp />
  );
};

export default AuthApp;
