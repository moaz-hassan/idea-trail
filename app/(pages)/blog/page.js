import getAllArticles from "@/lib/db_functions/getAllArticles";
import BlogHeaderSection from "@/components/blog/BlogHeaderSection";
import LatestBlogArticlesSection from "@/components/blog/LatestBlogArticlesSection";
import ReaderFavoritesSection from "@/components/blog/ReaderFavoritesSection";
import IndustryInsightsSection from "@/components/blog/IndustryInsightsSection";
import QuickReadsSection from "@/components/blog/QuickReadsSection";
import CuratedCollectionsSection from "@/components/blog/CuratedCollectionsSection";
import MostViewedSection from "@/components/blog/MostViewedSection";
import EditorsPicksSection from "@/components/blog/Editor'sPicksSection";
import TrendingTagsSection from "@/components/blog/TrendingTagsSection";
import FromAuthorsYouFollowSection from "@/components/blog/FromAuthorsYouFollowSection";
import { getAllPublishersWithStats } from "@/lib/db_functions/getAllPublishersWithStats";
import getOwnUserData from "@/lib/db_functions/getOwnUserData";
import NewPublishersSection from "@/components/blog/NewPublishersSection";

const Blog = async () => {
  const allArticles = await getAllArticles();
  const publishers = await getAllPublishersWithStats();
  const user = await getOwnUserData();
  const latestArticles = allArticles.slice(0, 6);
  const newVoices = await calcNewVoices();
  const followedAuthorsArticles = await calcFollowedAuthorsArticles();
  const readerFavorites = calcReaderFavorites();
  const industryInsights = calcIndustryInsights();
  const mostViewed = calcMostViewedArticles();
  const editorsPicks = calcEditorPicks();
  let trendingTags = calcTrendingTags();


  async function calcFollowedAuthorsArticles() {
    if (!user || !user.following || user.following.length === 0) return [];

    const followedPublisherIds = user.following;
    const followedArticles = [];

    for (const publisher of publishers) {
      if (followedPublisherIds.includes(publisher.id) && publisher.articles) {
        followedArticles.push(...publisher.articles);
      }
    }

    return followedArticles;
  }

  async function calcNewVoices() {
    const newVoices = [];

    for (const publisher of publishers) {
      if (publisher.articles && publisher.articles.length <= 2) {
        newVoices.push(...publisher.articles);
      }
    }

    return newVoices;
  }

  function calcReaderFavorites() {
    return [...allArticles]
      .sort(
        (a, b) =>
          b.likesNum +
          b.saveTimes +
          b.comments.length * 2 -
          (a.likesNum + a.saveTimes + a.comments.length * 2)
      )
      .slice(0, 3);
  }

  function calcMostViewedArticles() {
    return [...allArticles].sort((a, b) => b.viewsNum - a.viewsNum).slice(0, 3);
  }

  function calcIndustryInsights() {
    return [...allArticles]
      .sort((a, b) => b.comments.length * 2 - a.comments.length * 2)
      .slice(0, 3);
  }

  function calcEditorPicks() {
    return [...allArticles]
      .sort(
        (a, b) =>
          b.viewsNum +
          b.comments.length * 2 -
          (a.viewsNum + a.comments.length * 2)
      )
      .slice(0, 3);
  }

  function calcTrendingTags() {
    const tags = {};

    for (const article of allArticles) {
      for (const tag of article.tags) {
        tags[tag] = (tags[tag] || 0) + 1;
      }
    }

    const sortedTags = Object.keys(tags)
      .sort((a, b) => tags[b] - tags[a])
      .slice(0, 10);

    return sortedTags;
  }

  const moodTags = [
    "Relaxed",
    "Inspired",
    "Curious",
    "Motivated",
    "Reflective",
    "Adventurous",
  ];
  const quickReads = [
    { id: 1, title: "5-Minute Mindfulness Exercises", time: 5 },
    { id: 2, title: "10 Tips for Better Productivity", time: 3 },
    { id: 3, title: "7 Ways to Boost Your Creativity", time: 4 },
  ];
  const curatedCollections = [
    {
      title: "Technology",
      description: "Explore our handpicked selection of must-read books.",
      articles: 12,
    },
    {
      title: "Creativity",
      description: "Discover captivating stories by leading artists.",
      articles: 8,
    },
    {
      title: "Health",
      description: "Improve your well-being with science-backed insights.",
      articles: 15,
    },
  ];

  return (
    <div className="mt-20 min-h-screen bg-gray-50 dark:bg-slate-900">
      <BlogHeaderSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-22">
          <div className="lg:col-span-3 space-y-12">
            <LatestBlogArticlesSection latestArticles={latestArticles} />
            {newVoices.length > 1 && (
              <NewPublishersSection articles={newVoices} />
            )}
            {followedAuthorsArticles.length > 0 && (
              <FromAuthorsYouFollowSection articles={followedAuthorsArticles} />
            )}
            <ReaderFavoritesSection readerFavorites={readerFavorites} />
            <IndustryInsightsSection industryInsights={industryInsights} />
            <QuickReadsSection quickReads={quickReads} />
            <CuratedCollectionsSection
              curatedCollections={curatedCollections}
            />
          </div>
          <div className="space-y-8">
            <MostViewedSection mostViewed={mostViewed} />
            <EditorsPicksSection editorsPicks={editorsPicks} />
            <TrendingTagsSection trendingTags={trendingTags} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
