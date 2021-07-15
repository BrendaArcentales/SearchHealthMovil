import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Login from "./pages/login";
import Register from "./pages/register";
import Recover from "./pages/recover";

const UnauthenticatedApp = () => {
  return (
    <IonRouterOutlet id="main">
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/recover">
        <Recover />
      </Route>
      <Redirect to={"/login"} />
    </IonRouterOutlet>
  );
};

export default UnauthenticatedApp;
