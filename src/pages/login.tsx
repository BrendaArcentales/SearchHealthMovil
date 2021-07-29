import {
  IonCard,
  IonButton,
  IonContent,
  IonPage,
  IonTitle,
  IonInput,
  IonRippleEffect,
  IonCardContent,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Login.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "../toast";
import React from "react";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router";
const Login: React.FC = () => {
  const [usermail, setUsermail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { login } = React.useContext(AuthProvider);
  const history = useHistory();

  const onlogin = async () => {
    if (usermail.trim() === "" || userpassword.trim() === "") {
      return toast("Los campos son obligatorios", "danger");
    }
    const res = await login(usermail, userpassword);
    if (!res) {
      toast("La combinación de correo y contraseña es erronea", "danger");
    } else {
      history.replace("/");
    }
    console.log(`${res ? "Acceso concedido" : "Acceso denegado"}`);
  };

  return (
    <IonPage>
      <IonContent>
        <div className="home-container gradient-1">
          <IonCard class="ion-no-margin" color="gradient">
            <img className="img-size" src="assets/header.png"/>
            <div className="ion-text-center">
              <img className="logo-size" src="assets/logo.jpeg"/>
            </div>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="text"
                  clearInput
                  onIonChange={(e: any) => setUsermail(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  type="password"
                  clearInput
                  onIonChange={(e: any) => setUserpassword(e.target.value)}
                />
              </IonItem>

              <div className="ion-text-center ">
                <IonButton
                  color="secondary"
                  onClick={onlogin}
                  className="ion-activatable ripple-parent button"
                >
                  Iniciar Sesión
                  <IonRippleEffect></IonRippleEffect>
                </IonButton>
                <IonTitle size="small">
                  Aún no tienes cuenta?
                  <Link className="link" to="/register">
                    Crear cuenta
                  </Link>
                </IonTitle>
                <IonTitle size="small" color="secondary">
                  <Link className="link" to="/recover">
                    Olvidaste tu contraseña
                  </Link>
                </IonTitle>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
