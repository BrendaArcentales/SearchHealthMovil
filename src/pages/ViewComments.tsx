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
    IonText,
    IonTextarea,
    IonButton,
    IonCard,
    IonInput
  } from "@ionic/react";
  import "./TabUserProfile.css";

  import React, { useEffect, useState } from "react";
  import { RouteComponentProps } from "react-router";
import useComments from "../data/useComments";
import { medicalComment } from "../modelo/comments";
import { sendOutline,alertCircleOutline,trash, pencilOutline} from "ionicons/icons";
import AuthProvider from "../services/AuthProvider";
import useFavorites from "../data/useFavorites";
import { db } from "../firebase/firebaseConfig";
import medicalCenters from "../data/services/medicalCenters";
import useUser from "../data/useUser";

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


    const handleCreateComment= ()=> {
        db.collection("medicalCenters").doc(idC).collection("comments").add({
          comment:text,score:number,
            name: dataUser.name,
            uid: dataUser.uid,
            photo: dataUser.photo,
      });
    };

    console.log("datos usuario", dataUser);

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
    const updateComment = async (id:string,text:string,score:number) => {
      await db.collection('medicalCenters').doc(idC).collection("comments").doc(id).update(
        {comment:text,score:score});
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
                          <IonIcon color={"secondary"} icon={pencilOutline} onClick={() => updateComment(x.id,''+x.commment,+x.score)}/>
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
      <IonTextarea  placeholder="Ingrese su comentario" value={text} onIonChange={e => setText(e.detail.value!)}></IonTextarea>
      </IonItem>
      </IonCol>
      <IonCol  size="5">
      <IonInput  clearInput  placeholder="Score" value={number} onIonChange={e => setNumber(parseInt(e.detail.value!,10))}></IonInput>
      </IonCol>
      </IonRow>
      <IonItem color="primary">
      Publicar <IonIcon  slot="end" icon={sendOutline} onClick={handleCreateComment}/>
      </IonItem>
    </IonGrid>
    </IonCard>
    </IonContent>
  </IonPage>
    );
  };

  export default ViewComments;
