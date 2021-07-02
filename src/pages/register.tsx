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
import React, { useState } from "react";
import { IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Home.css";
import { Link, useHistory } from "react-router-dom";
import { toast } from "../toast";
import AuthProvider from "../services/auth";

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
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search Health-Registro</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonInput
            placeholder="Name"
            color="tertiary"
            type="text"
            clearInput
            onIonChange={(e: any) => setDisplayName(e.target.value)}
          />
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
          <IonInput
            placeholder="Confirmar Contraseña"
            color="tertiary"
            type="password"
            clearInput
            onIonChange={(e: any) => setPasswordconfirm(e.target.value)}
          />
          <IonGrid>
            <IonRow>
              <IonCol size="6">
                <IonButton size="small" onClick={onRegister} color="secondary">
                  Registarse
                </IonButton>
              </IonCol>
              <IonCol size="6">
                <IonButton size="small" routerLink="/" color="light">
                  Regresar
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
          <p>
            Ya tienes una cuenta? <Link to="/login">Iniciar Sesión</Link>
          </p>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Register;
