"use client";

import {
  MapPin,
  Calendar,
  Globe,
  UserPlus,
  Share2,
  Bell,
  Users,
  Eye,
  BookOpen,
  Heart,
  Trophy,
  Award,
  Target,
  Zap,
  UserMinus,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";
import followPublisher from "@/lib/db_functions/followPublisher";
import unfollowPublisher from "@/lib/db_functions/unfollowPublisher";
import Loader from "../ui/Loader";
import { useState } from "react";

const iconMap = {
  Users,
  Eye,
  BookOpen,
  Heart,
  Trophy,
  Award,
  Target,
  Zap,
};

const PublisherPublicProfileHeader = ({
  publisherData,
  stats,
  achievements,
  userData,
}) => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);

  async function handleFollowPublisher() {
    setIsLoading(true);
    const { success, error } = await followPublisher(
      params.publisherId,
      userData?.uid
    );

    if (success) {
      toast.success("Publisher followed successfully");
    } else {
      toast.error(error);
    }
    setIsLoading(false);
  }
  async function handleUnfollowPublisher() {
    setIsLoading(true);
    const { success, error } = await unfollowPublisher(
      params.publisherId,
      userData.uid
    );

    if (success) {
      toast.success("Publisher unfollowed successfully");
    } else {
      toast.error(error);
    }
    setIsLoading(false);
  }
  function handleSharePublisher(publisherId) {
    const url = `${window.location.origin}/publisher/${publisherId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Publisher profile link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link. Please try again.");
      });
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-6">
          <Image
            src={publisherData.avatar}
            alt={publisherData.name}
            width={128}
            height={128}
            className="w-32 h-32 rounded-3xl border-4 border-white/20 shadow-2xl"
          />
          <div>
            <h1 className="text-4xl font-bold text-white">
              {publisherData.name}
            </h1>
            <p className="text-blue-100">{publisherData.bio}</p>
            <div className="flex gap-4 text-blue-100 mt-2">
              {publisherData.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> {publisherData.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> Joined{" "}
                {publisherData.createdAt}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          {userData?.following?.includes(params?.publisherId) ? (
            <button
              onClick={handleUnfollowPublisher}
              className="px-6 py-2 bg-red-500 text-white rounded-xl flex items-center gap-2 cursor-pointer"
            >
              {!isLoading ? (
                <span className="flex items-center gap-1">
                  <UserMinus className="w-4 h-4" /> Unfollow
                </span>
              ) : (
                <Loader size={12} className="border-white" />
              )}
            </button>
          ) : (
            <button
              onClick={handleFollowPublisher}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl flex items-center gap-2 cursor-pointer"
            >
              {!isLoading ? (
                <span className="flex items-center gap-1">
                  <UserPlus className="w-4 h-4" /> Follow
                </span>
              ) : (
                <Loader size={12} className="border-white" />
              )}
            </button>
          )}

          <button
            onClick={() => handleSharePublisher(params.publisherId)}
            className="px-6 py-2 bg-white/10 text-white rounded-xl flex items-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
          {stats.map((stat, index) => {
            const IconComponent = iconMap[stat.iconName];
            return (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/10 text-center text-white"
              >
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.color}`}
                >
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((ach) => {
            const AchIcon = iconMap[ach.iconName];
            return (
              <div
                key={ach.id}
                className="p-4 bg-white/10 rounded-xl text-white flex items-center gap-4"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${ach.color}`}
                >
                  <AchIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-semibold">{ach.name}</div>
                  <div className="text-sm text-blue-100">{ach.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PublisherPublicProfileHeader;
