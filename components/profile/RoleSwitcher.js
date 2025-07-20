"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  UserCheck,
  Edit3,
  Loader2,
  AlertCircle,
  Crown,
  Sparkles,
  Zap,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import editUserRoleToPublisher from "@/lib/db_functions/editUserRoleToPublisher";
import toast from "react-hot-toast";
import logout from "@/lib/auth/logout";

const RoleSwitcher = ({ currentRole = "user", userId }) => {
  const [isConverting, setIsConverting] = useState(false);
  const router = useRouter();

  const handleRoleConversion = async () => {
    if (currentRole === "publisher") {
      toast.error("You are already a publisher");
      return;
    }

    setIsConverting(true);
    try {
      const response = await editUserRoleToPublisher(userId);
      if (response.success) {
        toast.success("Your account converted to publisher successfully");
        await logout();
      } else if (!response.ok) {
        toast.error(data.error || "Failed to convert to publisher");
      }

      // Refresh the page to show updated role
      setTimeout(() => {
        router.refresh();
      }, 2000);
    } catch (err) {
      toast.error(err.message || "An error occurred during conversion");
    } finally {
      setIsConverting(false);
    }
  };

  if (currentRole === "publisher") {
    return (
      <div className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 dark:border-slate-700/50 p-6 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 opacity-60"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-400/20 to-emerald-500/20 rounded-full blur-xl transform -translate-x-12 translate-y-12"></div>

        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Publisher Account
              </h3>
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              You can now create and publish articles, access analytics, and
              monetize your content.
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              ACTIVE
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white/60 dark:bg-slate-700/60 backdrop-blur-sm rounded-2xl shadow-md border border-white/50 dark:border-slate-600/50 p-6 overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 via-purple-500/3 to-pink-500/3 opacity-60"></div>

      {/* Animated Background Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/8 to-purple-600/8 rounded-full blur-xl transform translate-x-12 -translate-y-12 group-hover:scale-110 transition-transform duration-500"></div>

      <div className="relative z-10 space-y-4">
        {/* Icon and Title */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Edit3 className="w-8 h-8 text-white" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Become a Publisher
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Unlock content creation and monetization features.
            </p>
          </div>
        </div>

        {/* Compact Benefits */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center flex-shrink-0">
              <Edit3 className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">
              Create & publish articles
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">
              Analytics & insights
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-600 rounded-md flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-700 dark:text-slate-300">
              Monetization options
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleRoleConversion}
          disabled={isConverting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-md hover:shadow-lg group text-sm"
        >
          {isConverting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Converting...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 group-hover:animate-pulse" />
              <span>Upgrade Now</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
