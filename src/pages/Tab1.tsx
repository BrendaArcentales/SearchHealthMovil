import { IonAvatar,IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonSearchbar, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { medicalCenter } from '../modelo/medicalCenters';
import './Tab1.css';
import firebase from 'firebase/app'
import { Link } from 'react-router-dom';
import { addCircleOutline} from 'ionicons/icons';
const Tab1: React.FC = () => {
    const [listCenter, setListCenter] = useState < medicalCenter[] > ([]); 
    const [searchText, setSearchText] = useState('');
    
    
    useEffect (()=>{
        const getlistCenter = async () => {
            try {
                let list: medicalCenter[] = []
                const res = await firebase.firestore().collection('medicalCenters').get();
                console.log('datos',res)
                res.forEach((doc) => {
                    let obj = {
                        id: doc.id,
                        photo:doc.data().photo,
                        name: doc.data().name,
                        email:doc.data().email,
                        type:doc.data().type,
                        sector:doc.data().sector,
                        days:doc.data().days,
                        start_time:doc.data().start_time,
                        end_time:doc.data().end_time,
                        location:{
                            address:doc.data().address,
                            latitude:doc.data().latitude,
                            longitude:doc.data().longitude
                        },
                        social_media:{
                            facebook:doc.data().facebook,
                            instagram:doc.data().instagram,
                            website:doc.data().website
                        },
                        specialties:doc.data().specialties
                    };
                    list.push(obj)
        
                });
                setListCenter(list)
            } catch (error) {}
         }
         getlistCenter ()
    },[]);
    
  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
          <IonTitle>Lista de centros</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}></IonSearchbar>
            <IonList> {
                    listCenter.map(center => (
                        <div className="home-container gradient-1">
                            <IonItem key={center.id} >
                            <IonAvatar  slot="start"><img src={center.photo}></img></IonAvatar>
                            <IonLabel>
                                <h2>{center.name}</h2>
                                <h3>Sector: {center.sector}</h3>
                                <p>Tipo:{center.type}</p>
                                <p><Link  to="/medicalCenter"><IonIcon icon={addCircleOutline}></IonIcon>Ver mas detalles</Link></p>
                            </IonLabel>
                        </IonItem>
                        </div>     
                    )) }
             </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;