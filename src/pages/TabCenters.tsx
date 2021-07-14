import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonCard,
  IonThumbnail,
} from "@ionic/react";
import { useEffect, useState } from "react";

import { medicalCenter } from "../modelo/medicalCenters";
import "./TabCenters.css";
import firebase from "firebase/app";
import { Link } from "react-router-dom";
import { addCircleOutline } from "ionicons/icons";
const TabCenters: React.FC = () => {
  const [listCenter, setListCenter] = useState<medicalCenter[]>([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const getlistCenter = async () => {
      try {
        let list: medicalCenter[] = [];
        const res = await firebase
          .firestore()
          .collection("medicalCenters")
          .get();
        console.log("datos", res);
        res.forEach((doc) => {
          let obj = {
            id: doc.id,
            photo: doc.data().photo,
            name: doc.data().name,
            email: doc.data().email,
            type: doc.data().type,
            sector: doc.data().sector,
            days: doc.data().days,
            start_time: doc.data().start_time,
            end_time: doc.data().end_time,
            location: {
              address: doc.data().address,
              latitude: doc.data().latitude,
              longitude: doc.data().longitude,
            },
            social_media: {
              facebook: doc.data().facebook,
              instagram: doc.data().instagram,
              website: doc.data().website,
            },
            specialties: doc.data().specialties,
          };
          list.push(obj);
        });
        setListCenter(list);
      } catch (error) {}
    };
    getlistCenter();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de centros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
        ></IonSearchbar>
        <IonList>
          {listCenter
            .filter((val) => {
              if (searchText == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return val;
              }
            }).map((center) => (
              <IonItem key={center.id} >
                <IonThumbnail slot="start">
                  <img src={center.photo}></img>
                </IonThumbnail>
                <IonLabel>
                  <h2>{center.name}</h2>
                  <h3>Sector: {center.sector}</h3>
                  <p>Tipo:{center.type}</p>
                  <p>
                    <Link to={`/centers/centerDetail/${center.id}`}>
                      <IonIcon icon={addCircleOutline}></IonIcon>Ver mas
                      detalles
                    </Link>
                  </p>
                </IonLabel>
              </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TabCenters;
