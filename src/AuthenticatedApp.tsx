import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

import Home from "./pages/Home";
import Guide from "./pages/Guide";
import CenterDetail from "./pages/CenterDetail";
import ViewMap from "./pages/ViewMap";
import ViewComments from "./pages/ViewComments";
import EditComment from "./components/EditComment";
import EditProfile from "./components/EditProfile";
const AuthenticatedApp = () => {
  return (
    <IonReactRouter>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/guide">
        <Guide />
      </Route>
      <Route exact path="/centers">
        <Home />
      </Route>
      <Route exact path="/user">
        <Home />
      </Route>
      <Route exact path="/favorites">
        <Home />
      </Route>
      <Route exact path="/centerDetail/:id">
        <Home />
      </Route>
      <Route exact path="/map/:id">
        <Home />
      </Route>
      <Route exact path="/comments/:id">
        <Home />
      </Route>
      <Route exact path="/editProfile">
        <Home />
      </Route>
      <Route exact path="/newcomment/:data/:id">
        <Home />
      </Route>
      <Redirect to={"/"} />
    </IonReactRouter>
  );
};

export default AuthenticatedApp;
