import {
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonApp,
} from "@ionic/react";
import { logOut } from "ionicons/icons";
import AuthProvider from "../services/AuthProvider";
import { listCircleOutline, personCircleOutline, star } from "ionicons/icons";
import TabCenters from "./TabCenters";
import TabUserProfile from "./TabUserProfile";
import CenterDetail from "./CenterDetail";
import { Redirect, Route } from "react-router-dom";
import "./Home.css";
import React from "react";
import { useHistory } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import FavoriteCenters from "./FavoriteCenters";
import ViewMap from "./ViewMap";
import ViewComments from "./ViewComments";
const Home: React.FC = () => {
  const { logout } = React.useContext(AuthProvider);
  const history = useHistory();

  async function onLogout() {
    await logout();
    history.replace("/login");
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/centers">
              <TabCenters />
            </Route>
            <Route exact path="/user">
              <TabUserProfile />
            </Route>
            <Route exact path="/favorites">
              <FavoriteCenters />
            </Route>
            <Route
              exact
              path="/centers/centerDetail/:id"
              component={CenterDetail}
            />
            <Route
              exact
              path="/centers/centerDetail/:id/map"
              component={ViewMap}
            />
            <Route
              exact
              path="/centers/centerDetail/:id/comments"
              component={ViewComments}
            />
            <Route exact path="/">
              <Redirect to="/centers" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="centers" href="/centers">
              <IonIcon icon={listCircleOutline} />
              <IonLabel>Centros Médicos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="favorites" href="/favorites">
              <IonIcon icon={star} />
              <IonLabel>Favoritos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="user" href="/user">
              <IonIcon icon={personCircleOutline} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton>
            <IonTabButton>
              <IonIcon onClick={onLogout} icon={logOut} />
              <IonLabel>Cerrar Sesión</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
