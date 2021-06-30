import { IonCard, IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonInput } from '@ionic/react';
import { useState } from 'react';
import { IonGrid, IonRow, IonCol} from '@ionic/react';
import './Home.css';
import { Link } from 'react-router-dom';
import { toast } from '../toast';
import {registerUser} from '../firebaseConfig'


const Register: React.FC = () => {
  const [usermail,setUsermail]=useState('');
  const [userpassword,setUserpassword]=useState('');
  const [passwordcorfim,setPasswordconfirm]=useState('');
  
  async function register(){
    if(userpassword !== passwordcorfim){
      return toast ('La contraseña no coincide','warning')
    }
    if(usermail.trim() === '' || userpassword.trim() === ''){
      return toast ('Los campos son obligatorios','danger')
    }
    const res =await registerUser(usermail,userpassword);
    toast('Usuario creado con exito','success')
    console.log(usermail,userpassword,passwordcorfim)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Health-Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonInput placeholder="Email" color="tertiary" type="email" clearInput
          onIonChange={(e: any)=>setUsermail(e.target.value)}/>
          <IonInput placeholder="Contraseña" color="tertiary" type="password" clearInput
          onIonChange={(e: any)=>setUserpassword(e.target.value)}/>
          <IonInput placeholder="Confirmar Contraseña" color="tertiary" type="password" clearInput
          onIonChange={(e: any)=>setPasswordconfirm(e.target.value)}/>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton size="small" onClick={register} color="secondary">Registarse</IonButton>
                </IonCol>
                <IonCol size="6">
                <IonButton  size="small" routerLink="/" color="light">Regresar</IonButton>
                </IonCol>
              </IonRow>
              </IonGrid>
          <p>Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link></p>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;