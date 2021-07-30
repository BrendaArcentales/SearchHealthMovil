import React from 'react';
import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonBackButton,
    IonRippleEffect
} from '@ionic/react';
import {arrowBackOutline} from "ionicons/icons";

type HeaderProps = {
    pageName: string
}

const HeaderBack: React.FC<HeaderProps> = ({pageName}: HeaderProps) => {

    return (

        <IonHeader translucent={true}>
            <IonToolbar>
                <IonButtons slot="start" >
                    <IonBackButton text="Regresar" color="primary" defaultHref={pageName}/>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
    );
};

export default HeaderBack;
