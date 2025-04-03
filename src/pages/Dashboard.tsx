
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Book } from "@/lib/types";
import { getAllBooks, updateBook } from "@/lib/bookService";
import { User } from "@/lib/types";
import Navbar from "@/components/Navbar";
import BookCard from "@/components/BookCard";
import AddBookModal from "@/components/AddBookModal";
import EditBookModal from "@/components/EditBookModal";
import DeleteConfirmation from "@/components/DeleteConfirmation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BookPlus, Search, Library, BookCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("dateAdded");
  const [readFilter, setReadFilter] = useState<string>("all");
  const [user, setUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [deletingBook, setDeletingBook] = useState<Book | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("bookBuddy_user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    const loadBooks = async () => {
      try {
        const books = await getAllBooks();
        setBooks(books);
        setFilteredBooks(books);
      } catch (error) {
        console.error("Error loading books:", error);
        toast({
          title: "Error",
          description: "Failed to load your books. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooks();
  }, [navigate, toast]);

  // Apply filters and sorting when books or filter options change
  useEffect(() => {
    let result = [...books];
    
    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        book => book.title.toLowerCase().includes(lowercaseSearch) || 
                book.author.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    // Apply genre filter
    if (genreFilter) {
      result = result.filter(book => book.genre === genreFilter);
    }
    
    // Apply read status filter
    if (readFilter === "read") {
      result = result.filter(book => book.isRead);
    } else if (readFilter === "unread") {
      result = result.filter(book => !book.isRead);
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      switch (sortOption) {
        case "title":
          return a.title.localeCompare(b.title);
        case "author":
          return a.author.localeCompare(b.author);
        case "dateAdded":
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        default:
          return 0;
      }
    });
    
    setFilteredBooks(result);
  }, [books, searchTerm, genreFilter, sortOption, readFilter]);

  const handleLogout = () => {
    localStorage.removeItem("bookBuddy_user");
    navigate("/login");
  };

  const handleBookAdded = (newBook: Book) => {
    setBooks(prevBooks => [...prevBooks, newBook]);
  };
  
  const handleBookUpdated = (updatedBook: Book) => {
    setBooks(prevBooks => prevBooks.map(book => 
      book.id === updatedBook.id ? updatedBook : book
    ));
  };
  
  const handleBookDeleted = (bookId: string) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };
  
  const handleToggleRead = async (book: Book) => {
    try {
      const updatedBook = await updateBook(book.id, { 
        isRead: !book.isRead 
      });
      
      if (updatedBook) {
        setBooks(prevBooks => prevBooks.map(b => 
          b.id === book.id ? updatedBook : b
        ));
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update book status. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating book:", error);
    }
  };

  const uniqueGenres = [...new Set(books.map(book => book.genre).filter(Boolean))];
  const bookCountByStatus = {
    all: books.length,
    read: books.filter(book => book.isRead).length,
    unread: books.filter(book => !book.isRead).length,
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar 
        isLoggedIn={!!user}
        onLogout={handleLogout}
        userName={user?.name}
      />
      
      <main className="flex-1 container py-8">
        <div className="page-transition">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">My Book Collection</h1>
              <p className="text-muted-foreground">
                Keep track of your reading journey
              </p>
            </div>
            
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2"
            >
              <BookPlus size={18} />
              <span>Add New Book</span>
            </Button>
          </div>
          
          <Tabs defaultValue="all" className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all" className="flex items-center gap-2">
                  <Library size={16} />
                  <span>All Books ({bookCountByStatus.all})</span>
                </TabsTrigger>
                <TabsTrigger value="read" className="flex items-center gap-2">
                  <BookCheck size={16} />
                  <span>Read ({bookCountByStatus.read})</span>
                </TabsTrigger>
                <TabsTrigger value="unread" className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>Unread ({bookCountByStatus.unread})</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                <div className="flex-1 md:flex-none">
                  <Input
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="min-w-[200px]"
                    prefix={<Search size={16} />}
                  />
                </div>
                
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger className="flex-1 md:flex-none min-w-[150px]">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Genres</SelectItem>
                    {uniqueGenres.map(genre => (
                      <SelectItem key={genre} value={genre || ""}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="flex-1 md:flex-none min-w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dateAdded">Latest Added</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="all" className="m-0">
              <BookGrid 
                books={filteredBooks}
                isLoading={isLoading}
                onEdit={setEditingBook}
                onDelete={setDeletingBook}
                onToggleRead={handleToggleRead}
              />
            </TabsContent>
            
            <TabsContent value="read" className="m-0">
              <BookGrid 
                books={filteredBooks.filter(book => book.isRead)}
                isLoading={isLoading}
                onEdit={setEditingBook}
                onDelete={setDeletingBook}
                onToggleRead={handleToggleRead}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              <BookGrid 
                books={filteredBooks.filter(book => !book.isRead)}
                isLoading={isLoading}
                onEdit={setEditingBook}
                onDelete={setDeletingBook}
                onToggleRead={handleToggleRead}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Modals */}
      {isAddModalOpen && (
        <AddBookModal 
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)} 
          onBookAdded={handleBookAdded}
        />
      )}
      
      {editingBook && (
        <EditBookModal 
          isOpen={!!editingBook}
          onClose={() => setEditingBook(null)}
          book={editingBook}
          onBookUpdated={handleBookUpdated}
        />
      )}
      
      {deletingBook && (
        <DeleteConfirmation
          isOpen={!!deletingBook}
          onClose={() => setDeletingBook(null)}
          book={deletingBook}
          onBookDeleted={handleBookDeleted}
        />
      )}
    </div>
  );
};

interface BookGridProps {
  books: Book[];
  isLoading: boolean;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onToggleRead: (book: Book) => void;
}

const BookGrid = ({ books, isLoading, onEdit, onDelete, onToggleRead }: BookGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your books...</p>
        </div>
      </div>
    );
  }
  
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <BookOpen size={64} className="text-muted-foreground/50 mb-4" />
        <h3 className="font-serif text-xl">No books found</h3>
        <p className="text-muted-foreground max-w-md mt-2">
          {books.length === 0 ? "Your collection is empty. Add your first book to get started!" 
            : "No books match your current filters. Try adjusting your search criteria."}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map(book => (
        <BookCard 
          key={book.id} 
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleRead={onToggleRead}
        />
      ))}
    </div>
  );
};

export default Dashboard;
