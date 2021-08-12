import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonChip,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonIcon,
} from "@ionic/react";
import "./CenterDetail.css";
import { logoFacebook, logoInstagram, globeOutline } from "ionicons/icons";
import useCenter from "../hooks/useCenter";
import CardCenterMedical from "../components/CardCenterMedical";
import { useParams } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";

const CenterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dataCenter] = useCenter(id);
  const [days, setDays] = useState<string>("");

  useEffect(() => {
    if (dataCenter) {
      setDays(dataCenter.days);
    }
  }, [dataCenter, id]);

  return (
    <IonPage>
      <HeaderBack word={"Regresar"} />
      <IonContent fullscreen>
        <CardCenterMedical center={dataCenter} />
        {dataCenter ? (
          <>
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
                        <IonChip
                          color="secondary"
                          outline
                          key={`${dataCenter.id}+${day}`}
                        >
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
                <IonCardSubtitle>Redes Sociales</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonList>
                  {dataCenter.social_media ? (
                    <>
                      {dataCenter.social_media.facebook ? (
                        <>
                          <IonItem>
                            <IonLabel class="ion-text-wrap">
                              <IonIcon
                                slot="start"
                                size="large"
                                color={"secondary"}
                                icon={logoFacebook}
                              />
                              <a
                                target={"_blank"}
                                href={dataCenter.social_media.facebook}
                              >
                                {dataCenter.social_media.facebook}
                              </a>
                            </IonLabel>
                          </IonItem>
                        </>
                      ) : (
                        <></>
                      )}
                      {dataCenter.social_media.instagram ? (
                        <>
                          <IonItem>
                            <IonLabel class="ion-text-wrap">
                              <IonIcon
                                slot="start"
                                size="large"
                                color={"secondary"}
                                icon={logoInstagram}
                              />
                              <a
                                target={"_blank"}
                                href={dataCenter.social_media.instagram}
                              >
                                {dataCenter.social_media.instagram}
                              </a>
                            </IonLabel>
                          </IonItem>
                        </>
                      ) : (
                        <></>
                      )}
                      {dataCenter.social_media.website ? (
                        <>
                          <IonItem>
                            <IonLabel class="ion-text-wrap">
                              <IonIcon
                                slot="start"
                                size="large"
                                color={"secondary"}
                                icon={globeOutline}
                              />
                              <a
                                target={"_blank"}
                                href={dataCenter.social_media.website}
                              >
                                {dataCenter.social_media.website}
                              </a>
                            </IonLabel>
                          </IonItem>
                        </>
                      ) : (
                        <></>
                      )}
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
                        <IonItem key={`${dataCenter.id}+${item}`}>
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
                      />
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
                <IonSpinner slot="start" color="secondary" name="crescent" />
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
