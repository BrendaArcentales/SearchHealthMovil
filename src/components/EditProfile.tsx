import {
    IonIcon,
    IonItem,
    IonCard,
    IonTextarea,
    IonButton,
    IonPage,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonCardHeader,
    IonCardTitle,
    IonCardContent, IonLabel
} from "@ionic/react";
import { arrowBackOutline, sendOutline} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {db} from "../firebase/firebaseConfig";
import user from "../data/services/user";

const EditProfile = (props: any) => {

    const [text, setText] = useState<string>();

    useEffect(() => {
        if (props.user) {
            setText(props.user.name);
        }
    }, []);

    const updateNameProfile = async () => {
        await user.getUser(props.user.uid).update(
            {name: text}).then(() => {
            props.onClose();
        });
    }

    return (
        <>
            <IonPage>
                <IonHeader translucent={true}>
                    <IonToolbar >
                        <IonButtons slot="start">
                            <IonButton size={"small"} color="primary" onClick={props.onClose}>
                                <IonIcon slot="start" icon={arrowBackOutline} />
                                Cancelar
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>
                                Editar nombre de usuario
                            </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                            <IonLabel>
                                Nombre de usuario:
                            </IonLabel>
                            <IonItem>
                                <IonTextarea placeholder="Ingrese su nombre de usuario" defaultValue={props.user.name}
                                             value={text} onIonChange={e => setText(e.detail.value!)}/>
                            </IonItem>
                            <IonItem color="primary">
                                Actualizar <IonIcon slot="end" icon={sendOutline}
                                                               onClick={updateNameProfile}/>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </IonContent>
            </IonPage>
        </>
    )
}

export default EditProfile;
