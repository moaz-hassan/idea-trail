import Link from "next/link";
import { Bookmark, BookOpen, Heart, TrendingUp, Settings } from "lucide-react";
import AuthWrapperServer from "@/components/AuthWrapper.server";
import getOwnUserData from "@/lib/db_functions/getOwnUserData";
import { getArticlesByIds } from "@/lib/db_functions/getArticlesByIds";
import UserProfileHeader from "@/components/profile/UserProfileHeader";
import ArticlesSection from "@/components/profile/ArticlesSection";

const UserProfile = async () => {
  const user = await getOwnUserData();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            User not found or session expired. Please sign in to continue.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  // Filter out any null/undefined articles and ensure they have required fields
  const filterValidArticles = (articles) => {
    if (!Array.isArray(articles)) return [];
    
    return articles.filter((article) => {
      if (!article || !article.id) return false;

      // Ensure required fields exist with defaults
      article.title = article.title || "Untitled Article";
      article.slug = article.slug || article.id;
      article.featuredImage = article.featuredImage || "/default-article.jpg";
      article.category = article.category || "Uncategorized";
      article.excerpt = article.excerpt || "";
      article.readingTime = article.readingTime || "5";
      article.publishDate = article.publishDate || new Date().toISOString();

      return true;
    });
  };

  const [likedArticlesRaw, savedArticlesRaw] = await Promise.all([
    getArticlesByIds(user?.likedArticles || []),
    getArticlesByIds(user?.savedArticles || []),
  ]);

  // Apply filtering to ensure valid articles
  const likedArticles = filterValidArticles(likedArticlesRaw);
  const savedArticles = filterValidArticles(savedArticlesRaw);

  const userData = {
    uid: user.uid,
    name: user.name || "Anonymous",
    email: user.email || "",
    bio: user.bio || "",
    joinDate: user.createdAt?._seconds
      ? new Date(user.createdAt._seconds * 1000).toLocaleDateString()
      : "",
    avatar: user.photoURL || "/default-avatar.png",
    interests: user.interests || [],
    readingGoal: user.readingGoal || 50,
    articlesRead: user.articles?.length || 0,
  };

  const stats = [
    {
      label: "Articles Read",
      value: userData.articlesRead,
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      bgColor:
        "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      label: "Liked Articles",
      value: likedArticles.length,
      icon: Heart,
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      label: "Saved Articles",
      value: savedArticles.length,
      icon: Bookmark,
      color: "from-purple-500 to-purple-600",
      bgColor:
        "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      label: "Reading Goal",
      value: `${userData.articlesRead}/${userData.readingGoal}`,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor:
        "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20",
      iconColor: "text-green-600 dark:text-green-400",
    },
  ];

  return (
    <AuthWrapperServer requireAuth={true} requiredRoles={["user"]}>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
        <UserProfileHeader userData={userData} user={user} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                ></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced Articles Sections */}
          <div className="space-y-12">
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-slate-700/50">
              <ArticlesSection
                articles={likedArticles}
                title="Liked Articles"
                Icon={Heart}
                accentColor="text-red-500"
              />
            </div>

            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-slate-700/50">
              <ArticlesSection
                articles={savedArticles}
                title="Saved Articles"
                Icon={Bookmark}
                accentColor="text-purple-500"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthWrapperServer>
  );
};

export default UserProfile;
