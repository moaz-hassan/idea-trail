import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore";
import { app } from "@/lib/firebase"; // Make sure this path is correct

const db = getFirestore(app);

export async function getArticlesByIds(ids = []) {
  try {
    // Validate input
    if (!ids?.length) {
      return "No IDs provided";
    }

    // Filter out any invalid IDs and ensure they're strings
    const validIds = ids.filter((id) => {
      if (!id || typeof id !== "string") {
        return false;
      }
      return true;
    });

    if (!validIds.length) {
      return "No valid IDs after filtering";
    }

    // Firestore 'in' queries are limited to 10 items, so we need to batch
    const batchSize = 10;
    const batches = [];

    for (let i = 0; i < validIds.length; i += batchSize) {
      const batch = validIds.slice(i, i + batchSize);
      batches.push(batch);
    }

    // Execute all batches in parallel
    const batchPromises = batches.map(async (batch) => {
      try {
        const articlesRef = collection(db, "articles");
        // Use documentId() for querying by document ID
        const q = query(articlesRef, where(documentId(), "in", batch));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          return `getArticlesByIds: No documents found for batch:`, batch;
        }

        return snapshot.docs
          .map((doc) => {
            try {
              const data = doc.data();
              return {
                id: doc.id,
                ...data,
                // Ensure required fields exist with defaults
                title: data.title || "Untitled Article",
                subtitle: data.subtitle || doc.id,
                featuredImage: data.featuredImage || "/default-article.jpg",
                category: data.category || "Uncategorized",
                excerpt: data.excerpt || "",
                readingTime: data.viewsNum || "5",
                publishDate: data.publishedDate || new Date().toISOString(),
                createdAt: data.createdAt || new Date().toISOString(),
                updatedAt: data.updatedAt || new Date().toISOString(),
              };
            } catch (err) {
              return (
                "getArticlesByIds: Error processing document:", doc.id, err
              );
            }
          })
          .filter(Boolean);
      } catch (batchError) {
        return "getArticlesByIds: Error processing batch:", batch, batchError;
      }
    });

    // Wait for all batches to complete
    const batchResults = await Promise.all(batchPromises);

    // Flatten results from all batches
    const allArticles = batchResults.flat();

    // Sort articles to maintain original order if needed
    const sortedArticles = allArticles.sort((a, b) => {
      const aIndex = validIds.indexOf(a.id);
      const bIndex = validIds.indexOf(b.id);
      return aIndex - bIndex;
    });

    return sortedArticles;
  } catch (error) {
    return "Unexpected error:", error;
  }
}


// export async function getArticlesByCustomIds(ids = []) {
//   try {
//     if (!ids?.length) return [];

//     const validIds = ids.filter((id) => id && typeof id === "string");
//     if (!validIds.length) return [];

//     const batchSize = 10;
//     const batches = [];

//     for (let i = 0; i < validIds.length; i += batchSize) {
//       const batch = validIds.slice(i, i + batchSize);
//       batches.push(batch);
//     }

//     const batchPromises = batches.map(async (batch) => {
//       try {
//         const articlesRef = collection(db, "articles");
//         // Query by custom 'id' field instead of document ID
//         const q = query(articlesRef, where("id", "in", batch));
//         const snapshot = await getDocs(q);

//         if (snapshot.empty) return [];

//         return snapshot.docs
//           .map((doc) => {
//             try {
//               const data = doc.data();
//               return {
//                 docId: doc.id, // Document ID
//                 ...data,
//                 // Ensure required fields exist with defaults
//                 title: data.title || "Untitled Article",
//                 slug: data.slug || data.id || doc.id,
//                 featuredImage: data.featuredImage || "/default-article.jpg",
//                 category: data.category || "Uncategorized",
//                 excerpt: data.excerpt || "",
//                 readingTime: data.readingTime || "5",
//                 publishDate: data.publishDate || new Date().toISOString(),
//               };
//             } catch (err) {
//               console.error("Error processing document:", doc.id, err);
//               return null;
//             }
//           })
//           .filter(Boolean);
//       } catch (batchError) {
//         console.error("Error processing batch:", batch, batchError);
//         return [];
//       }
//     });

//     const batchResults = await Promise.all(batchPromises);
//     return batchResults.flat();
//   } catch (error) {
//     console.error("Error in getArticlesByCustomIds:", error);
//     return [];
//   }
// }

// /**
//  * Utility function to check if Firestore is properly initialized
//  * @returns {boolean} True if Firestore is initialized
//  */
// export function isFirestoreInitialized() {
//   try {
//     const testDb = getFirestore(app);
//     return !!testDb;
//   } catch (error) {
//     console.error("Firestore initialization check failed:", error);
//     return false;
//   }
// }
