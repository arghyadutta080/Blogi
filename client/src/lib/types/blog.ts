interface Author {
    id: number
    username: string
}

export interface Post {
    id: number
    title: string
    content: string
    image_url: string
    image_public_id: string
    created_at: string
    updated_at: string | null
}

export interface BlogPost {
    author: Author
    post: Post
}

export interface BlogPostInput {
    title: string
    content: string
    coverImage?: File | null
}