import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Recover from "./pages/recover";
import AuthProvider from "./services/auth";

const App: React.FC = () => {
  const { authValues, initialize } = React.useContext(AuthProvider);

  //Loading screen 
  const [showLoading, setShowLoading] = React.useState(true);

  React.useEffect(()=>{
    if(showLoading){
      //do initialize
      (async()=>{
        await initialize();
        setShowLoading(false);
      })();
    }
  }, [initialize, showLoading]);

  if(showLoading){
    return (
      <IonApp>
        <IonLoading message="Cargando Usuario ..." isOpen={showLoading} />
      </IonApp>
    )
  };

  return (
    <IonApp>
      {!authValues.authenticated ? (
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
          <Route
            path="/"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
          <Route
            path="*"
            render={() => <Redirect to="/login" />}
            exact={true}
          />
        </IonReactRouter>
      ) : (
        <IonReactRouter>
          <Route exact path="/">
            <Home />
          </Route>
          <Route
            path="/login"
            render={() => <Redirect to="/" />}
            exact={true}
          />
          <Route
            path="/recover"
            render={() => <Redirect to="/" />}
            exact={true}
          />
          <Route
            path="/register"
            render={() => <Redirect to="/" />}
            exact={true}
          />
        </IonReactRouter>
      )}
    </IonApp>
  );
};

export default App;
