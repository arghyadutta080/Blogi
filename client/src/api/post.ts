import { BlogPost } from "@/lib/types/blog"
import { api } from "./axiosConfig"

interface GetAllBlogPostsParams {
    page?: number
    limit?: number
    search?: string
}

interface BlogPostsResponse {
    posts: BlogPost[]
    total: number
}

export async function getAllBlogPosts({
    page = 1,
    limit = 10,
    search = "",
}: GetAllBlogPostsParams = {}): Promise<BlogPostsResponse> {

    const params = new URLSearchParams()
    params.append("page", page.toString())
    params.append("limit", limit.toString())
    if (search) {
        params.append("search", search)
    }

    const response = await api.get(`/posts?${params.toString()}`)
    const blogPosts: BlogPost[] = response.data

    let filteredPosts = [...blogPosts]

    if (search) {
        const searchLower = search.toLowerCase()
        filteredPosts = filteredPosts.filter(
            (post) => post.post.title.toLowerCase().includes(searchLower) || post.post.content.toLowerCase().includes(searchLower),
        )
    }

    // sort by creation date
    filteredPosts.sort((a, b) => new Date(b.post.created_at).getTime() - new Date(a.post.created_at).getTime())

    // calculate pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

    return {
        posts: paginatedPosts,
        total: filteredPosts.length,
    }

    // Original API call
    // const params = new URLSearchParams()
    // params.append("page", page.toString())
    // params.append("limit", limit.toString())
    // if (search) {
    //   params.append("search", search)
    // }
    // const response = await api.get(`/posts?${params.toString()}`)
    // return response.data
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

export async function deleteBlogPost(id: number): Promise<void> {
    try {
        await api.delete(`/posts/${id}`)
        return Promise.resolve()
    } catch (error: any) {
        console.log("Error at deleting blog", error)
        throw new Error(error?.message || "Failed to delete post")
    }
}