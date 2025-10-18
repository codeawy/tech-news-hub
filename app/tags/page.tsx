import prisma from "@/lib/prisma/client";

export const revalidate = 60; // 1 minute

export default async function TagsPage() {
  const tags = await prisma.tag.findMany();

  return (
    <div>
      {tags.length > 0 ? (
        tags.map((tag: { id: string; name: string }) => (
          <div key={tag.id}>{tag.name}</div>
        ))
      ) : (
        <div>No tags found</div>
      )}
    </div>
  );
}
