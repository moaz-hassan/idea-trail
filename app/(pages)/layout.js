import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Idea Trail",
  description: "IdeaTrail",
};

export default function PagesLayout({ children }) {
  return (
    // <html lang="en">
    <>
        <Navbar />
        {children}
        <Footer />
    </>
    // </html>
  );
}
