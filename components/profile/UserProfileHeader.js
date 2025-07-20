import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Star,
  Calendar,
  MapPin,
  Target,
  User,
  Award,
} from "lucide-react";
import UserRoleSwitcher from "@/components/profile/RoleSwitcher";

export default function UserProfileHeader({ userData }) {
  const progressPercentage = Math.min(
    (userData.articlesRead / userData.readingGoal) * 100,
    100
  );

  return (
    <>
      <div className="bg-white/80 dark:bg-slate-800/80 shadow-lg border-b border-white/20 dark:border-slate-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-all duration-200 group bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-xl"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Blog</span>
              </Link>
              <div className="h-8 w-px bg-slate-300 dark:bg-slate-600"></div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/80 dark:bg-slate-800/80  rounded-3xl shadow-md border border-white/50 dark:border-slate-700/50 p-8 mb-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1">
              {userData.image ? (
                <Image
                  src={userData.image}
                  alt={userData.name}
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              ) : (
                <User className="w-full h-full rounded-full text-white bg-gradient-to-r from-blue-600 to-purple-600 p-8" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {userData.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
              {userData.email || "Welcome to my profile!"}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400 mb-6">
              {userData.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{userData.location}</span>
                </div>
              )}
              {userData.joinDate && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {userData.joinDate}</span>
                </div>
              )}
            </div>

            {/* Reading Goal Progress */}
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium text-slate-900 dark:text-white">
                    Reading Goal Progress
                  </span>
                </div>
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  {userData.articlesRead} / {userData.readingGoal}
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {progressPercentage.toFixed(1)}% complete
              </p>
            </div>
            {/* Achievement Badge */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                <Award className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                  Active Reader
                </span>
              </div>
            </div>
            {/* Interests Tags */}
            {userData.interests && userData.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {userData.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher - Right Side */}
          <div className="w-full lg:w-80 lg:flex-shrink-0">
            <UserRoleSwitcher
              currentRole={userData.role || "user"}
              userId={userData.uid}
            />
          </div>
        </div>
      </div>
    </>
  );
}
