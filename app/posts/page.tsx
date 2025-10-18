import Link from "next/link";

export default async function PostsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return (
    <div>
      {posts.length > 0 ? (
        posts.map((post: { id: string; title: string }) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </div>
        ))
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">No posts found</div>
        </div>
      )}
    </div>
  );
}
