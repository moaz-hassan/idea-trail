import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getAllArticlesIds() {
  try {
    const snapshot = await getDocs(collection(db, "articles"));
    const ids = snapshot.docs.map((doc) => doc.id);
    return ids;
  } catch (error) {
    console.error("Error fetching article IDs:", error);
    return [];
  }
}
