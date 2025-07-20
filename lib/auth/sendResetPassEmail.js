import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
