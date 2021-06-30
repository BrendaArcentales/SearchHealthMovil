import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonLabel,  IonContent, IonPage, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { personAdd,logIn } from 'ionicons/icons';
import './Home.css';


const Home: React.FC = () => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
          <IonCardTitle>Search Health</IonCardTitle>
          <IonCardSubtitle>Pagina de inicio</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            Keep close to Nature's heart... and break clear away, once in awhile,
            and climb a mountain or spend a week in the woods. Wash your spirit clean.
          </IonCardContent>
        </IonCard>
        <IonCard>
          <IonItem  routerLink="/login" className="ion-activated" color="secondary">
            <IonIcon icon={logIn} slot="start" />
            <IonLabel >Iniciar Sesión</IonLabel>
          </IonItem>
          <IonItem routerLink="/register">
            <IonIcon icon={personAdd} slot="start" />
            <IonLabel>Registrarse</IonLabel>
          </IonItem>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
