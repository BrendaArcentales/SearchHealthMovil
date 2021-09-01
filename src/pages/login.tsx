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
  IonRouterLink,
} from "@ionic/react";
import "./Login.css";
import { toast } from "../toast";
import React, { useContext } from "react";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router";
import translateMessage from "../firebase/translateMessage";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = object().shape({
  email: string()
    .required("Ingresa tu correo")
    .email("Ingresa un correo electrónico válido"),
  password: string()
    .required("Ingresa tu clave")
    .min(6, "La clave debe tener al menos 6 caracteres"),
});

const Login: React.FC = () => {
  const auth = useContext(AuthProvider);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: any) => {
    try {
      await auth.login(data.email, data.password).then(() => {
        toast("Inicio de sesión exitoso", "success");
        history.replace("/");
      });
    } catch (e) {
      toast(translateMessage(e.code), "danger");
    }
  };

  return (
    <IonPage>
      <IonContent>
        <div className="home-container gradient-1">
          <IonCard class="ion-no-margin" color="gradient">
            <img className="img-size" src="assets/header.png" />
            <div className="ion-text-center">
              <img className="logo-size" src="assets/logo.jpeg" />
            </div>
            <IonCardContent>
              <form onSubmit={handleSubmit(handleLogin)}>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                    id={"email"}
                    title={"email"}
                    {...register("email")}
                    type="text"
                    clearInput
                  />
                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel title="error-email" color={"danger"}>
                    {errors.email?.message}
                  </IonLabel>
                </div>

                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    id={"password"}
                    title={"password"}
                    {...register("password")}
                    type="password"
                    clearInput
                  />
                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel title="error-password" color={"danger"}>
                    {errors.password?.message}
                  </IonLabel>
                </div>

                <div className={"ion-text-center"}>
                  <IonButton
                    color="secondary"
                    type={"submit"}
                    className="ion-activatable ripple-parent button"
                  >
                    Iniciar Sesión
                    <IonRippleEffect />
                  </IonButton>
                </div>
              </form>

              <div className="ion-text-center ">
                <IonTitle size="small">
                  Aún no tienes cuenta?
                  <IonRouterLink className="link" routerLink="/register">
                    <IonLabel>Crear cuenta</IonLabel>
                  </IonRouterLink>
                </IonTitle>
                <IonTitle size="small" color="secondary">
                  <IonRouterLink className="link" routerLink="/recover">
                    Olvidaste tu contraseña
                  </IonRouterLink>
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
