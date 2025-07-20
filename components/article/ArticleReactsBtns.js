"use client";

import { useEffect, useState } from "react";
import { Heart, Bookmark, Share } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { getDoc, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";

const ArticleReactsBtns = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [user, setUser] = useState(null);
  const { articleId } = useParams();

  // Get user session
  useEffect(() => {
    (async () => {
      const res = await clientCheckSessionValid();
      setUser(res?.user);
    })();
  }, []);

  // Load initial state (likes/saves)
  useEffect(() => {
    if (!user?.uid || !articleId) return;
    (async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setLiked(userData?.likedArticles?.includes(articleId));
        setSaved(userData?.savedArticles?.includes(articleId));
      } catch (err) {
        console.error("Error fetching like/save state:", err);
      }
    })();
  }, [user, articleId]);

  const handleLike = async () => {
    if (!user?.uid) return toast.error("Please login to like articles.");
    const userRef = doc(db, "users", user.uid);
    const articleRef = doc(db, "articles", articleId);

    try {
      if (liked) {
        // Remove like
        await updateDoc(userRef, { likedArticles: arrayRemove(articleId) });
        await updateDoc(articleRef, { likedBy: arrayRemove(user.uid) });
        toast.success("Like removed");
      } else {
        // Add like
        await updateDoc(userRef, { likedArticles: arrayUnion(articleId) });
        await updateDoc(articleRef, { likedBy: arrayUnion(user.uid) });
        toast.success("Article liked!");
      }
      setLiked(!liked);
    } catch (err) {
      console.error("Like update failed:", err);
      toast.error("Failed to update like. Check your access.");
    }
  };

  const handleSave = async () => {
    if (!user?.uid) return toast.error("Please login to save articles.");
    const userRef = doc(db, "users", user.uid);
    const articleRef = doc(db, "articles", articleId);

    try {
      if (saved) {
        // Remove from saved
        await updateDoc(userRef, { savedArticles: arrayRemove(articleId) });
        await updateDoc(articleRef, { savedBy: arrayRemove(user.uid) });
        toast.success("Removed from saved");
      } else {
        // Add to saved
        await updateDoc(userRef, { savedArticles: arrayUnion(articleId) });
        await updateDoc(articleRef, { savedBy: arrayUnion(user.uid) });
        toast.success("Article saved!");
      }
      setSaved(!saved);
    } catch (err) {
      console.error("Save update failed:", err);
      toast.error("Failed to update saved. Check your access.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Check out this article",
        url: window.location.href,
      });
    } else {
      toast("Your browser doesn't support the Share API.");
    }
  };

  return (
    <div className="flex items-center space-x-3 ml-6">
      <button
        onClick={handleLike}
        className={`p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl hover:scale-110 ${
          liked
            ? "text-red-500 bg-red-500/20 border-red-400/30"
            : "text-white/70 hover:text-red-400 hover:bg-red-500/20 hover:border-red-400/30"
        }`}
      >
        <Heart className="w-5 h-5" />
      </button>

      <button
        onClick={handleSave}
        className={`p-4 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl hover:scale-110 ${
          saved
            ? "text-blue-500 bg-blue-500/20 border-blue-400/30"
            : "text-white/70 hover:text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/30"
        }`}
      >
        <Bookmark className="w-5 h-5" />
      </button>

      <button
        onClick={handleShare}
        className="p-4 text-white/70 hover:text-green-400 hover:bg-green-500/20 rounded-2xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-green-400/30 shadow-lg hover:shadow-xl hover:scale-110"
      >
        <Share className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ArticleReactsBtns;
