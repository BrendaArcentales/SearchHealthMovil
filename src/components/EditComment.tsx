import {IonCol, IonGrid, IonIcon, IonInput, IonItem, IonRow, IonCard, IonTextarea, IonButton} from "@ionic/react";
import {options, sendOutline} from "ionicons/icons";
import React, {useEffect, useState} from "react";
import {db} from "../firebase/firebaseConfig";
import medicalCenters from "../data/services/medicalCenters";


const EditComment = (props: any) => {

    const [text, setText] = useState<string>();
    const [number, setNumber] = useState<number>();
    console.log("ata", props.comment);

    useEffect(() => {
        if (props.comment) {
            setText(props.comment.comment);
            setNumber(props.comment.score);
        }
    }, []);


    const updateComment = async () => {
        await db.collection('medicalCenters').doc(props.idC).collection("comments").doc(props.comment.id).update(
            {comment:text,score:number}).then(()=>{
                props.onClose();
        });
    }

    return (
        <>
            <IonCard>
                <IonGrid>
                    <IonRow>
                        <IonCol size="7">
                            <IonItem>
                                <IonTextarea placeholder="Ingrese su comentario" defaultValue={props.comment.comment}
                                             value={text} onIonChange={e => setText(e.detail.value!)}/>
                            </IonItem>
                        </IonCol>
                        <IonCol size="5">
                            <IonInput clearInput placeholder="Score" value={number} defaultValue={props.comment.score}
                                      onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}/>
                        </IonCol>
                    </IonRow>
                    <IonItem color="primary">
                        Actualizar comentario <IonIcon slot="end" icon={sendOutline} onClick={updateComment}/>
                    </IonItem>
                </IonGrid>
                <div className={"ion-text-center"}>
                    <IonButton onClick={props.onClose}>
                        Cancelar
                    </IonButton>
                </div>

            </IonCard>
        </>
    )
}

export default EditComment;
