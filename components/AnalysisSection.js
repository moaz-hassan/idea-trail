import { Award, BookOpen, Earth, Users } from "lucide-react";
import AnalysisCard from "./ui/DescriptiveCard";

const AnalysisSection = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4 my-50 min-md:px-30">
      <AnalysisCard
        icon={<BookOpen className="w-8 h-8 text-blue-500" />}
        num={"500"}
        title={"Articles Published"}
      />
      <AnalysisCard
        icon={<Users className="w-8 h-8 text-blue-500" />}
        num={"10K"}
        title={"Active Readers"}
      />
      <AnalysisCard
        icon={<Earth className="w-8 h-8 text-blue-500" />}
        num={"25"}
        title={"Countries Reached"}
      />
      <AnalysisCard
        icon={<Award className="w-8 h-8 text-blue-500" />}
        num={"12"}
        title={"Industry Awards"}
      />
    </div>
  );
};

export default AnalysisSection;
