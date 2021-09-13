import React from "react";
import GoogleMapReact from "google-map-react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonSpinner,
  IonGrid,
} from "@ionic/react";
import "./styles.css";

const HomeView = (props: any) => {
  const { center, latitude, longitude, getGeoLocation, loading } = props;
  return (
    <>
      <IonContent>
        {loading && (
          <div className="full-content">
            <IonSpinner name="lines" />
          </div>
        )}
        {!loading && (
          <div className="GeoMap">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "Your-key",
              }}
              defaultCenter={center}
              defaultZoom={22}
            />
          </div>
        )}
        {/*<IonItem className='geoAbs'>*/}
        {/*    <IonLabel>*/}
        {/*        <IonText>lat={latitude}</IonText>*/}
        {/*        <IonText> lng={longitude}</IonText>*/}
        {/*    </IonLabel>*/}
        {/*</IonItem>*/}
        {/*<IonButton onClick={getGeoLocation} className='geoFooter'>Get Current Location</IonButton>*/}
      </IonContent>
    </>
  );
};
export default HomeView;
