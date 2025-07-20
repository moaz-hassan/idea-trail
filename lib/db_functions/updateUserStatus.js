import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from "@/lib/firebase";
import clientCheckSessionValid from "../auth/clientCheckSessionValid";
import toast from "react-hot-toast";

const db = getFirestore(app);

export const updateUserStatus = async (userId, status) => {
  console.log("userId:", userId, "status:", status);

  const allowedStatuses = ["active", "blocked"];
  if (!allowedStatuses.includes(status)) {
    toast.error("Invalid status value");
    return { success: false, error: "Invalid status value" };
  }

  const session = await clientCheckSessionValid();
  console.log("Session:", session);

  if (!session.valid || session.user.role !== "admin") {
    toast.error("Unauthorized");
    return { success: false, error: "Unauthorized" };
  }

  const toastId = toast.loading("Updating user status...");

  try {
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      toast.error("User not found", { id: toastId });
      return { success: false, error: "User not found" };
    }

    await updateDoc(userRef, { status });

    toast.success(
      `User has been ${status === "blocked" ? "blocked" : "unblocked"} successfully`,
      { id: toastId }
    );

    return { success: true };
  } catch (err) {
    console.error("Error updating user status:", err);
    toast.error("Failed to update user status", { id: toastId });
    return { success: false, error: err.message || "Unknown error" };
  }
};
