import React from "react";
import { IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";

import "./TabCenters.css";
import AllCenters from "../components/AllCenters";

const TabCenters: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de centros</IonTitle>
        </IonToolbar>
      </IonHeader>

      <AllCenters />
    </IonPage>
  );
};

export default TabCenters;
