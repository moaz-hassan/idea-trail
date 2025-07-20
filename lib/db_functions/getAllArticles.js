import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function getAllArticles() {
  try {
    const snapshot = await getDocs(collection(db, "articles"));
    const articles = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}
