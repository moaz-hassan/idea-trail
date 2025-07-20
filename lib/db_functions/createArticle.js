import { db } from "@/lib/firebase";
import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

export default async function createArticle(
  title,
  subtitle,
  category,
  content,
  tags,
  imgUrl,
  featured,
  publishDate,
  scheduleDate,

) {
  try {
    const session = await clientCheckSessionValid();
    console.log(session);
    
    if (!session) {
      return { success: false, error: "You must be logged in." };
    }

    if (session.user.role !== "publisher") {
      return { success: false, error: "Only publishers can create articles." };
    }

    const id = uuidv4();

    const article = {
      id,
      publisherId: session.user.uid,
      publisherImgUrl,
      title: title || "",
      subtitle: subtitle || "",
      publisherName: session.user.name || session.user.uid,
      category: category || "",
      content: content || "",
      tags: tags || [],
      comments: [],
      imgUrl: imgUrl || "",
      scheduleDate: scheduleDate || new Date().toISOString(),
      status: "active",
      featured: featured || false,
      publishDate: publishDate || new Date().toISOString(),
      viewsNum: 0,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "articles", id), article);

    const userRef = doc(db, "users", session.user.uid);
    await updateDoc(userRef, {
      articles: arrayUnion(id),
    });

    return { success: true, article };
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, error: error.message };
  }
}
