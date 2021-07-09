import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { pencil } from 'ionicons/icons';
import { Link } from 'react-router-dom';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
      <IonCard >
        <IonAvatar >
            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
        </IonAvatar>
        <IonCardHeader>
            <IonCardTitle>Nombre:</IonCardTitle>
            <IonCardSubtitle>Correo: </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
        <IonButton color="tertiary" expand="block">
        <IonIcon icon={pencil}></IonIcon>Actualizar datos</IonButton>
        </IonCardContent>
      </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
