import React, { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";

const Comments: (id: any) => [any] = (id) => {
  const [dataComment, setDataComment] = useState<any>([]);
  useEffect(() => {
    medicalCenters.getCommentsByIDCenter(id).onSnapshot((querySnapshot) => {
      let list: any = [];
      querySnapshot.docs.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setDataComment(list);
    });
  }, []);

  return [dataComment];
};

export default Comments;
