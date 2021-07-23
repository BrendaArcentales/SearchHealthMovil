import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonButtons,
    IonBackButton,
    useIonAlert,
    IonCol,
    IonIcon,
    IonRow,
    IonGrid,
    IonItem,
    IonList,
    IonThumbnail,
    IonItemDivider,
    IonItemGroup,
    IonModal,
    IonText,
    IonTextarea,
    IonButton,
    IonCard,
    IonInput,
    IonPopover
  } from "@ionic/react";
  import "./TabUserProfile.css";

  import React, { useEffect, useState } from "react";
  import { RouteComponentProps } from "react-router";
import useComments from "../data/useComments";
import "./ViewComments.css";
import { sendOutline,alertCircleOutline,trash, pencilOutline} from "ionicons/icons";
import { db } from "../firebase/firebaseConfig";
import medicalCenters from "../data/services/medicalCenters";
import useUser from "../data/useUser";
import EditComment from "../components/EditComment";

interface Comment
  extends RouteComponentProps<{
    id: string;
  }> {}

  const ViewComments: React.FC <Comment>= ({match, history}) => {
    const [listComments] = useComments(match.params.id);
    console.log("cargo lista comentarios", listComments);
    const [present] = useIonAlert();
    const [text, setText] = useState<string>();
    const idC=match.params.id;
    const [number, setNumber] = useState<number>();
    const [dataUser] = useUser();
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [dataComment, setDataComment] = useState({});

    const handleCreateComment= ()=> {
        db.collection("medicalCenters").doc(idC).collection("comments").add({
          comment:text,score:number,
            name: dataUser.name,
            uid: dataUser.uid,
            photo: dataUser.photo,
      });
    };


    const handleDelComment = async (id: any) => {
      await db
      .collection("medicalCenters")
      .doc(idC)
      .collection("comments")
      .doc(id)
      .delete();
    };
    const handleDeleteComment = (id: any) => {
      present({
        cssClass: "my-css",
        message: "Desea eliminar este comentario",
        buttons: [
          { text: "Eliminar", handler: (d) => handleDelComment(id)},
          "Cancelar",
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      });
    };


    const handleOpenModal = ( data : object )=>{
        setDataComment(data);
        setShowFilterModal(true)
    }
    const handleCloseModal=()=>{
        setShowFilterModal(false);
    }
    return (
      <IonPage>
          <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/centers" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen>
                  {listComments.length > 0 ? (
            <IonList>
              {
                listComments.map((x:any)=>{
                  return (
                  <>
                    <IonItem key={x.id}>
                        <IonThumbnail slot="start">
                          <img src={x.photo} />
                        </IonThumbnail>
                        <IonLabel class="ion-text-wrap">
                          <h2>Autor:{x.name}</h2>
                          <h3>Comentario:{x.comment}</h3>
                          <p>Score:{x.score}</p>
                        </IonLabel>
                        {dataUser.uid===x.uid ?(<>
                          <IonIcon color={"secondary"} icon={pencilOutline} onClick={() => handleOpenModal(x)}/>
                          <IonIcon  color={"danger"} icon={trash} onClick={()=>handleDeleteComment(x.id)}/>
                          </>) :(<></>)}
                      </IonItem>
                  </>
                  );
                })
              }
      </IonList>
          ) : (
            <IonItem>
            <IonGrid>
              <IonRow>
                <IonCol size="1"><IonIcon  color= "warning" icon={alertCircleOutline} />
                </IonCol>
                <IonCol size="11">
                    <IonText color= "warning"> Se el primero en comentar</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
            </IonItem>
          )}
    <IonCard>
      <IonGrid>
    <IonRow>
      <IonCol size="7">
        <IonItem>
      <IonTextarea  placeholder="Ingrese su comentario" value={text} onIonChange={e => setText(e.detail.value!)}/>
      </IonItem>
      </IonCol>
      <IonCol  size="5">
      <IonInput  clearInput  placeholder="Score" value={number} onIonChange={e => setNumber(parseInt(e.detail.value!, 10))}/>
      </IonCol>
      </IonRow>
      <IonItem color="primary">
      Publicar <IonIcon  slot="end" icon={sendOutline} onClick={handleCreateComment}/>
      </IonItem>
    </IonGrid>
    </IonCard>
            <IonModal
                isOpen={showFilterModal}
                onDidDismiss={() => setShowFilterModal(false)}
                swipeToClose={true}
                cssClass={"myModal"}
            >
                <EditComment comment={dataComment} idC={idC} onClose={handleCloseModal}/>
            </IonModal>
    </IonContent>
  </IonPage>
    );
  };

  export default ViewComments;
