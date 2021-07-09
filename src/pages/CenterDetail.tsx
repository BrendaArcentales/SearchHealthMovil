import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonButtons,
  IonTitle,
  IonBackButton,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import "./CenterDetail.css";
import { medicalCenter } from "../modelo/medicalCenters";
import firebase from "firebase/app";
import { RouteComponentProps } from "react-router";
interface Medical
  extends RouteComponentProps<{
    id: string;
  }> {}

const CenterDetail: React.FC<Medical> = ({ match, history }) => {
  const [dataCenter, setDataCenter] = useState<any>([]);
  useEffect(() => {
    const getlistCenter = async () => {
      let list: medicalCenter[] = [];
      const res = await firebase
        .firestore()
        .collection("medicalCenters")
        .doc(match.params.id)
        .get();
      setDataCenter(res.data());
    };
    getlistCenter();
  }, []);

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
        <IonContent>
          {dataCenter ? (
            <IonCard>
              <img src={dataCenter.photo} />
              <IonCardHeader>
                <IonCardSubtitle>{dataCenter.sector}</IonCardSubtitle>
                <IonCardTitle>{dataCenter.name}</IonCardTitle>
                <IonCardSubtitle>{dataCenter.type}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                Horario de Atención:
                {dataCenter.start_time} - {dataCenter.end_time}
              </IonCardContent>
        
              <IonList>
                {dataCenter && dataCenter.specialties ? (
                  dataCenter.specialties.map((item: string) => {
                    return (
                      <IonItem>
                        <IonLabel>{item}</IonLabel>
                      </IonItem>
                    );
                  })
                ) : (
                  <IonLabel>No hay </IonLabel>
                )}
              </IonList>
            </IonCard>
          
          
          ) : (
            <IonLabel>No hay datos</IonLabel>
          )}
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CenterDetail;
