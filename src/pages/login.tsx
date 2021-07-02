import {
  IonCard,
  IonButton,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
} from "@ionic/react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Home.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "../toast";
import React from "react";
import AuthProvider from "../services/auth";
import { useHistory } from "react-router";
const Login: React.FC = () => {
  const [usermail, setUsermail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { login } = React.useContext(AuthProvider);
  const history = useHistory();

  const onlogin = async () => {
    console.log(usermail);
    if (usermail.trim() === "" || userpassword.trim() === "") {
      return toast("Los campos son obligatorios", "danger");
    }
    const res = await login(usermail, userpassword);
    if (!res) {
      toast("La combinación de correo y contraseña es erronea", "danger");
    } else {
      toast("Acceso concedido", "success");
      history.replace("/");
    }
    console.log(`${res ? "Acceso concedido" : "Acceso denegado"}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Health-Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div>  
        <IonCard>
          <IonInput
            placeholder="Email"
            color="tertiary"
            type="email"
            clearInput
            onIonChange={(e: any) => setUsermail(e.target.value)}
          />
          <IonInput
            placeholder="Contraseña"
            color="tertiary"
            type="password"
            clearInput
            onIonChange={(e: any) => setUserpassword(e.target.value)}
          />
          <IonGrid>
            <IonRow>
              <IonCol >
                <IonButton size="small" onClick={onlogin} color="secondary">
                  Iniciar Sesión
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <p>
            Aún no tienes cuenta? <Link to="/register">Crear cuenta</Link>
          </p>
          <p>
            <Link to="/recover">Olvidaste tu contraseña </Link>
          </p>
        </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
