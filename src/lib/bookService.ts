
import { Book } from "./types";

// Mock user data storage - in a real app this would be connected to a database
const LOCAL_STORAGE_KEY = "bookBuddy_books";

// Helper for local storage operations
const getStoredBooks = (): Book[] => {
  const storedBooks = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedBooks ? JSON.parse(storedBooks) : [];
};

const setStoredBooks = (books: Book[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
};

// Book CRUD operations
export const getAllBooks = (): Promise<Book[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getStoredBooks());
    }, 300); // Simulating network delay
  });
};

export const getBookById = (id: string): Promise<Book | undefined> => {
  return new Promise((resolve) => {
    const books = getStoredBooks();
    const book = books.find((b) => b.id === id);
    resolve(book);
  });
};

export const addBook = (book: Omit<Book, "id" | "dateAdded">): Promise<Book> => {
  return new Promise((resolve) => {
    const newBook: Book = {
      ...book,
      id: Math.random().toString(36).substring(2, 9), // Simple ID generation
      dateAdded: new Date().toISOString(),
    };
    
    const books = getStoredBooks();
    books.push(newBook);
    setStoredBooks(books);
    resolve(newBook);
  });
};

export const updateBook = (id: string, updates: Partial<Book>): Promise<Book | null> => {
  return new Promise((resolve) => {
    const books = getStoredBooks();
    const index = books.findIndex((b) => b.id === id);
    
    if (index === -1) {
      resolve(null);
      return;
    }
    
    const updatedBook = { ...books[index], ...updates };
    books[index] = updatedBook;
    setStoredBooks(books);
    resolve(updatedBook);
  });
};

export const deleteBook = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const books = getStoredBooks();
    const filteredBooks = books.filter((b) => b.id !== id);
    
    // If lengths are the same, book was not found
    if (filteredBooks.length === books.length) {
      resolve(false);
      return;
    }
    
    setStoredBooks(filteredBooks);
    resolve(true);
  });
};
