import prisma from "@/lib/prisma/client";
import UserCard from "@/components/UserCard";

export default async function Home() {
  const users = await prisma.user.findMany({
    include: {
      author_profile: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Tech News Hub Users
          </h1>
          <p className="mt-2 text-gray-600">
            {users.length} {users.length === 1 ? "user" : "users"} registered
          </p>
        </div>

        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No users found</div>
            <p className="text-gray-400 mt-2">
              Run the seed script to populate the database
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
