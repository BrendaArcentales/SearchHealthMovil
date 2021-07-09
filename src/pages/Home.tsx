import {
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonRouterOutlet,
  IonApp,
} from "@ionic/react";
import {  logOut } from "ionicons/icons";
import AuthProvider from "../services/auth";
import { listCircleOutline, personCircleOutline} from 'ionicons/icons';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import { Redirect, Route } from 'react-router-dom';
import { toast } from "../toast";
import "./Home.css";
import React from "react";
import { useHistory } from "react-router";
import { IonReactRouter } from "@ionic/react-router";
import medicalCenter from "./medicalCenter";
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
          <Route exact path="/tab1"><Tab1/> </Route>
          <Route path="/tab1/medicalCenter/:id" component={medicalCenter}/>
          <Route exact path="/tab2" component={Tab2}/>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={listCircleOutline} />
            <IonLabel>Centros Médicos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={personCircleOutline} />
            <IonLabel>Perfil</IonLabel>
          </IonTabButton>
          <IonTabButton  >
            <IonIcon  onClick={onLogout} icon={logOut} />
            <IonLabel>Cerrar Sesión</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default Home;
