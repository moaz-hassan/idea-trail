"use client";
import incrementArticleViews from "@/lib/db_functions/incrementArticleViews";
import { ChartNoAxesColumn } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ViewsNum({ viewsNum }) {
  const { articleId } = useParams();
  useEffect(() => {
    incrementArticleViews(articleId);
  }, [articleId]);

  return (
    <div className="flex items-center space-x-2">
      <ChartNoAxesColumn className="w-5 h-5" />
      <span className="font-medium">{viewsNum} Views</span>
    </div>
  );
}
