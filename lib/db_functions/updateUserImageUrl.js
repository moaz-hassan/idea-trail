import { db } from "../firebase"; // Adjust as needed
import { doc, updateDoc } from "firebase/firestore";

export default async function updateUserImageUrl(userId, newUrl) {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    imgUrl: newUrl,
  });
}
