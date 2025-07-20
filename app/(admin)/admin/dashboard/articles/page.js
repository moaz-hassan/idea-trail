import ArticlesTable from "@/components/admin/ArticlesTable";
import getAllArticles from "@/lib/db_functions/getAllArticles";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Articles Management</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ArticlesTable articles={articles} />
      </div>
    </div>
  );
}
