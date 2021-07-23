import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './TabUserProfile.css';

const TabUserProfile: React.FC = () => {
  return (
    <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Perfil de usuario</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      Hola
    </IonContent>

  </IonPage>
  );
};

export default TabUserProfile;
