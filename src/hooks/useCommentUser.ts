import { useEffect, useState } from "react";
import medicalCenters from "../firebase/services/medicalCenters";

const CommentUser: (id: any, data: any) => [any] = (id, data) => {
  const [dataComment, setDataComment] = useState<any>([]);
  useEffect(() => {
    const getlistCenter = async () => {
      const res = await medicalCenters.getCommentByIDCenter(id, data).get();
      setDataComment({ id: res.id, ...res.data() });
    };
    getlistCenter();
  }, [id, data]);

  return [dataComment];
};

export default CommentUser;
