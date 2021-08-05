import { db } from "../firebaseConfig";

let Centers;

export default Centers = {
  getAll: () => {
    return db.collection("medicalCenters");
  },
  getCenterByID: (id: string) => {
    return db.collection("medicalCenters").doc(id);
  },
  getCommentsByIDCenter: (id: string) => {
    return db.collection("medicalCenters").doc(id).collection("comments");
  },
  getCommentByIDCenter: (id: string, commentID: string) => {
    return db.collection("medicalCenters").doc(id).collection("comments").doc(commentID);
  },
  deleteCommentByIDCenter: (id: string, commentID: string) => {
    return db
      .collection("medicalCenters")
      .doc(id)
      .collection("comments")
      .doc(commentID)
      .delete();
  },

};
