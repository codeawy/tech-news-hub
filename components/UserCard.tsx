import { User, Author } from "@prisma/client";
import Image from "next/image";

interface UserCardProps {
  user: User & {
    author_profile?: Author | null;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 border-red-200";
      case "AUTHOR":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "READER":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200">
      {/* Header with Avatar and Role */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={`${user.name || "User"}'s avatar`}
                width={64}
                height={64}
                className="rounded-full border-2 border-gray-200"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-xl font-semibold">
                  {user.name?.charAt(0) || user.email.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {user.name || "Anonymous User"}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
            user.role
          )}`}
        >
          {user.role}
        </span>
      </div>

      {/* Author Profile Section */}
      {user.author_profile && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Author Profile
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Username:</span> @
              {user.author_profile.username}
            </p>
            {user.author_profile.bio && (
              <p className="text-sm text-gray-600">{user.author_profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {user.author_profile.website_url && (
                <a
                  href={user.author_profile.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  Website
                </a>
              )}
              {user.author_profile.twitter && (
                <a
                  href={`https://twitter.com/${user.author_profile.twitter.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded hover:bg-sky-200 transition-colors"
                >
                  Twitter
                </a>
              )}
              {user.author_profile.github && (
                <a
                  href={`https://github.com/${user.author_profile.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                >
                  GitHub
                </a>
              )}
              {user.author_profile.linkedin && (
                <a
                  href={`https://linkedin.com/in/${user.author_profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Member Since
          </p>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(user.created_at)}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Last Updated
          </p>
          <p className="text-sm font-medium text-gray-900">
            {formatDate(user.updated_at)}
          </p>
        </div>
      </div>

      {/* User ID (for debugging/admin purposes) */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 font-mono">ID: {user.id}</p>
      </div>
    </div>
  );
}
