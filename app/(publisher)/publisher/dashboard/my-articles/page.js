import PublisherArticlesTable from "@/components/publisher/PublisherArticlesTable";
import Loader from "@/components/ui/Loader";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-between p-4 md:p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Articles</h1>
      <Suspense fallback={<Loader size={30} />}>
        <PublisherArticlesTable />
      </Suspense>
    </div>
  );
}
