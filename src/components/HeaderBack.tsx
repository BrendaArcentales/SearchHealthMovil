import React from "react";
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";
type HeaderProps = {
  word: string;
};
const HeaderBack: React.FC<HeaderProps> = ({ word }: HeaderProps) => {
  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text={word} color="primary" defaultHref={"/"} />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderBack;
