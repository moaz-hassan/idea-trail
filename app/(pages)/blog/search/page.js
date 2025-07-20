import getAllArticles from "@/lib/db_functions/getAllArticles";
import SearchClientPage from "./SearchClientPage";

const extractCategories = (articles) => {
  const categoryMap = {};
  
  articles.forEach(article => {
    const category = article.category || "Uncategorized";
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  });

  return Object.entries(categoryMap).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/ /g, '-'),
    count
  })).sort((a, b) => b.count - a.count);
};

const Search = async () => {
  const articles = await getAllArticles();
  const categories = extractCategories(articles);

  return (
    <SearchClientPage
      articles={articles}
      categories={categories}
    />
  );
};

export default Search;