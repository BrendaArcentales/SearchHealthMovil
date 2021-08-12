import { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";

const Comments: (id: any) => [any] = (id) => {
  const [dataComment, setDataComment] = useState<any>([]);
  useEffect(() => {
    medicalCenters
      .getCommentsByIDCenter(id)
      .orderBy("create", "desc")
      .onSnapshot((querySnapshot) => {
        let list: any = [];
        querySnapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDataComment(list);
      });
  }, [id]);

  return [dataComment];
};

export default Comments;
