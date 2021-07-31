import {
    IonCol,
    IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonRow,
    IonCard,
    IonTextarea,
    IonButton,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonPage,
    IonContent,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonLabel,
    useIonAlert
} from "@ionic/react";
import {arrowBackOutline, options, sendOutline} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {db} from "../firebase/firebaseConfig";
import medicalCenters from "../firebase/services/medicalCenters";

const EditComment = (props: any) => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    const [present] = useIonAlert();
    console.log("ata", props.comment);

    useEffect(() => {
        if (props.comment) {
            setText(props.comment.comment);
            setNumber(props.comment.score);
        }
    }, []);


    const updateComment = async () => {
        await db.collection('medicalCenters').doc(props.idC).collection("comments").doc(props.comment.id).update(
            {comment: text, score: number}).then(() => {
            props.onClose();
        });
    }


    const handleDelComment = async (id: any) => {
        await db
            .collection("medicalCenters")
            .doc(props.idC)
            .collection("comments")
            .doc(id)
            .delete().then(()=>{
                props.onClose();
            });
    };
    const handleDeleteComment = () => {
        present({
            cssClass: "my-css",
            message: "Desea eliminar este comentario",
            buttons: [
                { text: "Eliminar", handler: (d) => handleDelComment(props.comment.id)},
                "Cancelar",
            ],
            onDidDismiss: (e) => console.log("did dismiss"),
        });
    };


    return (
        <>
            <IonPage>
                <IonHeader translucent={true}>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton size="small" color="primary" onClick={props.onClose}>
                                <IonIcon slot="start" icon={arrowBackOutline}/>
                                Cancelar
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonCardHeader>
                        <IonCardTitle>
                            Editar el comentario
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonLabel>
                            Comentario:
                        </IonLabel>
                        <IonItem>
                            <IonTextarea placeholder="Ingrese su comentario"
                                         defaultValue={props.comment.comment}
                                         value={text} onIonChange={e => setText(e.detail.value!)}/>
                        </IonItem>
                        <IonLabel>
                            Valoración:
                        </IonLabel>
                        <IonInput clearInput placeholder="Score" value={number}
                                  defaultValue={props.comment.score}
                                  onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}/>

                        <IonItem color="primary">
                            Actualizar comentario <IonIcon slot="end" icon={sendOutline} onClick={updateComment}/>
                        </IonItem>

                        <div className={"ion-text-center"}>
                            <IonButton color="secondary" onClick={()=>handleDeleteComment()}>
                                Eliminar comentario
                            </IonButton>
                        </div>
                    </IonCardContent>
                </IonContent>
            </IonPage>
        </>
    )
}

export default EditComment;
