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

import React, {useEffect, useState} from "react";
import { RouteComponentProps } from "react-router";
import HomeContainer from "../components/Map/HomeContainer";
import useCenter from "../data/useCenter";

interface Comment
  extends RouteComponentProps<{
    id: string;
  }> {}

const ViewMap: React.FC <Comment>= ({match, history}) => {
    const [dataCenter] = useCenter(match.params.id);
    const [latitude, setLatitude] = useState(0);
    const [ longitude, setLongitude] = useState(0);
    const [ checkValues, setCheckValues] = useState(false);
    useEffect(()=>{
      if(dataCenter.location){
        setLatitude( parseFloat(dataCenter.location.latitude));
        setLongitude(parseFloat(dataCenter.location.longitude));
        setCheckValues(true);
      }
    }, [dataCenter]);

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
          {
              checkValues ?
                  <HomeContainer>{{lat: latitude, lng: longitude}}</HomeContainer>
                  :
                  <div>Cargando</div>
          }
      </IonContent>
    </IonPage>
  );
};

export default ViewMap;
