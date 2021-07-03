import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonIcon,
  IonLabel,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from "@ionic/react";
import { personAdd, logIn, ellipse } from "ionicons/icons";
import AuthProvider from "../services/auth";
import { toast } from "../toast";
import "./Home.css";
import React from "react";
import { useHistory } from "react-router";
const Home: React.FC = () => {
  const { logout } = React.useContext(AuthProvider);
  const history = useHistory();

  async function onLogout() {
    await logout();
    history.replace("/login");
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Search Health</IonCardTitle>
            <IonCardSubtitle>Pagina de inicio</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in
            awhile, and climb a mountain or spend a week in the woods. Wash your
            spirit clean.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonItem
            routerLink="/login"
            className="ion-activated"
            color="secondary"
          >
            <IonIcon icon={logIn} slot="start" />
            <IonLabel>Iniciar Sesión</IonLabel>
          </IonItem>
          <IonItem routerLink="/register">
            <IonIcon icon={personAdd} slot="start" />
            <IonLabel>Registrarse</IonLabel>
          </IonItem>
        </IonCard>
        <IonButton onClick={onLogout}>Cerrar Sesión</IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;
