import { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";

const Center: (id: any) => [any] = (id) => {
  const [dataCenter, setDataCenter] = useState<any>([]);
  useEffect(() => {
    const getlistCenter = async () => {
      const res = await medicalCenters.getCenterByID(id).get();
      setDataCenter({ id: res.id, ...res.data() });
    };
    getlistCenter();
  }, []);

  return [dataCenter];
};

export default Center;
