import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/lib/firebase";

const db = getFirestore(app);

export async function getAllPublishersWithStats() {
  const usersRef = collection(db, "users");
  const publisherQuery = query(usersRef, where("role", "==", "publisher"));

  const userSnapshots = await getDocs(publisherQuery);
  const publishersWithStats = [];

  for (const userDoc of userSnapshots.docs) {
    const publisher = userDoc.data();
    const publisherId = userDoc.id;

    const publisherStats = {
      id: publisherId,
      name: publisher.name || "",
      imgUrl: publisher.imgUrl || "",
      articleCount: 0,
      topCategories: [],
      topKeywords: [],
      articles: [], // ✅ Include full articles
    };

    if (!publisher.articles || publisher.articles.length === 0) {
      publishersWithStats.push(publisherStats);
      continue;
    }

    const categoryCount = {};
    const keywordCount = {};

    for (const articleId of publisher.articles) {
      const articleRef = doc(db, "articles", articleId);
      const articleSnap = await getDoc(articleRef);

      if (articleSnap.exists()) {
        const article = articleSnap.data();

        if (article.publisherId !== publisherId) continue;

        // ✅ Append article data with its id
        publisherStats.articles.push({
          id: articleId,
          ...article,
        });

        // Count categories
        const category = article.category;
        if (category) {
          categoryCount[category] = (categoryCount[category] || 0) + 1;
        }

        // Count keywords/tags
        const keywords = article.tags || [];
        keywords.forEach((kw) => {
          keywordCount[kw] = (keywordCount[kw] || 0) + 1;
        });
      }
    }

    publisherStats.articleCount = publisherStats.articles.length;
    publisherStats.topCategories = Object.entries(categoryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([cat]) => cat);

    publisherStats.topKeywords = Object.entries(keywordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kw]) => kw);

    publishersWithStats.push(publisherStats);
  }

  return publishersWithStats;
}
