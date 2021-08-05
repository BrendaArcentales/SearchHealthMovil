import React from "react";
import { IonHeader, IonToolbar, IonButtons, IonBackButton } from "@ionic/react";

type HeaderProps = {
  pageName: string;
};

const HeaderBack: React.FC<HeaderProps> = ({ pageName }: HeaderProps) => {
  return (
    <IonHeader translucent={true}>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton
            text="Regresar"
            color="primary"
            defaultHref={pageName}
          />
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default HeaderBack;
