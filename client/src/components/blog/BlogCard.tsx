import { formatDate } from "@/utils/formatDate";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@/lib/types/blog";
import Image from "next/image";
import { stripHtmlTags } from "@/utils/stripHtmlTags";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video overflow-hidden">
        <Image
          src={post.post.image_url || ""}
          alt={post.post.title}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          width={600}
          height={300}
        />
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-xl line-clamp-2">
            {post.post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {stripHtmlTags(post.post.content).substring(0, 120)}...
          </p>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {post.author.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{post.author.username}</span>
        </div>
        <time
          className="text-xs text-muted-foreground"
          dateTime={post.post.created_at}
        >
          {formatDate(post.post.created_at)}
        </time>
      </CardFooter>
    </Card>
  );
}
