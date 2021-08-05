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
  IonCardContent,
  IonLabel,
  IonAvatar,
  IonCardSubtitle,
} from "@ionic/react";
import { arrowBackOutline, camera, sendOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import user from "../firebase/services/user";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import useFirebaseUpload from "../hooks/useFirebaseUpload";

const EditProfile = (props: any) => {
  const { photos, takePhoto } = usePhotoGallery();
  const [text, setText] = useState<string>();
  const [data, setData] = useState({});

  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError,
  ] = useFirebaseUpload();

  useEffect(() => {
    if (props.user) {
      setText(props.user.name);
    }
  }, []);

  useEffect(() => {
    if (dataResponse) {
      updatePhotoProfile();
    }
  }, [dataResponse]);

  useEffect(() => {
    photos.map((photo, index) => {
      // @ts-ignore
      setData({
        dataUrl: photo.data,
        format: photo.format,
      });
    });
  }, [photos]);

  const updateNameProfile = async () => {
    await user
      .getUser(props.user.uid)
      .update({ name: text })
      .then(() => {
        props.onClose();
      });
  };

  const updatePhotoProfile = async () => {
    // @ts-ignore
    let URL = dataResponse.downloadUrl;
    await user
      .getUser(props.user.uid)
      .update({ photo: URL })
      .then(() => {
        props.onClose();
      });
  };

  const savePhoto = () => {
    setFileData(data);
  };

  return (
    <>
      <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
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
              <IonCardSubtitle>Editar nombre de usuario</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonLabel>Nombre de usuario:</IonLabel>
              <IonItem lines={"none"}>
                <IonTextarea
                  placeholder="Ingrese su nombre de usuario"
                  defaultValue={props.user.name}
                  value={text}
                  onIonChange={(e) => setText(e.detail.value!)}
                />
              </IonItem>

              <IonItem
                lines={"none"}
                disabled={text == ""}
                color="primary"
                onClick={updateNameProfile}
              >
                Actualizar <IonIcon slot="end" icon={sendOutline} />
              </IonItem>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Editar foto de perfil</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <IonItem lines={"none"}>
                <IonLabel>
                  Foto actual:
                  <IonAvatar>
                    <img src={props.user.photo} />
                  </IonAvatar>
                </IonLabel>
                <IonIcon
                  slot="end"
                  color="secondary"
                  icon={camera}
                  onClick={takePhoto}
                />
              </IonItem>
              {photos.map((photo, index) => (
                <>
                  <IonLabel>Nueva Foto:</IonLabel>
                  <img
                    src={photo.webviewPath}
                    alt={"foto de perfil"}
                    className={"img-profile"}
                  />
                </>
              ))}
              <IonItem
                lines={"none"}
                disabled={photos.length <= 0}
                color="primary"
                onClick={savePhoto}
              >
                Actualizar <IonIcon slot="end" icon={sendOutline} />
              </IonItem>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EditProfile;
