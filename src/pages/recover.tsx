import "./Login.css";
import React from "react";
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
import {toast} from "../toast";
import AuthProvider from "../services/AuthProvider";
import {useHistory} from "react-router";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {object, string} from "yup";
import translateMessage from "../firebase/translateMessage";

const validationSchema = object().shape({
    email: string().required("Ingresa tu correo").email("Ingresa un correo electrónico válido"),
});

const Recover: React.FC = () => {
    const {sendPasswordResetEmail} = React.useContext(AuthProvider);
    const history = useHistory();

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationSchema),
    });

    const recover = async (data: any) => {
        try {
            await sendPasswordResetEmail(data.email).then(
                () => {
                    toast("Se ha enviado un correo a " +
                    data.email +
                    ". Revisa tu bandeja de entrada.", "success");
                    history.replace("/login");
                }
            )
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
                            <h3>Recuperar contraseña</h3>
                        </div>

                        <IonCardContent>
                            <form onSubmit={handleSubmit(recover)}>
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
                                <div className={"ion-text-center"}>
                                    <IonButton
                                        color="secondary"
                                        type={"submit"}
                                        className="ion-activatable ripple-parent button"
                                    >
                                        Enviar
                                        <IonRippleEffect/>
                                    </IonButton>
                                </div>
                            </form>


                            <div className="ion-text-center">
                                <IonButton
                                    routerLink="/login"
                                    color="tertiary"
                                    className="ion-activatable ripple-parent button"
                                >
                                    Regresar
                                    <IonRippleEffect/>
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
