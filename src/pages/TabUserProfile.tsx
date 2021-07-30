import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonModal,
  IonPage,
  IonRippleEffect,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import {pencil, logIn, pencilOutline} from 'ionicons/icons';
import useUser from '../data/useUser';

import './TabUserProfile.css';
import React, {useState} from "react";
import Header from "../components/Header";
import EditComment from "../components/EditComment";
import EditProfile from "../components/EditProfile";

const TabUserProfile: React.FC = () => {
  const [dataUser] = useUser();

  console.log("datos usuario per", dataUser);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const handleOpenModal = ( )=>{
    setShowFilterModal(true)
  }
  const handleCloseModal=()=>{
    setShowFilterModal(false);
  }


  return (
    <IonPage>
   <Header pageName={"Perfil de usuario"}/>
    <IonContent>
    {dataUser!=null ?(
        <>

        <IonCard >
          <div className={"ion-text-center"}>

            <img src={dataUser.photo}  alt={"foto de perfil"} className={"img-profile"}/>

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
                    <h2><strong>{dataUser.name}</strong></h2>
                  </IonLabel>
                  <IonIcon color={"secondary"} icon={pencilOutline} onClick={() => handleOpenModal()}/>
                </IonItem>
                <IonItem>
                  <IonLabel className="ion-text-wrap">
                    <p>Correo electrónico</p>
                    <h2><strong>{dataUser.email} </strong></h2>
                  </IonLabel>
                </IonItem>
              </IonList>

              <IonItemDivider>
                <IonCardSubtitle color={"primary"}>
                  GESTIÓN DE CUENTA
                </IonCardSubtitle>
              </IonItemDivider>
              <div className={"ion-text-center"}>
                <IonButton
                    expand={"block"}
                    fill={"clear"}
                    routerLink="/guide"
                    color="secondary"
                >
                  Ver guia de usuario
                </IonButton>
              </div>
            </IonCardContent>
      </IonCard>
        </>
      ):(<></>)}

      <IonModal
          isOpen={showFilterModal}
          onDidDismiss={() => setShowFilterModal(false)}
          swipeToClose={true}
          cssClass={"myModal"}
      >
        <EditProfile user={dataUser} onClose={handleCloseModal}/>
      </IonModal>


    </IonContent>

  </IonPage>
  );
};

export default TabUserProfile;
