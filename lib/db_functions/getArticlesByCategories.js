import { adminDB } from "@/lib/firebase-admin";

export async function getArticlesByCategories(categories) {
  try {
    if (!Array.isArray(categories) || categories.length === 0) return [];

    const articlesRef = adminDB.collection("articles");
    const snapshot = await articlesRef.get();

    const allArticles = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return allArticles.filter(article =>
      categories.includes(article.category)
    );
  } catch (err) {
    console.error("Error fetching articles by categories:", err.message);
    return [];
  }
}
