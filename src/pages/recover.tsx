import {
  IonCard,
  IonButton,
  IonContent,
  IonPage,
  IonCardContent,
  IonInput,
  IonRippleEffect,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Login.css";

import React, { useState } from "react";
import { toast } from "../toast";
import AuthProvider from "../services/auth";
import { useHistory } from "react-router";

const Recover: React.FC = () => {
  const { sendPasswordResetEmail } = React.useContext(AuthProvider);
  const [usermail, setUsermail] = useState("");
  const history = useHistory();

  const recover = async () => {
    if (usermail.trim() === "") {
      return toast("Ingrese un correo eléctronico", "danger");
    }
    const res = await sendPasswordResetEmail(usermail);
    if (!res) {
      toast("El correo eléctronio no es válido", "danger");
    } else {
      toast("Se ha enviado un mensaje al correo eléctronico", "success");
      history.replace("/login");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="home-container gradient-1">
          <IonCard class="ion-no-margin" color="gradient">
            <img className="img-size" src="assets/header.png"></img>
            <div className="ion-text-center">
              <img className="logo-size" src="assets/logo.jpeg"></img>
              <h3>Recuperar contraseña</h3>
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

              <div className="ion-text-center">
                <IonButton
                  color="secondary"
                  onClick={recover}
                  className="ion-activatable ripple-parent button"
                >
                  Enviar
                  <IonRippleEffect></IonRippleEffect>
                </IonButton>
                <IonButton
                  routerLink="/login"
                  color="tertiary"
                  className="ion-activatable ripple-parent button"
                >
                  Regresar
                  <IonRippleEffect></IonRippleEffect>
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Recover;
