import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getUserStatusByEmail } from "./getUserStatusByEmail";
import checkAndCreateUser from "../db_functions/checkAndCreateUser";

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    
    const createUserRes = await checkAndCreateUser(user);
    if (!createUserRes) {
      return "An Error Occured";
    }

    const { status, exists } = await getUserStatusByEmail(user.email);

    if (!exists) {
      return { error: "User not found" };
    }

    if (status !== "active") {
      return { error: "Your account is blocked. Please contact support." };
    }

    // ✅ Get token and set session
    const token = await user.getIdToken();

    const res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!res.ok) {
      console.log(res);
      throw new Error("Failed to set session cookie");
    }

    return { user };
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return { error: error.message };
  }
};

export default login;
