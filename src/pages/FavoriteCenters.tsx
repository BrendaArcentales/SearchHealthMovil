import { IonContent, IonPage } from "@ionic/react";
import "./TabUserProfile.css";
import Favorites from "../components/Favorites";
import React from "react";
import Header from "../components/Header";

const FavoriteCenters: React.FC = () => {
  return (
    <IonPage>
      <Header pageName={"Favoritos"} />
      <IonContent>
        <Favorites />
      </IonContent>
    </IonPage>
  );
};

export default FavoriteCenters;
