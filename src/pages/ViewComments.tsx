import {
  IonContent,
  IonPage,
  IonLabel,
  IonCol,
  IonIcon,
  IonRow,
  IonGrid,
  IonItem,
  IonList,
  IonText,
  IonFooter,
  IonAvatar,
} from "@ionic/react";
import "./TabUserProfile.css";
import React from "react";
import { useHistory } from "react-router";
import useComments from "../hooks/useComments";
import "./ViewComments.css";
import { sendOutline, alertCircleOutline, pencilOutline } from "ionicons/icons";
import useUser from "../hooks/useUser";
import { RatingView } from "react-simple-star-rating";
import { useParams } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";

const ViewComments: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [listComments] = useComments(id);
  const [dataUser] = useUser();

  const handleCreateComment = () => {
    history.push(`/newcomment/null/${id}`);
  };

  const handleEditComment = (data: string) => {
    history.push(`/newcomment/${data}/${id}`);
  };

  return (
    <IonPage>
      <HeaderBack word={"Regresar"} />
      <IonContent fullscreen>
        {listComments.length > 0 ? (
          <IonList>
            {listComments.map((x: any) => {
              return (
                <IonItem key={x.id + "center"}>
                  <IonAvatar slot="start">
                    <img src={x.photo} />
                  </IonAvatar>
                  <IonLabel class="ion-text-wrap">
                    <p>{x.name}</p>
                    <p>
                      {x.score ? (
                        <RatingView size={15} ratingValue={x.score} />
                      ) : (
                        <div />
                      )}
                      {x.date ? x.date : <div />}
                    </p>
                    <h2>{x.comment ? x.comment : <div />}</h2>
                  </IonLabel>
                  {dataUser.uid === x.uid ? (
                    <>
                      <IonIcon
                        color={"secondary"}
                        icon={pencilOutline}
                        onClick={() => handleEditComment(x.id)}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </IonItem>
              );
            })}
          </IonList>
        ) : (
          <IonItem lines={"none"}>
            <IonGrid className={"ion-padding-top"}>
              <IonRow>
                <IonCol size="12">
                  <div className={"ion-text-center"}>
                    <IonIcon color="warning" icon={alertCircleOutline} />
                    <IonText color="warning">Se el primero en comentar</IonText>
                  </div>
                </IonCol>
                <img src="assets/comments.svg" className="img-size" />
              </IonRow>
            </IonGrid>
          </IonItem>
        )}
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonItem lines="none" color="primary" onClick={handleCreateComment}>
            Escribe un comentario <IonIcon slot="end" icon={sendOutline} />
          </IonItem>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default ViewComments;
