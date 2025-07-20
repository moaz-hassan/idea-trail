"use client";
import addCommentToArticle from "@/lib/db_functions/addCommentToArticle";
import getArticleComments from "@/lib/db_functions/getArticleComments";
import { MessageCircle, Send, ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { format } from "date-fns";

const ArticleCommentsSection = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleComments, setVisibleComments] = useState(5); // Initial number of comments to show
  const { articleId } = useParams();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getArticleComments(articleId);
        setComments(Array.isArray(res?.comments) ? res.comments : []);
      } catch (error) {
        toast.error("Failed to load comments");
        setComments([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComments();
  }, [articleId]);

  async function handleAddingComment() {
    if (comment.trim() === "") {
      toast.error("Please write a comment before submitting");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await addCommentToArticle(articleId, comment);
      if (res.success) {
        toast.success("Comment added successfully");
        setComment("");
        const res = await getArticleComments(articleId);
        setComments(res.comments);
        setTimeout(() => {
          document
            .getElementById(`comment-${res.comments.length - 1}`)
            ?.scrollIntoView({
              behavior: "smooth",
            });
        }, 100);
      } else {
        toast.error(res.error);
      }
    } catch (err) {
      toast.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Function to get initials from username
  const getInitials = (name) => {
    if (!name) return "AN";
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name) => {
    if (!name) return "bg-gray-500";
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-orange-500",
      "bg-cyan-500",
    ];
    const charCode = name.charCodeAt(0);
    return colors[charCode % colors.length];
  };

  // Function to load more comments
  const loadMoreComments = () => {
    setVisibleComments((prev) => prev + 5);
  };

  // Function to collapse comments
  const collapseComments = () => {
    setVisibleComments(5);
    window.scrollTo({
      top: document.getElementById("comments-section").offsetTop - 20,
      behavior: "smooth",
    });
  };

  // Sort comments by date (newest first)
  const sortedComments = [...comments]?.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <section className="mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="rounded-3xl shadow-md border border-white/20 dark:border-slate-700/30 overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 p-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Discussion
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Share your thoughts and join the conversation
              </p>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="p-8 border-b border-slate-200 dark:border-slate-700">
          <div className="space-y-4">
            <label
              htmlFor="comment"
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300"
            >
              Add your comment
            </label>
            <div className="relative">
              <textarea
                id="comment"
                rows={4}
                className="w-full px-4 py-4 pr-12 border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="What are your thoughts on this article?"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleAddingComment();
                  }
                }}
              />
              <button
                className={`absolute bottom-4 right-4 p-2 rounded-lg transition-all duration-200 ${
                  comment.trim()
                    ? "bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl"
                    : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                }`}
                onClick={handleAddingComment}
                disabled={!comment.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="p-8" id="comments-section">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
              {comments?.length || 0}{" "}
              {comments?.length === 1 ? "Comment" : "Comments"}
            </h4>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
            </div>
          ) : comments?.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 text-lg">
                No comments yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {sortedComments
                  .slice(0, visibleComments)
                  .map((comment, index) => (
                    <div
                      key={comment.createdAt || index}
                      id={`comment-${index}`}
                      className="flex space-x-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-200"
                    >
                      {/* User Avatar */}
                      <div className="flex-shrink-0">
                        <div
                          className={`w-12 h-12 rounded-full ${getAvatarColor(
                            comment.userName
                          )} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}
                        >
                          {getInitials(comment.userName)}
                        </div>
                      </div>

                      {/* Comment Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-slate-900 dark:text-white">
                            {comment.userName || "Anonymous"}
                          </h5>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {format(
                              new Date(comment.createdAt),
                              "MMM d, yyyy 'at' h:mm a"
                            )}
                          </span>
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Load More / Collapse Buttons */}
              {comments.length > 5 && (
                <div className="flex justify-center mt-8">
                  {visibleComments < comments.length ? (
                    <button
                      onClick={loadMoreComments}
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors duration-200 font-medium"
                    >
                      <ChevronDown className="w-5 h-5" />
                      <span>
                        Load more comments ({comments.length - visibleComments}{" "}
                        remaining)
                      </span>
                    </button>
                  ) : (
                    <button
                      onClick={collapseComments}
                      className="flex items-center space-x-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-colors duration-200 font-medium"
                    >
                      <ChevronUp className="w-5 h-5" />
                      <span>Show fewer comments</span>
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ArticleCommentsSection;
