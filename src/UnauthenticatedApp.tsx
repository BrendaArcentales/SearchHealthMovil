import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/login";
import Register from "./pages/register";
import Recover from "./pages/recover";
import Guide from "./pages/Guide";

const UnauthenticatedApp = () => {
  return (
    <IonReactRouter>
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
    </IonReactRouter>
  );
};

export default UnauthenticatedApp;
