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
  IonBackButton,
  IonItem,
  IonLabel,
  IonList,
} from "@ionic/react";
import "./medicalCenter.css";
import { RouteComponentProps } from "react-router";
import firebase from "firebase/app";
import { medicalCenter } from "../modelo/medicalCenters";
interface medical
  extends RouteComponentProps<{
    id: string;
  }> {}

const Medical: React.FunctionComponent<medical> = ({ match, history }) => {
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

  console.log("Centro", dataCenter);

  return (
    <IonPage>
      <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/tab1" />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
      <IonContent >
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
               {
                 dataCenter && dataCenter.specialties ?
                 dataCenter.specialties.map((item: string) => {
                return (
                  <IonItem>
                    <IonLabel>{item}</IonLabel>
                  </IonItem>
                );
              })
               :
                     <IonLabel>No hay </IonLabel>

               }
            </IonList>
          </IonCard>
        ) : (
          <IonLabel>No hay datos</IonLabel>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Medical;
