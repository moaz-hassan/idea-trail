import Image from "next/image";
import { Calendar, MapPin, Mail, User } from "lucide-react";

export default function UserProfileInfo({ userData }) {
  return (
    <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 dark:border-slate-700/50 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl ring-2 ring-blue-100 dark:ring-blue-900/50 mb-6 md:mb-0">
          {userData.image ? (
            <Image
              src={userData.image}
              alt={userData.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          ) : <User className="w-full h-full rounded-2xl text-white bg-gradient-to-r from-blue-600 to-purple-600 p-8" />}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-3">
            {userData.name}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
            {userData.bio}
          </p>
          <div className="flex flex-wrap gap-6 justify-center md:justify-start text-sm text-slate-500 dark:text-slate-400 mb-6">
            {userData.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{userData.location}</span>
              </div>
            )}
            {userData.joinDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                <span>Joined {userData.joinDate}</span>
              </div>
            )}
            {userData.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <span>{userData.email}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {userData.interests.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
