import {
  IonIcon,
  IonItem,
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
  useIonAlert,
  IonCardSubtitle,
  IonRippleEffect,
} from "@ionic/react";
import { arrowBackOutline, sendOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import useUser from "../hooks/useUser";

const EditComment = (props: any) => {
  const [text, setText] = useState<string>("");
  const [validate, setValidate] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [dataUser] = useUser();
  const [present] = useIonAlert();

  useEffect(() => {
    if (Object.keys(props.comment).length !== 0) {
      setText(props.comment.comment);
      setRating(props.comment.score);
      setValidate(true);
    } else {
      setRating(1);
      setValidate(false);
    }
  }, [props]);

  const handleCreateComment = async () => {
    const today = new Date();
    const date = moment(today).format("DD/MM/YY");
    await medicalCenters
      .getCommentsByIDCenter(props.idC)
      .add({
        comment: text,
        score: rating,
        name: dataUser.name,
        uid: dataUser.uid,
        photo: dataUser.photo,
        create: new Date(),
        date: date,
      })
      .then(() => {
        props.onClose();
      });
  };

  const updateComment = async () => {
    const today = new Date();
    const date = moment(today).format("DD/MM/YY");
    await medicalCenters
      .getCommentByIDCenter(props.idC, props.comment.id)
      .update({
        comment: text,
        score: rating,
        photo: dataUser.photo,
        create: new Date(),
        date: date,
      })
      .then(() => {
        props.onClose();
      });
  };

  const handleDelComment = async (id: any) => {
    await medicalCenters.deleteCommentByIDCenter(props.idC, id).then(() => {
      props.onClose();
    });
  };
  const handleDeleteComment = () => {
    present({
      cssClass: "my-css",
      message: "Desea eliminar este comentario",
      buttons: [
        {
          text: "Eliminar",
          handler: (d) => handleDelComment(props.comment.id),
        },
        "Cancelar",
      ],
      onDidDismiss: (e) => console.log("did dismiss"),
    });
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton size="small" color="primary" onClick={props.onClose}>
                <IonIcon slot="start" icon={arrowBackOutline} />
                Cancelar
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCardHeader>
            <IonCardTitle>
              {validate ? (
                <>Editar el comentario</>
              ) : (
                <>Agregar un comentario</>
              )}
            </IonCardTitle>
          </IonCardHeader>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Valoración:</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className={"ion-text-center"}>
                <Rating onClick={handleRating} size={35} ratingValue={rating} />
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Comentario:</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div>
                <IonTextarea
                  placeholder="Ingrese su comentario"
                  defaultValue={props.comment.comment}
                  value={text}
                  onIonChange={(e) => setText(e.detail.value!)}
                  clearOnEdit
                  required
                />
              </div>
            </IonCardContent>
          </IonCard>
          {validate ? (
            <>
              <IonItem
                lines="none"
                disabled={text == ""}
                color="primary"
                onClick={updateComment}
              >
                Actualizar comentario <IonIcon slot="end" icon={sendOutline} />
              </IonItem>
              <div className={"ion-text-center ion-padding-top"}>
                <div className={"ion-text-center"}>
                  <IonButton
                    color="secondary"
                    onClick={() => handleDeleteComment()}
                    className="ion-activatable"
                  >
                    Eliminar comentario
                    <IonRippleEffect />
                  </IonButton>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={"ion-text-center"}>
                <IonItem
                  color="primary"
                  disabled={text == ""}
                  onClick={handleCreateComment}
                >
                  Publicar comentario <IonIcon slot="end" icon={sendOutline} />
                </IonItem>
              </div>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditComment;
