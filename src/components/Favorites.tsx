import React, { useState } from "react";
import {
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonThumbnail,
  useIonAlert,
  IonRow,
  IonCol, IonText, IonRippleEffect, IonButton,
} from "@ionic/react";
import {
  trash, alertCircleOutline,
} from "ionicons/icons";
import useFavorites from "../hooks/useFavorites";
import AuthProvider from "../services/AuthProvider";
import { medicalCenter } from "../modelo/medicalCenters";
import user from "../firebase/services/user";

interface ContainerProps {}

const Favorites: React.FC<ContainerProps> = () => {
  const { authValues } = React.useContext(AuthProvider);
  const [listFavorites] = useFavorites(authValues.user.uid);
  const [searchText, setSearchText] = useState("");
  const [present] = useIonAlert();

  const handleEditFavorite = async (id: any) => {
    await user.getFavoriteCenterByUser(authValues.user.uid, id).delete();
  };

  const handleDeleteFavorite = (id: any) => {
    present({
      cssClass: "my-css",
      message: "Desea eliminar este centro médico de su lista de favoritos",
      buttons: [
        { text: "Eliminar", handler: (d) => handleEditFavorite(id) },
        "Cancelar",
      ],
      onDidDismiss: (e) => console.log("did dismiss"),
    });
  };
  return (
    <IonContent fullscreen>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
      />
      <IonList>
        {
          listFavorites.length > 0 ?

          listFavorites.map((x: medicalCenter) => {
          return (
              <>
                <IonGrid>
                  <IonRow >

                    <IonCol size="11">
                      <IonItem key={x.id} lines="full" detail={true} routerLink={`/centers/centerDetail/${x.id}`} >
                        <IonThumbnail slot="start">
                          <img src={x.photo} />
                        </IonThumbnail>
                        <IonLabel className={"ion-text-wrap"}>
                          <h2>{x.name} </h2>
                          <h4 className={"ion-text-end"}>{x.sector}</h4>
                          <p>{x.type}</p>
                        </IonLabel>
                      </IonItem>
                    </IonCol>

                    <IonCol size="1" className="ion-align-self-center">
                      <IonLabel >
                        <IonIcon
                            onClick={() => handleDeleteFavorite(x.id)}
                            slot="start"
                            size="large"
                            color={"danger"}
                            icon={trash}
                        />
                      </IonLabel>
                    </IonCol>
                  </IonRow>
                </IonGrid>
          </>
          );
        })

        :
              <IonGrid className={"ion-padding-top"}>
                <IonRow>
                  <IonCol size="12">
                    <div className={"ion-text-center"}>
                      <IonIcon color="warning" icon={alertCircleOutline}/>
                      <IonText  color="warning"> No tienes centros médicos en tu lista de Favoritos</IonText>
                    </div>
                  </IonCol>

                  <div className={"ion-text-center ion-padding"}>
                    <img src="assets/favorites2.svg" className="img-size"/>
                    <IonButton
                        routerLink="/"
                        color="secondary"
                        className="ion-activatable ripple-parent button "
                    >
                      Busquemos uno
                      <IonRippleEffect/>
                    </IonButton>
                  </div>
                </IonRow>
              </IonGrid>
        }
      </IonList>
    </IonContent>
  );
};

export default Favorites;
