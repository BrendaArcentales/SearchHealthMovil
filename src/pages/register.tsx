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
import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { toast } from "../toast";
import AuthProvider from "../services/AuthProvider";

const Register: React.FC = () => {
  const {
    register,
    authValues: { user, errors },
  } = React.useContext(AuthProvider);
  const [usermail, setUsermail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [passwordcorfim, setPasswordconfirm] = useState("");
  const history = useHistory();

  const onRegister = async () => {
    if (userpassword !== passwordcorfim) {
      return toast("La contraseña no coincide", "warning");
    }
    if (usermail.trim() === "" || userpassword.trim() === "") {
      return toast("Los campos son obligatorios", "danger");
    }
    const res = await register(usermail, userpassword, displayName);
    if (!res) {
      console.log(res);
    } else {
      toast("Usuario creado con exito", "success");
      history.replace("/");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="home-container gradient-1">
          <IonCard class="ion-no-margin" color="gradient">
            <img className="img-size" src="assets/header.png"></img>
            <div className="ion-text-center">
              <h3>Registro</h3>
            </div>
            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput
                  color="tertiary"
                  type="text"
                  clearInput
                  onIonChange={(e: any) => setDisplayName(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  color="tertiary"
                  type="email"
                  clearInput
                  onIonChange={(e: any) => setUsermail(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  color="tertiary"
                  type="password"
                  clearInput
                  onIonChange={(e: any) => setUserpassword(e.target.value)}
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Confirmar Contraseña</IonLabel>
                <IonInput
                  color="tertiary"
                  type="password"
                  clearInput
                  onIonChange={(e: any) => setPasswordconfirm(e.target.value)}
                />
              </IonItem>
              <div className="ion-text-center">
                <IonButton
                  onClick={onRegister}
                  color="secondary"
                  className="ion-activatable ripple-parent button"
                >
                  Registrarse
                  <IonRippleEffect></IonRippleEffect>
                </IonButton>
              </div>
              <div className="ion-padding ion-text-center">
                <IonTitle size="small">
                  Ya tienes una cuenta?{" "}
                  <Link className="link" to="/login">
                    Iniciar Sesión
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

export default Register;
