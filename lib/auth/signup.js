import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase";

const signup = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 👤 1. Update displayName in Auth
    await updateProfile(user, { displayName: name });

    return { user };
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    return { error: error.message };
  }
};

export default signup;
