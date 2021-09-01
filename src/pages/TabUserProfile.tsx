import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonContent,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";

import "./TabUserProfile.css";
import React, { useContext } from "react";
import Header from "../components/Header";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router-dom";

const TabUserProfile: React.FC = () => {
  const auth = useContext(AuthProvider);
  const dataUser = auth?.authValues?.user;
  const history = useHistory();

  const handleOpenModal = () => {
    history.push("/editProfile");
  };

  return (
    <IonPage>
      <Header pageName={"Perfil"} />
      <IonContent>
        {dataUser != null ? (
          <>
            <IonCard>
              <div className={"ion-text-center"}>
                <img
                  src={dataUser.photo}
                  alt={"foto de perfil"}
                  className={"img-profile"}
                />
              </div>
              <IonCardContent>
                <IonItemDivider>
                  <IonCardSubtitle color={"primary"}>
                    INFORMACIÓN DE CUENTA
                  </IonCardSubtitle>
                </IonItemDivider>

                <IonList>
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      <p>Nombre</p>
                      <h2>
                        <strong>{dataUser.name}</strong>
                      </h2>
                    </IonLabel>
                    <IonIcon
                      color={"secondary"}
                      icon={pencilOutline}
                      onClick={() => handleOpenModal()}
                    />
                  </IonItem>
                  <IonItem>
                    <IonLabel className="ion-text-wrap">
                      <p>Correo electrónico</p>
                      <h2>
                        <strong>{dataUser.email} </strong>
                      </h2>
                    </IonLabel>
                  </IonItem>
                </IonList>
                <div className={"ion-text-center"}>
                  <IonLabel className="ion-text-wrap">
                    <p>
                      Esta sección contiene una guia que permitira al usuario
                      entender el funcionamiento y otros detalles sobre la
                      apliación
                    </p>
                  </IonLabel>
                  <IonButton
                    fill={"clear"}
                    routerLink="/guide"
                    color="secondary"
                  >
                    Guia
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          </>
        ) : (
          <></>
        )}
      </IonContent>
    </IonPage>
  );
};

export default TabUserProfile;
