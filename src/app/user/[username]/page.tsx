import ProfileCard from "@/components/ProfileCard";
import UserBlogsClient from "@/components/UsersBlogsClient";
import { prisma } from "@/lib/prisma";

type Props = { params: { username: string } };

export default async function UserProfilePage({ params }: Props) {
  const { username } = params;

  // Fetch user and their blogs from DB
  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      blogs: {
        orderBy: { createdAt: "desc" },
        include: { author: true, likes: true, comments: { include: { author: true } } },
      },
    },
  });

  if (!user) return <p>User not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      {/* Profile Card */}
      <ProfileCard
  name={user.name}
  username={user.username}
  image={user.image}
  bio={user.bio}
  twitterUrl={user.twitterUrl}
  githubUrl={user.githubUrl}
  linkedinUrl={user.linkedinUrl}
  instagramUrl={user.instagramUrl}
/>

    
      <UserBlogsClient blogs={user.blogs} />
    </div>
  );
}
