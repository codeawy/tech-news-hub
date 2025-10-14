import prisma from "@/lib/prisma/client";

export default async function Home() {
  const users = await prisma.user.findMany();

  console.log(users);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {users.length > 0 ? (
          users.map((user) => <div key={user.id}>{user.email}</div>)
        ) : (
          <div>No users found</div>
        )}
      </main>
    </div>
  );
}
