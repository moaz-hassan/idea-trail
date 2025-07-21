import { getArticlesByIds } from "@/lib/db_functions/getArticlesByIds";
import ArticlesSection from "@/components/profile/ArticlesSection";
import PublisherPublicProfileHeader from "@/components/publisher/PublisherPublicProfileHeader";
import getPublisherPublicProfile from "@/lib/db_functions/getPublisherPublicInfo";
import getUsersIdsByRole from "@/lib/db_functions/getUsersIdsByRole";
import { Clock, Eye, Share2, TrendingUp } from "lucide-react";
import serverCheckSessionValid from "@/lib/auth/serverCheckSessionValid";

export async function generateStaticParams() {
  const ids = await getUsersIdsByRole("publisher");
  return ids.map((id) => ({ publisherId: id }));
}

const PublisherProfile = async ({ params }) => {
  const [profileData, userData] = await Promise.all([
    getPublisherPublicProfile(await params.publisherId),
    serverCheckSessionValid(),
  ]);

  const publisherArticles = await getArticlesByIds(
    profileData.profile.articles.map((article) => article.id)
  );

  let totalLikes = 0;
  publisherArticles.forEach((article) => {
    totalLikes += article?.likedBy?.length;
  });

  let totalViews = 0;
  publisherArticles.forEach((article) => {
    totalViews += article.viewsNum;
  });

  const publisherData = {
    uid: profileData.profile.uid,
    name: profileData.profile.name || "Anonymous",
    email: profileData.profile.email || "",
    bio: profileData.profile.bio || "",
    location: profileData.profile.location || "",
    createdAt: profileData.profile.joinedAt?.seconds
      ? new Date(
          profileData.profile.joinedAt.seconds * 1000
        ).toLocaleDateString()
      : "",
    avatar: profileData.profile.imgUrl || "/default-avatar.png",
    readingGoal: profileData.profile.readingGoal || 50,
    followers: profileData.profile.followers?.length || 0,
    following: profileData.profile.following?.length || 0,
    totalViews,
    totalLikes,
    articlesPublished: publisherArticles?.length || 0,
    achievements: profileData.profile.achievements || [],
    isVerified: profileData.profile.isVerified || false,
    website: profileData.profile.website || "",
    socialLinks: profileData.profile.socialLinks || {},
  };

  const stats = [
    {
      label: "Followers",
      value: publisherData.followers,
      iconName: "Users",
      color: "from-blue-500 to-blue-600",
      change: "+12.5%",
      changeColor: "text-green-500",
    },
    {
      label: "Total Views",
      value: publisherData.totalViews,
      iconName: "Eye",
      color: "from-green-500 to-green-600",
      change: "+23.1%",
      changeColor: "text-green-500",
    },
    {
      label: "Articles Published",
      value: publisherData.articlesPublished,
      iconName: "BookOpen",
      color: "from-orange-500 to-orange-600",
      change: "+5.2%",
      changeColor: "text-green-500",
    },
    {
      label: "Total Likes",
      value: publisherData.totalLikes,
      iconName: "Heart",
      color: "from-red-500 to-red-600",
      change: "+18.7%",
      changeColor: "text-green-500",
    },
  ];

  const achievements = [
    {
      id: 1,
      name: "Top Publisher",
      iconName: "Trophy",
      color: "from-yellow-500 to-yellow-600",
      description: "Top 10% of publishers this month",
    },
    {
      id: 2,
      name: "Verified Author",
      iconName: "Award",
      color: "from-blue-500 to-blue-600",
      description: "Verified content creator",
    },
    {
      id: 3,
      name: "Consistent Creator",
      iconName: "Target",
      color: "from-green-500 to-green-600",
      description: "Published articles for 30 days straight",
    },
    {
      id: 4,
      name: "Popular Content",
      iconName: "Zap",
      color: "from-purple-500 to-purple-600",
      description: "Article reached 10K+ views",
    },
  ];

  return (
    <div className="mt-16 min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900">
      <PublisherPublicProfileHeader
        publisherData={publisherData}
        stats={stats}
        achievements={achievements}
        userData={userData.user}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Enhanced Articles Sections */}
        <div className="space-y-12">
          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-slate-700/50">
            {/* Engagement Metrics */}
            <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-white/50 dark:border-slate-700/50">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Engagement Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {(
                      (publisherData.totalLikes / publisherData.totalViews) *
                      100
                    ).toFixed(1)}
                    %
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Like Rate
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {Math.round(
                      publisherData.totalViews / publisherData.articlesPublished
                    ).toLocaleString()}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Avg Views per Article
                  </div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {Math.round(
                      (publisherData.followers /
                        publisherData.articlesPublished) *
                        100
                    ) / 100}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Followers per Article
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-12 mb-4">
              <h3 className=" text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                Published Articles ({publisherData.articlesPublished})
              </h3>
            </div>
            <ArticlesSection
              articles={publisherArticles}
              title=""
              showStats={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublisherProfile;
