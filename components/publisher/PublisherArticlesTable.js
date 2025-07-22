"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";

import clientCheckSessionValid from "@/lib/auth/clientCheckSessionValid";
import { getArticlesByIds } from "@/lib/db_functions/getArticlesByIds";
import { deleteArticleById } from "@/lib/db_functions/deleteArticleById";
import ArticleActionsBtns from "./ArticleActionsBtns";
import ArticlesMobileView from "./ArticlesMobileView";
import Loader from "../ui/Loader";

export default function PublisherArticlesTable() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [sortBy, setSortBy] = useState("publishDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const router = useRouter();

  const statusColors = {
    published: "bg-green-100 text-green-800",
    draft: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    scheduled: "bg-purple-100 text-purple-800",
    blocked: "bg-red-100 text-red-800",
  };

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const session = await clientCheckSessionValid();
        if (!session.valid) {
          toast.error("Please login again.");
          router.push("/");
          return;
        }
        const articles = await getArticlesByIds(session.user.articles);
        setArticles(articles);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [router]);
  if (loading) {
    return <Loader size={30} />;
  }
  const sortedArticles = [...articles].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (sortBy === "publishDate") {
      aVal = new Date(aVal?.seconds * 1000 || aVal);
      bVal = new Date(bVal?.seconds * 1000 || bVal);
    } else if (sortBy === "viewsNum") {
      aVal = parseInt(aVal) || 0;
      bVal = parseInt(bVal) || 0;
    }
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const handleDelete = async () => {
    const res = await deleteArticleById(toDeleteId);
    if (res) {
      setArticles((prev) => prev.filter((a) => a.id !== toDeleteId));
      toast.success("Article deleted");
    } else {
      toast.error("Delete failed");
    }
    setToDeleteId(null);
    setConfirmOpen(false);
  };

  const handleOpenDeleteConfirm = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const handleCopyLink = (id) => {
    const link = `${window.location.origin}/blog/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied!"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const formatViews = (v) => {
    const n = parseInt(v) || 0;
    return n >= 1_000_000
      ? (n / 1_000_000).toFixed(1) + "M"
      : n >= 1_000
      ? (n / 1_000).toFixed(1) + "K"
      : n.toString();
  };

  const formatDate = (date) => {
    if (date?.seconds) return new Date(date.seconds * 1000).toDateString();
    return new Date(date).toDateString();
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  return (
    <div className="w-full">
      {/* Delete Confirmation Modal */}
      <Transition appear show={confirmOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setConfirmOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white">
                    Confirm Deletion
                  </Dialog.Title>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete this article? This action
                    cannot be undone.
                  </p>
                  <div className="mt-4 flex justify-end gap-3">
                    <button
                      onClick={() => setConfirmOpen(false)}
                      className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      className="px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("title")}
              >
                Article{" "}
                {sortBy === "title" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("viewsNum")}
              >
                Views{" "}
                {sortBy === "viewsNum" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status{" "}
                {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("publishDate")}
              >
                Date{" "}
                {sortBy === "publishDate" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedArticles.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {article.imgUrl && (
                      <Image
                        src={article.imgUrl}
                        width={48}
                        height={48}
                        alt={article.title}
                        className="rounded-md w-12 h-12 object-cover border"
                      />
                    )}
                    <div className="min-w-0">
                      <Link
                        href={`/blog/${article.id}`}
                        className="text-sm font-medium text-gray-900 hover:text-blue-600 block truncate"
                      >
                        {article.title}
                      </Link>
                      {article.subtitle && (
                        <p className="text-sm text-gray-500 truncate">
                          {article.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {formatViews(article.viewsNum)}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      statusColors[article.status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {formatDate(article.publishDate)}
                </td>
                <td className="px-4 py-3 text-right">
                  <ArticleActionsBtns
                    article={article}
                    handleDelete={handleOpenDeleteConfirm}
                    handleCopyLink={handleCopyLink}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <ArticlesMobileView
        formatDate={formatDate}
        formatViews={formatViews}
        sortedArticles={sortedArticles}
        selectedArticle={selectedArticle}
        statusColors={statusColors}
      />

      {/* Empty State */}
      {!loading && sortedArticles.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            No articles found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Start by creating a new article.
          </p>
          <div className="mt-6">
            <Link
              href="/publisher/dashboard/create-article"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded"
            >
              Create Article
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
