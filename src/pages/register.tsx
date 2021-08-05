import React from "react";
import "./Login.css";
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
import { Link, useHistory } from "react-router-dom";
import { toast } from "../toast";
import AuthProvider from "../services/AuthProvider";
import { object, string, ref } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import translateMessage from "../firebase/translateMessage";

const validationSchema = object().shape({
  name: string().required("Ingresa tu nombre"),
  email: string()
    .required("Ingresa tu correo")
    .email("Ingresa un correo electrónico válido"),
  password: string()
    .required("Ingresa tu contraseña")
    .min(6, "La clave debe tener al menos 6 caracteres"),
  confirmPassword: string().oneOf(
    [ref("password"), null],
    "Las contraseñas deben coincidir"
  ),
});

const Register: React.FC = () => {
  const { registerUser } = React.useContext(AuthProvider);

  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onRegister = async (data: any) => {
    try {
      await registerUser(data.email, data.password, data.name).then(() => {
        toast("Su cuenta ha sido creada con exito", "success");
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
              <h3>Registro</h3>
            </div>
            <IonCardContent>
              <form onSubmit={handleSubmit(onRegister)}>
                <IonItem>
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput {...register("name")} type="text" clearInput />
                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel color={"danger"}>{errors.name?.message}</IonLabel>
                </div>

                <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                  <IonInput {...register("email")} type="email" clearInput />
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
                  <IonLabel color={"danger"}>
                    {errors.password?.message}
                  </IonLabel>
                </div>

                <IonItem>
                  <IonLabel position="floating">Confirmar contraseña</IonLabel>
                  <IonInput
                    {...register("confirmPassword")}
                    type="password"
                    clearInput
                  />
                </IonItem>
                <div className={"ion-text-center"}>
                  <IonLabel color={"danger"}>
                    {errors.confirmPassword?.message}
                  </IonLabel>
                </div>
                <div className={"ion-text-center"}>
                  <IonButton
                    color="secondary"
                    type={"submit"}
                    className="ion-activatable ripple-parent button"
                  >
                    Registrarse
                    <IonRippleEffect />
                  </IonButton>
                </div>
              </form>

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
