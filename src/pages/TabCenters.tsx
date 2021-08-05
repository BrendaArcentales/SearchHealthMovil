import React from "react";
import { IonPage } from "@ionic/react";

import "./TabCenters.css";
import AllCenters from "../components/AllCenters";
import Header from "../components/Header";

const TabCenters: React.FC = () => {
  return (
    <IonPage>
      <Header pageName={"Centros"} />
      <AllCenters />
    </IonPage>
  );
};

export default TabCenters;
