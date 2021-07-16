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
  IonIcon,
  useIonAlert,
} from "@ionic/react";
import "./CenterDetail.css";
import { RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { starOutline, star } from "ionicons/icons";
import useCenter from "../data/useCenter";
import AuthProvider from "../services/AuthProvider";
import { db } from "../firebase/firebaseConfig";
import useFavorites from "../data/useFavorites";
import { toast } from "../toast";

interface Medical
  extends RouteComponentProps<{
    id: string;
  }> {}

const CenterDetail: React.FC<Medical> = ({ match, history }) => {
  const [dataCenter] = useCenter(match.params.id);
  const [days, setDays] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);
  const { authValues } = React.useContext(AuthProvider);
  const [listFavorites] = useFavorites(authValues.user.uid);
  const [present] = useIonAlert();

  useEffect(() => {
    if (dataCenter) {
      setDays(dataCenter.days);
    }
  }, [dataCenter]);

  useEffect(() => {
    if (dataCenter && listFavorites) {
      listFavorites.filter((item: any) => {
        if (item.id == dataCenter.id) {
          setFavorite(true);
        }
      });
    }
  }, [listFavorites, dataCenter]);

  const handleSaveFavorite = async () => {
    await db
      .collection("users")
      .doc(authValues.user.uid)
      .collection("favorites")
      .doc(dataCenter.id)
      .set({ ...dataCenter })
      .then(() => {
        setFavorite(true);
        toast("Agregado a lista de favoritos", "success");
      });
  };

  const handleEditFavorite = async () => {
    await db
      .collection("users")
      .doc(authValues.user.uid)
      .collection("favorites")
      .doc(dataCenter.id)
      .delete()
      .then(() => {
        setFavorite(false);
        toast("Se ha quitado de lista de favoritos", "success");
      });
  };

  const handleAddFavorite = () => {
    present({
      cssClass: "my-css",
      message: "Desea añadir a favoritos este centro médico",
      buttons: [
        { text: "Añadir", handler: (d) => handleSaveFavorite() },
        "Cancelar",
      ],
      onDidDismiss: (e) => console.log("did dismiss"),
    });
  };
  const handleDeleteFavorite = () => {
    present({
      cssClass: "my-css",
      message: "Desea eliminar este centro médico de su lista de favoritos",
      buttons: [
        { text: "Eliminar", handler: (d) => handleEditFavorite() },
        "Cancelar",
      ],
      onDidDismiss: (e) => console.log("did dismiss"),
    });
  };

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
                {favorite ? (
                  <div>
                    <IonIcon
                      onClick={() => handleDeleteFavorite()}
                      slot="end"
                      size="large"
                      color={"secondary"}
                      icon={star}
                    />
                  </div>
                ) : (
                  <div>
                    <IonIcon
                      onClick={() => handleAddFavorite()}
                      slot="end"
                      size="large"
                      icon={starOutline}
                    />
                  </div>
                )}

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
