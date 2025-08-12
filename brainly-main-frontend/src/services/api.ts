import type { Content, AuthResponse, ApiResponse, ShareLinkResponse } from '../types';

const API_BASE_URL = 'http://localhost:3000/api/v1';

class ApiService {
  private getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeader(),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  }

  // Auth APIs
  async signup(username: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async signin(username: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/signin', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Content APIs
  async getContent(): Promise<ApiResponse<Content[]>> {
    return this.request<ApiResponse<Content[]>>('/content');
  }

  async addContent(content: Omit<Content, 'id' | 'username'>): Promise<ApiResponse> {
    return this.request<ApiResponse>('/content', {
      method: 'POST',
      body: JSON.stringify(content),
    });
  }

  async updateContent(id: string, content: Partial<Omit<Content, 'id' | 'username'>>): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/content/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(content),
    });
  }

  async deleteContent(id: string): Promise<ApiResponse> {
    return this.request<ApiResponse>(`/content/${id}`, {
      method: 'DELETE',
    });
  }

  // Brain sharing APIs
  async shareBrain(): Promise<ShareLinkResponse> {
    return this.request<ShareLinkResponse>('/brain/share', {
      method: 'POST',
      body: JSON.stringify({ share: "true" }),
    });
  }

  async getSharedBrain(shareLink: string): Promise<ApiResponse<Content[]>> {
    // Don't use auth headers for shared brain access
    const url = `${API_BASE_URL}/brain/${shareLink}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to load shared brain');
    }

    return data;
  }
}

export const apiService = new ApiService();
