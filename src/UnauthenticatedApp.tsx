import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Login from "./pages/login";
import Register from "./pages/register";
import Recover from "./pages/recover";
import Guide from "./pages/Guide";

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
        <Route exact path="/guide">
            <Guide />
        </Route>
      <Redirect to={"/guide"} />
    </IonRouterOutlet>
  );
};

export default UnauthenticatedApp;
