import {
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonApp,
} from "@ionic/react";
import { listCircleOutline, personCircleOutline, star } from "ionicons/icons";
import TabCenters from "./TabCenters";
import TabUserProfile from "./TabUserProfile";
import CenterDetail from "./CenterDetail";
import { Redirect, Route } from "react-router-dom";
import "./Home.css";
import React from "react";
import { IonReactRouter } from "@ionic/react-router";
import FavoriteCenters from "./FavoriteCenters";
import ViewMap from "./ViewMap";
import ViewComments from "./ViewComments";
import Guide from "./Guide";
import EditComment from "../components/EditComment";
import EditProfile from "../components/EditProfile";

const Home: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to={"/centers"} />
            </Route>
            <Route exact path="/centers">
              <TabCenters />
            </Route>
            <Route exact path="/centerDetail/:id">
              <CenterDetail />
            </Route>
            <Route exact path="/comments/:id">
              <ViewComments />
            </Route>
            <Route exact path="/favorites">
              <FavoriteCenters />
            </Route>
            <Route exact path="/guide">
              <Guide />
            </Route>
            <Route exact path="/user">
              <TabUserProfile />
            </Route>
            <Route exact path="/map/:id">
              <ViewMap />
            </Route>
            <Route exact path="/editProfile">
              <EditProfile />
            </Route>
            <Route exact path="/newcomment/:data/:id">
              <EditComment />
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
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default Home;
