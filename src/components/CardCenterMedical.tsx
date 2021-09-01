import React, { useContext, useEffect, useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonLabel,
  IonRouterLink,
  IonRow,
  useIonAlert,
} from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import user from "../firebase/services/user";
import { toast } from "../toast";
import AuthProvider from "../services/AuthProvider";
import useFavorites from "../hooks/useFavorites";

const CardCenterMedical = (props: any) => {
  const dataCenter = props.center;
  const [favorite, setFavorite] = useState<boolean>(false);
  const auth = useContext(AuthProvider);
  const [listFavorites] = useFavorites(auth?.authValues?.user.uid);
  const [present] = useIonAlert();

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
    await user
      .getFavoriteCenterByUser(auth?.authValues?.user.uid, dataCenter.id)
      .set({ ...dataCenter })
      .then(() => {
        setFavorite(true);
        toast("Agregado a lista de favoritos", "success");
      });
  };

  const handleEditFavorite = async () => {
    await user
      .getFavoriteCenterByUser(auth?.authValues?.user.uid, dataCenter.id)
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
    <>
      <IonCard>
        <img
          className="img-style"
          src={
            dataCenter?.photo
              ? dataCenter?.photo
              : "https://firebasestorage.googleapis.com/v0/b/search-health-ce2ca.appspot.com/o/medicalCenters%2FOZ6YgiYGKwgZ7QrxtfoC--centro.jpg?alt=media&token=2a9b6ae7-2911-4872-ad32-00c5c63a3b27"
          }
        />
        <IonCardHeader>
          <IonGrid>
            <IonRow>
              <IonCol size={"10"}>
                <IonCardSubtitle>{dataCenter?.sector}</IonCardSubtitle>
                <IonCardTitle>{dataCenter?.name}</IonCardTitle>
                <IonCardSubtitle>{dataCenter?.type}</IonCardSubtitle>
              </IonCol>
              <IonCol size={"2"} className="ion-align-self-center">
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
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCardHeader>
        <IonCardContent>
          <div className="ion-text-center">
            <IonRouterLink
              className="color-link"
              routerLink={`/map/${dataCenter?.id}`}
            >
              Ver mapa
            </IonRouterLink>
            <IonLabel> - </IonLabel>
            <IonRouterLink
              className="color-link"
              routerLink={`/comments/${dataCenter?.id}`}
            >
              Ver comentarios
            </IonRouterLink>
          </div>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default CardCenterMedical;
