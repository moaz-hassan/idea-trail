import Image from "next/image";
import React from "react";

const CuratedCollectionsSection = ({ curatedCollections }) => {
  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Curated Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {curatedCollections.map((collection, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[4/3] overflow-hidden rounded-lg mb-3">
              <Image
                src={"/images/WebArticle.jpg"}
                alt={collection.title}
                width={500}
                height={375}
                priority
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {collection.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              {collection.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CuratedCollectionsSection;
