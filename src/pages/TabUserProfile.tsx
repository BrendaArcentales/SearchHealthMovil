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
  IonIcon,
  IonPage,
  IonRippleEffect,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import useUser from '../data/useUser';

import './TabUserProfile.css';
import React from "react";

const TabUserProfile: React.FC = () => {
  const [dataUser] = useUser();
  console.log("datos usuario per", dataUser);
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Perfil de usuario</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
    {dataUser!=null ?(
        <>
        <IonThumbnail slot="start">
          <img src={dataUser.photo} />
        </IonThumbnail>
        <IonCard >
        <IonCardHeader>
            <IonCardTitle>Nombre: {dataUser.name}</IonCardTitle>
            <IonCardSubtitle>Correo:{dataUser.email} </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
        <IonButton color="tertiary" expand="block">
        <IonIcon icon={pencil}/>Actualizar datos</IonButton>
        </IonCardContent>
      </IonCard>
        </>
      ):(<></>)}

      <IonButton
          routerLink="/guide"
          color="secondary"
          className="ion-activatable ripple-parent button"
      >
        Ver guia de usuario
        <IonRippleEffect/>
      </IonButton>

    </IonContent>

  </IonPage>
  );
};

export default TabUserProfile;
