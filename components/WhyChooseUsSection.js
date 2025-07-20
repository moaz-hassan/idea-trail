import { CloudLightning, Heart, Shield } from "lucide-react";
import DescriptiveCard from "@/components/ui/DescriptiveCard";
const WhyChooseUsSection = () => {
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold text-center">Why Choose Our Platform ?</h1>
        <p className="text-lg text-center mt-4 mb-8 text-gray-500">
          We&apos;re committed to delivering the highest quality content and
          user experience in the tech industry
        </p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 p-4 my-10 min-md:px-30">
        <DescriptiveCard icon={<CloudLightning className="w-16 h-16 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4" />} title={"Lightning Fast"} description={"Get the latest tech insights delivered at the speed of innovation"} />
        <DescriptiveCard icon={<Shield className="w-16 h-16 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4" />} title={"Expert Verified"} description={"All content reviewed and verified by industry professionals"} />
        <DescriptiveCard icon={<Heart className="w-16 h-16 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 p-4" />} title={"Community Driven"} description={"Built by developers, for developers and tech enthusiasts"} />
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
