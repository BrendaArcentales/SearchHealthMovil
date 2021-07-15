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
  IonChip,
  IonBackButton,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
} from "@ionic/react";
import "./CenterDetail.css";
import { medicalCenter } from "../modelo/medicalCenters";
import firebase from "firebase/app";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
interface Medical
  extends RouteComponentProps<{
    id: string;
  }> {}

const CenterDetail: React.FC<Medical> = ({ match, history }) => {
  const [dataCenter, setDataCenter] = useState<any>([]);
  const [days, setDays] = useState<string>("");
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

  useEffect(() => {
    if (dataCenter) {
      setDays(dataCenter.days);
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
      <IonContent fullscreen>
        {dataCenter ? (
          <>
            <IonCard>
              <img className="img-style" src={dataCenter.photo} />
              <IonCardHeader>
                <IonCardSubtitle>{dataCenter.sector}</IonCardSubtitle>
                <IonCardTitle>{dataCenter.name}</IonCardTitle>
                <IonCardSubtitle>{dataCenter.type}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="ion-text-center">
                  <Link className="color-link" to="/centers">
                    Ver mapa
                  </Link>
                  <IonLabel> - </IonLabel>
                  <Link className="color-link" to="/centers">
                    Ver comentarios
                  </Link>
                </div>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Horario de Atención</IonCardSubtitle>
                <IonCardSubtitle>
                  {dataCenter.start_time} - {dataCenter.end_time}
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                {days ? (
                  days.split(",").map((day: string) => {
                    if (day !== "") {
                      return (
                        <IonChip color="secondary" outline>
                          <IonLabel>{day}</IonLabel>
                        </IonChip>
                      );
                    }
                  })
                ) : (
                  <IonContent />
                )}
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Información de Contacto</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {dataCenter.contacts ? (
                    <>
                      <IonItem>
                        <IonLabel>
                          Celular : {dataCenter.contacts.mobile}
                        </IonLabel>
                      </IonItem>
                      <IonItem>
                        <IonLabel>
                          Telefono : {dataCenter.contacts.telephone}
                        </IonLabel>
                      </IonItem>
                    </>
                  ) : (
                    <IonContent />
                  )}
                </IonList>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>Especialidades</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
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
                    <IonItem>
                      <IonSpinner
                        slot="start"
                        color="secondary"
                        name="crescent"
                      ></IonSpinner>
                      <IonLabel color="secondary">Cargando</IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <>
            <div className="ion-text-center">
              <IonItem>
                <IonSpinner
                  slot="start"
                  color="secondary"
                  name="crescent"
                ></IonSpinner>
                <IonLabel color="secondary">Cargando</IonLabel>
              </IonItem>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CenterDetail;
