import { IonCard, IonButton, IonContent, IonPage, IonHeader, IonToolbar, IonTitle,IonInput } from '@ionic/react';
import { IonGrid, IonRow, IonCol} from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../firebaseConfig';
import { toast } from '../toast';

const Login: React.FC = () => {
  const [usermail,setUsermail]=useState('');
  const [userpassword,setUserpassword]=useState('');
  
  async function login(){
    if(usermail.trim() === '' || userpassword.trim() === ''){
      return toast ('Los campos son obligatorios','danger')
    }
    const res= await loginUser(usermail,userpassword)
    if(!res){
      toast('La combinación de correo y contraseña es erronea','danger')
    }else{
      toast('Acceso concedido','success')
    }
    console.log(`${res ? "Acceso concedido" :"Acceso denegado"}`)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Search Health-Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonInput placeholder="Email" color="tertiary" type="email" clearInput
          onIonChange={(e: any)=>setUsermail(e.target.value)}/>
          <IonInput placeholder="Contraseña" color="tertiary" type="password" clearInput
          onIonChange={(e: any)=>setUserpassword(e.target.value)}/>
           <IonGrid>
              <IonRow>
                <IonCol size="7" >
                <IonButton  size="small" onClick={login} color="secondary">Iniciar Sesión</IonButton>
                </IonCol>
                <IonCol  size="5">
                <IonButton size="small" routerLink="/" color="light">Volver</IonButton>
                </IonCol>
              </IonRow>
         </IonGrid>
          <p>Aún no tienes cuenta? <Link to="/register">Crear cuenta</Link></p>
          <p><Link to="/recover">Olvidaste tu contraseña </Link></p>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;