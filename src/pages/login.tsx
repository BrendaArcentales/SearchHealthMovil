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
import { Link } from "react-router-dom";
import { toast } from "../toast";
import React from "react";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router";
import translateMessage from "../firebase/translateMessage";
import {object, string} from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

const validationSchema = object().shape({
  email: string().required("Ingresa tu correo").email("Ingresa un correo electrónico válido"),
  password: string()
      .required("Ingresa tu clave")
      .min(6, "La clave debe tener al menos 6 caracteres"),
});

const Login: React.FC = () => {
  const { login } = React.useContext(AuthProvider);
  const history = useHistory();
  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleLogin = async (data: any) => {
    try{
      await login(data.email, data.password).then(
          ()=>{
            toast("Inicio de sesión exitoso", "success");
            history.replace("/");
          }
      );
    } catch (e) {
      toast(translateMessage(e.code), "danger");
    }
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
              <form onSubmit={handleSubmit(handleLogin)}>
                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput
                      {...register("email")}
                      type="text"
                      clearInput
                  />

                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel color={"danger"}>{errors.email?.message}</IonLabel>
                </div>

                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                      {...register("password")}
                      type="password"
                      clearInput
                  />

                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel color={"danger"}>{errors.password?.message}</IonLabel>
                </div>

                <div className={"ion-text-center"}>
                  <IonButton
                      color="secondary"
                      type={"submit"}
                      className="ion-activatable ripple-parent button"
                  >
                    Iniciar Sesión
                    <IonRippleEffect/>
                  </IonButton>
                </div>
              </form>

              <div className="ion-text-center ">
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
