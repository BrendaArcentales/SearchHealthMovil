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
  IonModal,
  IonPage,
} from "@ionic/react";
import { pencilOutline } from "ionicons/icons";

import "./TabUserProfile.css";
import React, { useState } from "react";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";
import AuthProvider from "../services/AuthProvider";

const TabUserProfile: React.FC = () => {
  const { authValues } = React.useContext(AuthProvider);
  const dataUser = authValues.user;

  const [showFilterModal, setShowFilterModal] = useState(false);
  const handleOpenModal = () => {
    setShowFilterModal(true);
  };
  const handleCloseModal = () => {
    setShowFilterModal(false);
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

        <IonModal
          isOpen={showFilterModal}
          onDidDismiss={() => setShowFilterModal(false)}
          swipeToClose={true}
          cssClass={"myModal"}
        >
          <EditProfile user={dataUser} onClose={handleCloseModal} />
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default TabUserProfile;
