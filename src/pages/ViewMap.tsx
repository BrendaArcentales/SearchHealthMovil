import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import "./TabUserProfile.css";

import React from "react";

const ViewMap: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
        
          <IonButtons slot="start">
            <IonBackButton defaultHref="/centers" />
        
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        
      </IonContent>
    </IonPage>
  );
};

export default ViewMap;
