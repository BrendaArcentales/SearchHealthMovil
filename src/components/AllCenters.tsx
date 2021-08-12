import React, { useState } from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonThumbnail,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import useMedicalCenters from "../hooks/useMedicalCenters";

interface ContainerProps {}

const AllCenters: React.FC<ContainerProps> = () => {
  const [listCenter] = useMedicalCenters();
  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState<
    "Todos" | "Norte" | "Centro" | "Sur"
  >("Todos");
  const selectOptions = {
    header: "Elija el sector",
  };

  return (
    <IonContent fullscreen>
      <IonSearchbar
        value={searchText}
        onIonChange={(e) => setSearchText(e.detail.value!)}
      />
      <IonList lines="none">
        <IonItem>
          <IonLabel>Sector</IonLabel>
          <IonSelect
            value={location}
            interfaceOptions={selectOptions}
            cancelText={"Cancelar"}
            onIonChange={(e) => setLocation(e.detail.value as any)}
          >
            <IonSelectOption value="Todos">Todos</IonSelectOption>
            <IonSelectOption value="Norte">Norte</IonSelectOption>
            <IonSelectOption value="Centro">Centro</IonSelectOption>
            <IonSelectOption value="Sur">Sur</IonSelectOption>
          </IonSelect>
        </IonItem>
      </IonList>

      <IonList>
        {listCenter
          .filter((val: any) => {
            if (location == "Todos") {
              return val;
            } else {
              return val.sector == location;
            }
          })
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
            <IonItem
              key={center.id}
              lines="full"
              detail={true}
              routerLink={`/centerDetail/${center.id}`}
            >
              <IonThumbnail slot="start">
                <img src={center.photo} />
              </IonThumbnail>
              <IonLabel className={"ion-text-wrap"}>
                <h2>{center.name} </h2>
                <h4 className={"ion-text-end"}>{center.sector}</h4>
                <p>{center.type}</p>
              </IonLabel>
            </IonItem>
          ))}
      </IonList>
    </IonContent>
  );
};

export default AllCenters;
