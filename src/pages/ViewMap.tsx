import { IonPage } from "@ionic/react";
import "./TabUserProfile.css";

import React, { useEffect, useState } from "react";
import HomeContainer from "../components/Map/HomeContainer";
import useCenter from "../hooks/useCenter";
import { useParams } from "react-router-dom";
import HeaderBack from "../components/HeaderBack";

const ViewMap: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dataCenter] = useCenter(id);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [checkValues, setCheckValues] = useState(false);
  useEffect(() => {
    if (dataCenter.location) {
      setLatitude(parseFloat(dataCenter.location.latitude));
      setLongitude(parseFloat(dataCenter.location.longitude));
      setCheckValues(true);
    }
  }, [dataCenter]);

  return (
    <IonPage>
      <HeaderBack word={"Regresar"} />
      {checkValues ? (
        <HomeContainer>{{ lat: latitude, lng: longitude }}</HomeContainer>
      ) : (
        <div>Cargando</div>
      )}
    </IonPage>
  );
};

export default ViewMap;
