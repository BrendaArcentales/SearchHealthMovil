import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

import Home from "./pages/Home";
const AuthenticatedApp = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/">
        <Home />
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
      <Route exact path="/centers/centerDetail/:id">
        <Home />
      </Route>
      <Route exact path="/centers/centerDetail/:id/map">
        <Home />
      </Route>
      <Route exact path="/centers/centerDetail/:id/comments">
        <Home />
      </Route>
      <Redirect to={"/"}></Redirect>
    </IonRouterOutlet>
  );
};

export default AuthenticatedApp;
