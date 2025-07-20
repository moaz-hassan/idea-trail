import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/HeroSection";
import AnalysisSection from "@/components/AnalysisSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import SearchSection from "@/components/SearchSection";
import CategoriesSection from "@/components/CategoriesSection";
import LatestArticlesSection from "@/components/LatestArticlesSection";
import StayUpdatedSection from "@/components/StayUpdatedSection";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AnalysisSection />
      <WhyChooseUsSection />
      <SearchSection />
      <CategoriesSection />
      <LatestArticlesSection />
      <StayUpdatedSection />
      <Footer />
    </>
  );
}
