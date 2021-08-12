import {
  IonIcon,
  IonItem,
  IonCard,
  IonTextarea,
  IonPage,
  IonContent,
  IonCardHeader,
  IonCardContent,
  IonLabel,
  IonAvatar,
  IonCardSubtitle,
} from "@ionic/react";
import { camera, sendOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import user from "../firebase/services/user";
import { usePhotoGallery } from "../hooks/usePhotoGallery";
import useFirebaseUpload from "../hooks/useFirebaseUpload";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router-dom";
import HeaderBack from "./HeaderBack";

const EditProfile = () => {
  const { authValues } = React.useContext(AuthProvider);
  const dataUser = authValues.user;
  const history = useHistory();
  const { photos, takePhoto } = usePhotoGallery();
  const [text, setText] = useState<string>();
  const [data, setData] = useState({});

  const [
    { dataResponse, isLoading, isError, progress },
    setFileData,
    clearError,
  ] = useFirebaseUpload();

  useEffect(() => {
    if (dataUser) {
      setText(dataUser.name);
    }
  }, [dataUser]);

  useEffect(() => {
    if (dataResponse) {
      updatePhotoProfile();
    }
  }, [dataResponse]);

  useEffect(() => {
    photos.map((photo, index) => {
      setData({
        dataUrl: photo.data,
        format: photo.format,
      });
    });
  }, [photos]);

  const updateNameProfile = async () => {
    await user
      .getUser(dataUser.uid)
      .update({ name: text })
      .then(() => {
        history.goBack();
      });
  };

  const updatePhotoProfile = async () => {
    // @ts-ignore
    let URL = dataResponse.downloadUrl;
    await user
      .getUser(dataUser.uid)
      .update({ photo: URL })
      .then(() => {
        history.goBack();
      });
  };

  const savePhoto = () => {
    setFileData(data);
  };

  return (
    <>
      <IonPage>
        <HeaderBack word={"Cancelar"} />
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
                  defaultValue={dataUser.name}
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
                    <img src={dataUser.photo} />
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
