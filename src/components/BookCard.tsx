
import { Book } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, BookOpen, Check } from "lucide-react";

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
  onToggleRead: (book: Book) => void;
}

const BookCard = ({ book, onEdit, onDelete, onToggleRead }: BookCardProps) => {
  // Default cover for books without cover
  const coverUrl = book.coverUrl || "https://placehold.co/180x250/e2e8f0/1e293b?text=No+Cover";
  
  return (
    <Card className="book-card overflow-hidden">
      <div className="aspect-[2/3] overflow-hidden relative">
        <img 
          src={coverUrl} 
          alt={`Cover of ${book.title}`}
          className="h-full w-full object-cover transform transition-transform hover:scale-105"
        />
        {book.isRead && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary">
              <Check size={12} className="mr-1" /> Read
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="pt-4">
        <h3 className="font-serif font-bold text-lg leading-tight mb-1">{book.title}</h3>
        <p className="text-sm text-muted-foreground">{book.author}</p>
        {book.genre && (
          <Badge variant="outline" className="mt-2">
            {book.genre}
          </Badge>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onToggleRead(book)}
          className="flex items-center gap-1"
        >
          <BookOpen size={16} />
          <span>{book.isRead ? 'Mark Unread' : 'Mark Read'}</span>
        </Button>
        
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => onEdit(book)}
          >
            <Edit size={16} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDelete(book)}
          >
            <Trash2 size={16} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
