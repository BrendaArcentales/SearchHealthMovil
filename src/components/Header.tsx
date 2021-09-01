import React, { useContext } from "react";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { exitOutline } from "ionicons/icons";
import AuthProvider from "../services/AuthProvider";
import { useHistory } from "react-router";

type HeaderProps = {
  pageName: string;
};

const Header: React.FC<HeaderProps> = ({ pageName }: HeaderProps) => {
  const auth = useContext(AuthProvider);
  const history = useHistory();

  const handleSignoutClick = () => {
    auth.logout().then(() => {
      history.replace("/login");
    });
  };

  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonTitle size={"small"}>{pageName}</IonTitle>
        <IonButtons slot="end">
          <IonButton size="small" color="primary" onClick={handleSignoutClick}>
            Salir
            <IonIcon slot="end" icon={exitOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
