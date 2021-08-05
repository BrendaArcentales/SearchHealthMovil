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
  IonModal,
  IonText,
  IonFooter,
  IonAvatar,
} from "@ionic/react";
import "./TabUserProfile.css";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import useComments from "../hooks/useComments";
import "./ViewComments.css";
import { sendOutline, alertCircleOutline, pencilOutline } from "ionicons/icons";
import useUser from "../hooks/useUser";
import EditComment from "../components/EditComment";
import HeaderBack from "../components/HeaderBack";
import { RatingView } from "react-simple-star-rating";

interface Comment
  extends RouteComponentProps<{
    id: string;
  }> {}

const ViewComments: React.FC<Comment> = ({ match, history }) => {
  const [listComments] = useComments(match.params.id);
  const idC = match.params.id;
  const [dataUser] = useUser();
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [dataComment, setDataComment] = useState({});

  const handleOpenModalCreate = () => {
    setDataComment({});
    setShowFilterModal(true);
  };

  const handleOpenModal = (data: object) => {
    setDataComment(data);
    setShowFilterModal(true);
  };
  const handleCloseModal = () => {
    setShowFilterModal(false);
  };
  console.log("list", listComments);
  return (
    <IonPage>
      <HeaderBack pageName={`/centers/centerDetail/${match.params.id}`} />
      <IonContent fullscreen>
        {listComments.length > 0 ? (
          <IonList>
            {listComments.map((x: any) => {
              return (
                <>
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
                          onClick={() => handleOpenModal(x)}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </IonItem>
                </>
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
                    <IonText color="warning">
                      {" "}
                      Se el primero en comentar
                    </IonText>
                  </div>
                </IonCol>
                <img src="assets/comments.svg" className="img-size" />
              </IonRow>
            </IonGrid>
          </IonItem>
        )}
        <IonModal
          isOpen={showFilterModal}
          onDidDismiss={() => setShowFilterModal(false)}
          swipeToClose={true}
        >
          <EditComment
            comment={dataComment}
            idC={idC}
            onClose={handleCloseModal}
          />
        </IonModal>
      </IonContent>
      <IonFooter>
        <IonGrid>
          <IonItem lines="none" color="primary" onClick={handleOpenModalCreate}>
            Escribe un comentario <IonIcon slot="end" icon={sendOutline} />
          </IonItem>
        </IonGrid>
      </IonFooter>
    </IonPage>
  );
};

export default ViewComments;
