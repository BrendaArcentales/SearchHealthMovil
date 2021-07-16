import { db } from "../../firebase/firebaseConfig";

let Users;

export default Users = {
  getUserInfo: (id: string) => {
    return db.collection("users").doc(id);
  },
  getFavoritesUser: (id: string) => {
    return db.collection("users").doc(id).collection("favorites");
  },
};
