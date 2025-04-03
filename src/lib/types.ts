
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl?: string;
  description?: string;
  genre?: string;
  publishYear?: number;
  pagesCount?: number;
  isRead?: boolean;
  dateAdded: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}
