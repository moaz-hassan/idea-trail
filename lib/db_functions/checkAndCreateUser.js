import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default async function checkAndCreateUser(user) {
  if (!user || !user.uid) {
    return { success: false, error: "Invalid user object" };
  }

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return {
      success: true,
      user: userSnap.data(),
    };
  }

  const newUserData = {
    uid: user.uid,
    name: user.displayName || "Anonymous",
    email: user.email,
    photoURL: user.photoURL || "",
    role: "user",
    bio: "",
    status: "active",
    createdAt: serverTimestamp(),
    lastLogin: serverTimestamp(),
    followers: [],
    following: [],
    likedArticles: [],
    sharedArticles: [],
    viewedArticles: [],
    savedArticles: [],
    comments: [],
    socialLinks: {
      website: "",
      twitter: "",
      github: "",
    },
  };

  try {
    await setDoc(userRef, newUserData);

    return {
      success: true,
      user: {
        ...newUserData,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      },
    };
  } catch (error) {
    console.error("Error creating user:", error);
    return {
      success: false,
      error: error.message || "Failed to create user",
    };
  }
}
