import { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";

const MedicalCenters = () => {
  const [listCenter, setListCenter] = useState<any>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  useEffect(() => {
    if (isSubscribed) {
      const getlistCenter = async () => {
        let list: any = [];
        const res = await medicalCenters.getAll().get();
        res.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListCenter(list);
      };
      getlistCenter();
    }
    return () => setIsSubscribed(false);
  }, []);
  return [listCenter];
};
export default MedicalCenters;
