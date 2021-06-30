import { IonCard, IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput } from '@ionic/react';
import { IonGrid, IonRow, IonCol} from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import {  recoverUser } from '../firebaseConfig';
import { toast } from '../toast';

const Recover: React.FC = () => {
  const [usermail,setUsermail]=useState('');
  
  async function recover(){
    if(usermail.trim() === ''){
      return toast ('Ingrese un correo eléctronico','danger')
    }
    const res= await recoverUser(usermail)
    if(!res){
      toast('El correo eléctronio no es válido','danger')
    }else{
      toast('Se ha enviado un mensaje al correo eléctronico','success')
    }
    console.log(`${res ? "Acceso concedido" :"Acceso denegado"}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Search Health-Recuperar Contraseña</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonInput placeholder="Email" color="tertiary" type="email" clearInput
          onIonChange={(e: any)=>setUsermail(e.target.value)}/>
          <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton size="small" onClick={recover} color="secondary">Enviar</IonButton>
                </IonCol>
                <IonCol size="6">
                <IonButton  size="small" routerLink="/login" color="light">Regresar</IonButton>
                </IonCol>
              </IonRow>
         </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Recover;