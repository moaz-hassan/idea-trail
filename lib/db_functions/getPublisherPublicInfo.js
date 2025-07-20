import { adminDB } from "@/lib/firebase-admin";

export default async function getPublisherPublicInfo(publisherId) {
  try {
    const userDocRef = adminDB.collection("users").doc(publisherId);
    const userSnap = await userDocRef.get();

    if (!userSnap.exists) {
      return { success: false, error: "Publisher not found" };
    }

    const userData = userSnap.data();

    const articleIds = userData?.articles || [];

    const articles = [];

    if (articleIds.length > 0) {
      const articlePromises = articleIds.map((id) =>
        adminDB.collection("articles").doc(id).get()
      );

      const articleDocs = await Promise.all(articlePromises);

      for (const doc of articleDocs) {
        if (doc.exists) {
          const data = doc.data();
          articles.push({
            id: doc.id,
            title: data?.title,
            status: data?.status,
            slug: data?.slug,
            createdAt: data?.createdAt,
            coverImage: data?.coverImage || null,
          });
        }
      }
    }

    const followersCount = userData?.followers?.length ?? userData?.followersCount ?? 0;

    const publicProfile = {
      id: publisherId,
      name: userData?.name || "",
      imgUrl: userData?.imgUrl || "",
      bio: userData?.bio || "",
      role: userData?.role || "user",
      joinedAt: userData?.createdAt || null,
      followersCount,
      articles,
    };

    return { success: true, profile: publicProfile };
  } catch (error) {
    console.error("Error fetching public publisher profile:", error);
    return { success: false, error: "Internal Server Error" };
  }
}
