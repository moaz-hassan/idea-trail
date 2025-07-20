import ChartAreaInteractive from "@/components/chart-area-interactive";
import RecentArticlesSection from "@/components/publisher/RecentArticlesSection";
import StatsCard from "@/components/StatsCard";
import getAllArticles from "@/lib/db_functions/getAllArticles";

export default async function Page() {
  const articles = await getAllArticles();
  let RecentArticles = [];
  let viewsSum = 0;
  let likesSum = 0;
  let savesSum = 0;
  for (let i = 0; i < articles.length; i++) {
    viewsSum += articles[i].viewsNum;
    likesSum += articles[i].likedBy?.length;
    savesSum += articles[i].savedBy?.length;
    if (RecentArticles.length < 5) {
      RecentArticles.push(articles[articles.length - (i + 1)]);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatsCard title={"Total Articles"} value={articles.length} />
        <StatsCard title={"Articles Views"} value={viewsSum} />
        <StatsCard title={"Articles Likes"} value={likesSum} />
        <StatsCard title={"Articles Saves"} value={savesSum} />
      </div>
      <ChartAreaInteractive articles={JSON.stringify(articles)} />
      <div className="grid grid-cols-[repeat(autofill,minmax(250px,1fr))] gap-6">
        <RecentArticlesSection
          RecentArticles={RecentArticles}
        />
      </div>
    </div>
  );
}
