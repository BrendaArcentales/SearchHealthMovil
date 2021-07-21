import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel, 
    IonButtons,
    IonBackButton
  } from "@ionic/react";
  import "./TabUserProfile.css";
  
  import React from "react";
  import { RouteComponentProps } from "react-router";

  interface Comment
  extends RouteComponentProps<{
    id: string;
  }> {}

  const ViewComments: React.FC <Comment>= ({match, history}) => {

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
        <IonLabel>IdCenter: {match.params.id}</IonLabel>
        </IonContent>
      </IonPage>
    );
  };
  
  export default ViewComments;