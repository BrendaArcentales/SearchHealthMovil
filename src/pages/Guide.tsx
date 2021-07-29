import React, {useState} from "react";
import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent, IonLabel, IonList,
    IonPage,
    IonRippleEffect, IonSlide, IonSlides, IonTitle
} from "@ionic/react";
import "./Guide.css";

const Guide: React.FC = () => {

    return (
        <IonPage>
            <IonContent scrollY={false} fullscreen={true}>
                <div className="home-container gradient-1">
                    <IonSlides>
                        <IonSlide>
                            <div className={"container"}>
                                <img className="logo-size" src="assets/logo.jpeg"></img>


                                <IonCardContent>
                                    <IonLabel>
                                        <p>Sistema que permite encontrar centros médicos de especialidades</p>
                                    </IonLabel>
                                </IonCardContent>
                            <IonButton
                                routerLink="/login"
                                color="secondary"
                                className="ion-activatable ripple-parent button"
                            >
                                Omitir
                                <IonRippleEffect></IonRippleEffect>
                            </IonButton>
                            </div>
                        </IonSlide>

                        <IonSlide>

                                <div className={"container"}>
                                    <img src="assets/list.svg" className="img-size"/>

                                <IonCardContent>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Funcionalidades
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonLabel>
                                        <p>En la aplicación podrá visualizar una lista de centros médicos, podrá buscar por nombres de los centros médics o filtrar por el sector donde se encutren estos</p>
                                    </IonLabel>
                                </IonCardContent>
                                </div>

                        </IonSlide>

                        <IonSlide>

                                <div className={"container"}>
                                <img src="assets/viewMedical.svg"/>

                                <IonCardContent>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Centros Médicos
                                        </IonCardTitle>
                                    </IonCardHeader>
                                </IonCardContent>
                                <IonLabel>
                                    <p>Cada centro médico dispone de la información detallada como horarios de atención, números de contacto, redes sociales y las especialidades que maneja el centro médico</p>
                                </IonLabel>
                                </div>

                        </IonSlide>

                        <IonSlide>

                                <div className={"container"}>
                                    <img src="assets/map.svg" />

                                <IonCardContent>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Localiza centros médicos
                                        </IonCardTitle>
                                    </IonCardHeader>
                                </IonCardContent>
                                <IonLabel>
                                    <p>Cada centro tiene una sección de Ver mapa donde podra ver la dirección del centro médico</p>

                                </IonLabel>
                                </div>

                        </IonSlide>

                        <IonSlide>

                                <div className={"container"}>
                                <img src="assets/login.svg"/>

                                <IonCardContent>
                                    <IonCardHeader>
                                        <IonCardTitle>
                                            Empezar
                                        </IonCardTitle>
                                    </IonCardHeader>
                                </IonCardContent>
                                <IonButton
                                    routerLink="/login"
                                    color="secondary"
                                    className="ion-activatable ripple-parent button"
                                >
                                    Comenzar
                                    <IonRippleEffect></IonRippleEffect>
                                </IonButton>
                                </div>
                        </IonSlide>
                    </IonSlides>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Guide;
