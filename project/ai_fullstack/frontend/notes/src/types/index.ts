export interface User {
  id: number;
  name: string;
  avatar?: string;
}

export interface Post {
  id: number;
  title: string;
  brief: string;  // 简介
  publishedAt: string;  // 发布时间
  totalLinkes?: number;
  totalComments?: number;
  user: User;
  tags: string[];
  thumbnail: string;  // 缩略图
  pics?: string[];
}