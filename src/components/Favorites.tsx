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
  IonCol,
} from "@ionic/react";
import { Link } from "react-router-dom";
import {
  trash,
  arrowForwardCircleOutline,
} from "ionicons/icons";
import useFavorites from "../hooks/useFavorites";
import AuthProvider from "../services/AuthProvider";
import { medicalCenter } from "../modelo/medicalCenters";
import { db } from "../firebase/firebaseConfig";

interface ContainerProps {}

const Favorites: React.FC<ContainerProps> = () => {
  const { authValues } = React.useContext(AuthProvider);
  const [listFavorites] = useFavorites(authValues.user.uid);
  const [searchText, setSearchText] = useState("");
  const [present] = useIonAlert();

  const handleEditFavorite = async (id: any) => {
    await db
      .collection("users")
      .doc(authValues.user.uid)
      .collection("favorites")
      .doc(id)
      .delete();
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
        {listFavorites.map((x: medicalCenter) => {
          return (
            <IonItem key={x.id}>
              <IonThumbnail slot="start">
                <img src={x.photo} />
              </IonThumbnail>
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonLabel>
                      <h2>{x.name}</h2>
                      <h3>Sector: {x.sector}</h3>
                      <p>Tipo:{x.type}</p>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel>
                      <IonIcon
                        onClick={() => handleDeleteFavorite(x.id)}
                        slot="end"
                        size="large"
                        color={"danger"}
                        icon={trash}
                      />
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonLabel>
                      <Link to={`/centers/centerDetail/${x.id}`}>
                        <IonIcon
                          slot="end"
                          size="large"
                          color={"secondary"}
                          icon={arrowForwardCircleOutline}
                        />
                      </Link>
                    </IonLabel>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonItem>
          );
        })}
      </IonList>
    </IonContent>
  );
};
export default Favorites;
