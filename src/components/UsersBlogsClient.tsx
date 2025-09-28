// UserBlogsClient.tsx
"use client";

import { useSession } from "next-auth/react";

export default function UserBlogsClient({ blogs }: { blogs: any[] }) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id ?? "";

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          {/* Use currentUserId here if needed */}
        </div>
      ))}
    </div>
  );
}
