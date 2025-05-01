import { api } from "./axiosConfig"
import { BlogPost, Post } from "@/lib/types/blog"

interface GetAllBlogPostsParams {
    page?: number
    limit?: number
    search?: string
}

interface BlogPostsResponse {
    posts: BlogPost[]
    total: number
    page: number
    limit: number
}

export async function getAllBlogPosts({
    page = 1,
    limit = 6,
    search = "",
}: GetAllBlogPostsParams = {}): Promise<BlogPostsResponse> {

    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("limit", limit.toString())
    if (search) {
        params.append("search", search)
    }

    const response = await api.get(`/posts?${params.toString()}`)
    return {
        posts: response.data.posts,
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
    }
}

export async function getAllUserPosts({
    page = 1,
    limit = 6,
    search = "",
}: GetAllBlogPostsParams = {}): Promise<BlogPostsResponse> {

    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("limit", limit.toString())
    if (search) {
        params.append("search", search)
    }

    const response = await api.get(`/posts/my-blogs?${params.toString()}`)
    return {
        posts: response.data.posts,
        total: response.data.total,
        page: response.data.page,
        limit: response.data.limit,
    }
}

export async function getBlogPost(id: string): Promise<BlogPost> {
    try {
        const response = await api.get(`/posts/${id}`)
        console.log("Blog post response", response.data)
        return response.data
    } catch (error: any) {
        console.log("Error at fetching blog", error)
        throw new Error("Post not found")
    }
}

export async function createBlogPost(data: FormData): Promise<Post> {
    try {
        const response = await api.post("/posts/create", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error: any) {
        console.log("Error at creating blog", error)
        throw new Error(error?.message || "Failed to create post")
    }
}

export async function updateBlogPost(
    id: string,
    data: FormData
): Promise<Post> {
    try {
        const response = await api.put(`/posts/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        return response.data
    } catch (error: any) {
        console.log("Error at updating blog", error)
        throw new Error(error?.message || "Failed to update post")
    }
}

export async function deleteBlogPost(id: string): Promise<void> {
    try {
        await api.delete(`/posts/${id}`)
        return Promise.resolve()
    } catch (error: any) {
        console.log("Error at deleting blog", error)
        throw new Error(error?.message || "Failed to delete post")
    }
}