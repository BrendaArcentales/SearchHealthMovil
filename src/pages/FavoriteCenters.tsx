import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./TabUserProfile.css";
import Favorites from "../components/Favorites";
import React from "react";

const FavoriteCenters: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de Favoritos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Favorites />
      </IonContent>
    </IonPage>
  );
};

export default FavoriteCenters;
