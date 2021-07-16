import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonThumbnail,
} from "@ionic/react";
import { Link } from "react-router-dom";
import { addCircleOutline } from "ionicons/icons";
import useMedicalCenters from "../data/useMedicalCenters";

interface ContainerProps {}

const AllCenters: React.FC<ContainerProps> = () => {
  const [listCenter] = useMedicalCenters();

  const [searchText, setSearchText] = useState("");

  console.log("cargo list", listCenter);
  return (
    <IonContent fullscreen>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
      />
      <IonList>
        {listCenter
          .filter((val: any) => {
            if (searchText == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return val;
            }
          })
          .map((center: any) => (
            <IonItem key={center.id}>
              <IonThumbnail slot="start">
                <img src={center.photo} />
              </IonThumbnail>
              <IonLabel>
                <h2>{center.name}</h2>
                <h3>Sector: {center.sector}</h3>
                <p>Tipo:{center.type}</p>
                <p>
                  <Link to={`/centers/centerDetail/${center.id}`}>
                    <IonIcon icon={addCircleOutline} />
                    Ver mas detalles
                  </Link>
                </p>
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </IonContent>
  );
};

export default AllCenters;
