import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

export async function rescheduleArticleById(articleId, newDateISO) {
  const session = await clientCheckSessionValid();
  if (!session.valid || !session.user) {
    throw new Error("Unauthorized");
  }

  try {
    await updateDoc(doc(db, "articles", articleId), {
      scheduleDate: newDateISO,
    });

    return { success: true };
  } catch (err) {
    console.error("Error rescheduling article:", err);
    return { success: false, error: err.message };
  }
}
