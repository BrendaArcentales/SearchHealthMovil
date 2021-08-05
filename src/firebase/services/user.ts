import { db } from "../firebaseConfig";

let Users;

export default Users = {
  getUser: (id: string) => {
    return db.collection("users").doc(id);
  },
  getFavoritesUser: (id: string) => {
    return db.collection("users").doc(id).collection("favorites");
  },
  getFavoriteCenterByUser: (id: string, favoriteID: string) => {
    return db.collection("users").doc(id).collection("favorites").doc(favoriteID);
  },

};
