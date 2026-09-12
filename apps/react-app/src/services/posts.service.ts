import { api } from './api';

export interface Tag {
  id: string;
  name: string;
}

export interface PostAuthor {
  id: string;
  name: string;
}

export interface PostComment {
  id: string;
  content: string;
  postId: string;
  author: PostAuthor;
  createdAt: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string | null;
  imageUrl?: string | null;
  sharesCount: number;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  author: PostAuthor;
  tags: Tag[];
  comments?: PostComment[];
  createdAt: string;
  updatedAt: string;
}

export interface QueryPostsParams {
  search?: string;
  tag?: string;
  sort?: 'recent' | 'popular';
}

export interface CreatePostPayload {
  title: string;
  description: string;
  codeSnippet?: string;
  imageUrl?: string;
  tags?: string[];
}

export interface LikeToggleResponse {
  liked: boolean;
  likesCount: number;
}

export const postsService = {
  async getPosts(params?: QueryPostsParams): Promise<Post[]> {
    const response = await api.get<Post[]>('/posts', { params });
    return response.data;
  },

  async getPostById(id: string): Promise<Post> {
    const response = await api.get<Post>(`/posts/${id}`);
    return response.data;
  },

  async createPost(payload: CreatePostPayload): Promise<Post> {
    const response = await api.post<Post>('/posts', payload);
    return response.data;
  },

  async toggleLike(postId: string): Promise<LikeToggleResponse> {
    const response = await api.post<LikeToggleResponse>(`/posts/${postId}/likes`);
    return response.data;
  },

  async addComment(postId: string, content: string): Promise<PostComment> {
    const response = await api.post<PostComment>(`/posts/${postId}/comments`, {
      content,
    });
    return response.data;
  },

  async getTags(): Promise<Tag[]> {
    const response = await api.get<Tag[]>('/tags');
    return response.data;
  },
};
