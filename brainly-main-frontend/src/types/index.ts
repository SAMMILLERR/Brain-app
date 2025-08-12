export interface User {
  id: string;
  username: string;
}

export interface Content {
  id?: string;
  title: string;
  type: 'tweet' | 'reddit' | 'youtube' | 'document' | 'link' | 'article';
  link: string;
  tags: string[];
  username?: string;
}

export interface AuthResponse {
  message: string;
  jwt?: string;
}

export interface ApiResponse<T = any> {
  message: string;
  content?: T;
  error?: string;
}

export interface ShareLinkResponse {
  message: string; // This contains the hash
}
