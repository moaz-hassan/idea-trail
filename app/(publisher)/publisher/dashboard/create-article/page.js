"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import createArticle from "@/lib/db_functions/createArticle";
import ArticleEditor from "@/components/publisher/ArticleEditor";
import PublishButton from "@/components/publisher/PublishButton";
import ScheduleButton from "@/components/create-article/ScheduleButton";
import ArticleForm from "@/components/create-article/ArticleForm";
import ErrorAlert from "@/components/ui/ErrorAlert";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("Technology");
  const [keywords, setKeywords] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);

  const handlePublish = async () => {
    setError("");
    setIsPublishing(true);

    // Validate inputs
    const errors = [];
    if (!title.trim()) errors.push("Title is required");
    if (!subtitle.trim()) errors.push("Subtitle is required");
    if (!content.trim()) errors.push("Content is required");
    if (!featuredImage) errors.push("Featured image is required");
    if (isScheduled && !scheduledDate)
      errors.push("Scheduled date is required");

    if (errors.length > 0) {
      setError(errors.join("\n"));
      setIsPublishing(false);
      return;
    }

    try {
      const res = await createArticle(
        title,
        subtitle,
        category,
        content,
        keywords.split(","),
        featuredImage.url,
        false,
        scheduledDate || new Date().toISOString(),
        isScheduled ? scheduledDate : ""
      );

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success(
        isScheduled
          ? "Article scheduled successfully!"
          : "Article published successfully!"
      );

      // Reset form
      setTitle("");
      setSubtitle("");
      setContent("");
      setFeaturedImage(null);
      setIsScheduled(false);
      setScheduledDate(null);
    } catch (err) {
      toast.error("Failed to publish article");
      console.error(err);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = (imageData) => {
    setFeaturedImage({
      url: imageData?.url,
      publicId: imageData?.publicId,
      fileName: imageData?.fileName,
    });
  };

  const handleImageRemove = () => {
    setFeaturedImage(null);
  };

  return (
    <div className="w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Create Article
        </h1>
        <div className="flex gap-4 mb-6">
          <ScheduleButton
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            onToggle={() => setIsScheduled(!isScheduled)}
            onDateSelect={setScheduledDate}
          />
          <PublishButton
            isScheduled={isScheduled}
            isPublishing={isPublishing}
            onClick={handlePublish}
          />
        </div>
      </div>

      <ErrorAlert error={error} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <ArticleForm
            title={title}
            subtitle={subtitle}
            category={category}
            keywords={keywords}
            featuredImage={featuredImage}
            onTitleChange={setTitle}
            onSubtitleChange={setSubtitle}
            onCategoryChange={setCategory}
            onKeywordsChange={setKeywords}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Article Content *
            </label>
            <div className="w-full overflow-hidden">
              <ArticleEditor onChange={setContent} />
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Use the toolbar above to format your content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
