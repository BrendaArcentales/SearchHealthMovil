import {
  IonIcon,
  IonItem,
  IonCard,
  IonTextarea,
  IonButton,
  IonPage,
  IonContent,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  useIonAlert,
  IonCardSubtitle,
  IonRippleEffect,
} from "@ionic/react";
import { sendOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";
import { Rating } from "react-simple-star-rating";
import moment from "moment";
import useUser from "../hooks/useUser";
import { useParams } from "react-router-dom";
import useCommentUser from "../hooks/useCommentUser";
import { useHistory } from "react-router";
import HeaderBack from "./HeaderBack";

const EditComment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useParams<{ data: string }>();
  const [dataComment] = useCommentUser(id, data);
  const history = useHistory();
  const [text, setText] = useState<string>("");
  const [validate, setValidate] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [dataUser] = useUser();
  const [present] = useIonAlert();

  useEffect(() => {
    if (dataComment) {
      if (dataComment.id != "null") {
        setText(dataComment.comment);
        setRating(dataComment.score);
        setValidate(true);
      } else {
        setRating(1);
        setValidate(false);
      }
    } else {
      setRating(1);
      setValidate(false);
    }
  }, [dataComment]);

  const handleCreateComment = async () => {
    const today = new Date();
    const date = moment(today).format("DD/MM/YY");
    await medicalCenters
      .getCommentsByIDCenter(id)
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
        history.goBack();
      });
  };

  const updateComment = async () => {
    const today = new Date();
    const date = moment(today).format("DD/MM/YY");
    await medicalCenters
      .getCommentByIDCenter(id, dataComment.id)
      .update({
        comment: text,
        score: rating,
        photo: dataUser.photo,
        create: new Date(),
        date: date,
      })
      .then(() => {
        history.goBack();
      });
  };

  const handleDelComment = async (idComment: any) => {
    await medicalCenters.deleteCommentByIDCenter(id, idComment).then(() => {
      history.goBack();
    });
  };
  const handleDeleteComment = () => {
    present({
      cssClass: "my-css",
      message: "Desea eliminar este comentario",
      buttons: [
        {
          text: "Eliminar",
          handler: (d) => handleDelComment(dataComment.id),
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
        <HeaderBack word={"Cancelar"} />
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
                  defaultValue={dataComment.comment}
                  value={text}
                  onIonChange={(e) => setText(e.detail.value!)}
                  clearOnEdit
                  required
                />
              </div>
            </IonCardContent>
          </IonCard>
          {!validate ? (
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
          ) : (
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
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditComment;
