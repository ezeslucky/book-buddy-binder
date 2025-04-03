
import { useState } from "react";
import { Book } from "@/lib/types";
import BookForm from "./BookForm";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { updateBook } from "@/lib/bookService";
import { useToast } from "@/hooks/use-toast";

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  onBookUpdated: (updatedBook: Book) => void;
}

const EditBookModal = ({ isOpen, onClose, book, onBookUpdated }: EditBookModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (data: Partial<Book>) => {
    setIsSubmitting(true);
    try {
      const updatedBook = await updateBook(book.id, data);
      if (updatedBook) {
        toast({
          title: "Success!",
          description: "Book has been updated.",
        });
        onBookUpdated(updatedBook);
        onClose();
      } else {
        throw new Error("Failed to update book");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update book. Please try again.",
        variant: "destructive",
      });
      console.error("Error updating book:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Edit Book</DialogTitle>
        </DialogHeader>
        <BookForm 
          initialData={book} 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditBookModal;
