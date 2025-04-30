import { User } from "./user"

export interface BlogPost {
    id: string
    title: string
    content: string
    coverImage?: string
    authorId: string
    author: User
    createdAt: string
    updatedAt: string
}

export interface BlogPostInput {
    title: string
    content: string
    coverImage?: File | null
}