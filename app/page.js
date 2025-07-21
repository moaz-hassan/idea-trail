import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalysisSection from "@/components/AnalysisSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import SearchSection from "@/components/SearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import StayUpdatedSection from "@/components/StayUpdatedSection";
import Footer from "@/components/layout/Footer";
import getAllArticles from "@/lib/db_functions/getAllArticles";
export default async function Home() {
  const articles = await getAllArticles();
  let sortedArticles = articles.sort((a, b) => {
    return b.viewsNum - a.viewsNum;
  });
  return (
    <>
      <Navbar />
      <HeroSection headerArticle={sortedArticles[0]} />
      <AnalysisSection />
      <WhyChooseUsSection />
      <SearchSection />
      <CategoriesSection articles={articles} />
      <LatestArticlesSection latestArticles={sortedArticles} />
      <StayUpdatedSection />
      <Footer />
    </>
  );
}
