import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function saveUserToDB(user) {
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: user.displayName || "Anonymous",
      email: user.email,
      photoURL: user.photoURL || "",
      role: "user",
      bio: "",
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),

      stats: {
        followersCount: 0,
        followingCount: 0,
        articlesPublished: 0,
        likesGiven: 0,
        commentsCount: 0,
      },
      articles: [],
      followers: [],
      following: [],
      likedArticles: [],
      sharedArticles: [],
      savedArticles: [],
      comments: [],
      socialLinks: {
        website: "",
        twitter: "",
        github: "",
      },
    });
    return { success: true };
  } catch (error) {
    console.error("Error saving user to DB:", error);
    return {
      success: false,
      error: error.message || "Failed to save user data",
    };
  }
}
