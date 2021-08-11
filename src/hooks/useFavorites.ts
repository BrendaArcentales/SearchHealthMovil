import { useEffect, useState } from "react";
import user from "../firebase/services/user";

const Favorites: (id: any) => [any] = (id) => {
  const [listFavorites, setListFavorites] = useState<any>([]);
  useEffect(() => {
    user
      .getFavoritesUser(id)
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        let list: any = [];
        querySnapshot.docs.forEach((doc) => {
          list.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setListFavorites(list);
      });
  }, []);

  return [listFavorites];
};
export default Favorites;
